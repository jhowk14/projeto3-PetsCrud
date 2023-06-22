const mysql = require('mysql2')
//Conexão com o banco de dados
module.exports = ()=> {
    const connection = mysql.createConnection({
        host: 'localhost', //Nome DNS ou IP da hospedagem do banco
        user: 'root', //Usuário do MySQL
        password: '', //Senha do MySQL
        database: 'amigo_do_pet' //Nome do Banco da aplicação 
    })
    return connection
}
