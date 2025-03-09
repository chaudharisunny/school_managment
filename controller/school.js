const pool = require('../config/db');
 
 const listSchool=async(req,res)=>{
    try {
        const longitude=parseFloat(req.query.longitude);
        const latitude=parseFloat(req.query.latitude);

        if(!longitude||!latitude){
            res.status(400).json({error:'longitude and latitude are required'})
        }

        const listSchool=await pool.query('SELECT * FROM schools')

        if(listSchool===0){
            res.status(404).json({error:'schools not found'})
        }

        const schoolwithdistance=listSchool.rows.map((schools)=>{
            const distance=calculateDistance(longitude,latitude,schools.latitude,schools.longitude);
            return {...schools,distance:distance.toFixed(2)}
        })
        schoolwithdistance.sort((a,b)=>a.distance-b.distance);

        return res.status(200).json({schoolwithdistance})
    } catch (error) {
        console.log(error);
        
        res.status(500).json({error:'server error'})
    }
 }

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

 const addSchool = async (req, res) => {
    try {
        const { name, address, longitude, latitude } = req.body;

        // Validation
        if (!name || !address || !longitude || !latitude) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Insert school data into the database
        const newSchool = await pool.query(
            'INSERT INTO schools(name, address, longitude, latitude) VALUES($1, $2, $3, $4) RETURNING *',
            [name, address, longitude, latitude]
        );

        // Respond with the new school data
        res.status(201).json({ message: 'School added successfully', data: newSchool.rows[0] });
    } catch (error) {
        console.error('Error inserting school data:', error.message);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

module.exports={listSchool,addSchool}