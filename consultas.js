const { Pool } = require("pg");

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    password: 'admin',
    database: 'mercado',
    port: '5432',
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000
});

const consulta = () => {

    return new Promise(async (resolve, reject) => {
        try {
            /* const result = await pool.query("SELECT * from verduras order by id ASC;");
            console.log(result.rows);
            resolve(result.rows); */

            const consulta = {
                text: "SELECT * from verduras order by id ASC;",
                rowMode: "JSON",
            }
            const resultado = await pool.query(consulta);
            //console.log(resultado.rows);
            resolve(resultado.rows);


            //console.log(resultado.rows);

        } catch (error) {
            reject(error);
        }
    })
}

const modificar = (id) => {

    return new Promise(async (resolve, reject) => {
        try {

            const consulta = {
                
                text: "UPDATE verduras SET estado= NOT estado where id=$1;",
                values: [id],
                rowMode: "JSON",
            }
            const resultado = await pool.query(consulta);
            //console.log(resultado.rows);
            resolve(resultado.rows);


            //console.log(resultado.rows);

        } catch (error) {
            reject(error);
        }
    })

}



module.exports = { consulta,modificar }