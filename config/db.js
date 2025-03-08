import pkg from 'pg';

const { Pool } = pkg;

const pool=new Pool({
    user:'postgres',
    host:'localhost',
    password:'admin',
    database:'school_managment',
    port:'5432'
})

pool.connect()

    .then(()=>{
        console.log('database connect');
        
    }).catch((err)=>{
        console.log({error:'daatbase not connect'});
        
    })

    export default pool