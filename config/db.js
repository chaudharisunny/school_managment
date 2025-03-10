const pg=require ('pg')
const { database, password } = require('pg/lib/defaults')
const dotenv=require('dotenv')
dotenv.config()

const pool=new pg.Pool({
    database:process.env.DB_DATABASE,
    port:process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    connectionString: process.env.DB_URL,
    // ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    

})

// pool.query('SELECT current_database(), current_user')
//     .then((res) => console.log(res.rows[0]))
//     .catch((err) => console.error('Connection error:', err));

pool.connect()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });

module.exports=pool