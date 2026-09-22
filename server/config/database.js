const {Pool} = require('pg')
require('dotenv').config();

console.log(process.env.DB_NAME)

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});


pool.connect((err, client, release) => {
    if(err){
        console.error('Ошибка подключения к бд:', err.stack);
    } else{
        console.log('успешно подключен к бд');
        release();
    }
});


module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
};