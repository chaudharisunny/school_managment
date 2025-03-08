import pool from '../config/db.js';

export const listSchool = async (req, res) => {
    const longitude = parseFloat(req.query.longitude);
    const latitude = parseFloat(req.query.latitude);  // Use query instead of body

    if (isNaN(longitude) || isNaN(latitude)) {
        return res.status(400).json({ error: 'Valid latitude and longitude are required' });
    }

    try {
        const listSchool = await pool.query('SELECT * FROM schools');

        if (listSchool.rows.length === 0) {
            return res.status(404).json({ message: 'No schools found' });
        }

        const schoolsWithDistance = listSchool.rows.map((school) => {
            const distance = calculateDistance(latitude, longitude, school.latitude, school.longitude);
            return { ...school, distance: distance.toFixed(2) }; 
        });

        // Sort schools by distance
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        // Return the sorted list
        return res.status(200).json(schoolsWithDistance);
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Internal server error' });   
    }
};

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; 
}

function degToRad(deg) {
    return deg * (Math.PI / 180);
}


export const addSchool = async (req, res) => {
    const { name, address, longitude, latitude } = req.body;

   
    if (!name || !address || !longitude || !latitude) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
       
        const newData = await pool.query(
            'INSERT INTO schools (name, address, longitude, latitude) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, address, longitude, latitude]
        );

        res.status(201).json({ data: newData.rows[0] });
    } catch (error) {
        console.error(' Error inserting data:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
