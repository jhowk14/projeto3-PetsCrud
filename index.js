const express = require('express')
const app = express()
const con = require('./bd')()
const path = require('path')
const baseDir=path.join(__dirname, 'templates')
const porta = '3200'
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res)=>res.sendFile(`${baseDir}/index.html`))
app.get('/cadastrar/pets', (req, res)=>res.sendFile(`${baseDir}/cadastrarPets.html`))

app.post('/cadastrar/pets', async (req, res)=>{
    let {nome, especie, idade_aproximada, porte, cor_predominante, cor_secundaria} = req.body
    let dados = [nome, especie, parseFloat(idade_aproximada), porte, cor_predominante, cor_secundaria]
    //let dados = Object.values(req.body).map((val)=>val)    
    //Salvar dados
    const sql = "INSERT INTO pets (nome, especie, idade, tamanho, cor1, cor2) VALUES (?,?,?, ?, ?, ?);";
    try {
       con.query(sql, dados, (erro, resp)=>{
            let resposta
            if(erro) resposta = {...erro, status:400, message: `Os dados não foram gravados`}
            else resposta = {message: `Sucesso!`}
            res.json(resposta).status(200)
        })       
    } catch (erro) {
        res.send('Erro ao acessar o banco: '+erro).status(400);
    }
})
app.get('/registros/pets', (req, res)=>{
    //ler dados
    const sql = 'SELECT * FROM pets';
    try {
        con.query(sql, (erro, dados)=>{
            if(erro) resposta = {...erro, status:400, message: `Os dados não foram gravados`}
            else resposta = {...dados, status:200, message: `Sucesso: ${dados.affectedRows} linha(s) alterada(s)`}
            res.json(resposta).status(200)
        });
    } catch (erro) {
        res.send('Erro ao acessar o banco: '+erro).status(400);
    }    
})

app.get('/consultar/pets/:id', (req, res)=>{
    //ler dados
    const sql = `SELECT * FROM pets WHERE id = ${req.params.id}`
    try {
        con.query(sql, (erro, dados)=>{
            console.log(erro? ('Erro: '+erro) : 'Sucesso!')
            res.json(dados).status(200)
        });
    } catch (erro) {
        res.send('O registro não pode ser recuperado. '+erro).status(400)
    }    
})
app.put('/editar/pets/:id', (req, res)=>{
    //Atualizar dados
    let dados = Object.values(req.body).map((val)=>val)
    const sql = `UPDATE pets SET nome=?, especie=?, idade=?, tamanho=?, cor1=?, cor2=?  WHERE id = ${req.params.id}`
    try {
        con.query(sql, dados, (erro, resp)=>{
            let resposta
            if(erro) resposta = {...erro, status:400, message: `Os dados não foram gravados`}
            else resposta = {...resp, status:200, message: `Sucesso!`}
            res.json(resposta).status(200)
        });
    } catch (erro) {
        res.send('O registro não pode ser gravado. '+erro).status(400)
    }    
})

app.delete('/excluir/pets/:id', (req, res)=>{
    //ler dados
    const sql = `DELETE FROM pets WHERE id =${req.params.id}`
    try {
        con.query(sql, (erro, resp)=>{
            let resposta
            if(erro) resposta = {...erro, status:400, message: `Os dados não foram excluídos`}
            else resposta = {...resp, status:200, message: `Sucesso: ${resp.affectedRows} linha(s) alterada(s)`}
            res.json(resposta).status(200)
        })
    } catch (erro) {
        res.send('O registro não pode ser gravado. '+erro).status(400)
    }    
})
//====================================
//CRUD da tabela PESSOA
app.get('/cadastrar/pessoa', (req, res)=>res.sendFile(`${baseDir}/cadastrarPessoa.html`))

app.post('/cadastrar/pessoa', async (req, res)=>{
    let {nome, cpf, endereco} = req.body
    let dados = [nome, cpf, endereco]
    //let dados = Object.values(req.body).map((val)=>val)    
    //Salvar dados
    const sql = "INSERT INTO pessoa (nome, cpf, endereco) VALUES (?,?,?);";
    try {
       con.query(sql, dados, (erro, resp)=>{
            let resposta
            if(erro) resposta = {...erro, status:400, message: `Os dados não foram gravados`}
            else resposta = {status:200, message: `Sucesso! ${resp.affectedRows} linhas afetada(s)`}
            res.json(resposta).status(200)
        })       
    } catch (erro) {
        res.send('Erro ao acessar o banco: '+erro).status(400);
    }
})
app.get('/registros/pessoa', (req, res)=>{
    //ler dados
    const sql = 'SELECT * FROM pessoa';
    try {
        con.query(sql, (erro, dados)=>{
            if(erro) resposta = {...erro, status:400, message: `Os dados não foram gravados`}
            else resposta = {...dados, status:200, message: `Sucesso: ${dados.affectedRows} linha(s) alterada(s)`}
            res.json(resposta).status(200)
        });
    } catch (erro) {
        res.send('Erro ao acessar o banco: '+erro).status(400);
    }    
})

app.get('/consultar/pessoa/:id', (req, res)=>{
    //ler dados
    const sql = `SELECT * FROM pessoa WHERE id = ${req.params.id}`
    try {
        con.query(sql, (erro, dados)=>{
            console.log(erro? ('Erro: '+erro) : 'Sucesso!')
            res.json(dados).status(200)
        });
    } catch (erro) {
        res.send('O registro não pode ser recuperado. '+erro).status(400)
    }    
})
app.put('/editar/pessoa/:id', (req, res)=>{
    //Atualizar dados
    let dados = Object.values(req.body).map((val)=>val)
    const sql = `UPDATE pessoa SET nome=?, cpf=?, endereco=?  WHERE id = ${req.params.id}`
    try {
        con.query(sql, dados, (erro, resp)=>{
            let resposta
            if(erro) resposta = {...erro, status:400, message: `Os dados não foram gravados`}
            else resposta = {...resp, status:200, message: `Sucesso!`}
            res.json(resposta).status(200)
        });
    } catch (erro) {
        res.send('O registro não pode ser gravado. '+erro).status(400)
    }    
})

app.delete('/excluir/pessoa/:id', (req, res)=>{
    //ler dados
    const sql = `DELETE FROM pessoa WHERE id =${req.params.id}`
    try {
        con.query(sql, (erro, resp)=>{
            let resposta
            if(erro) resposta = {...erro, status:400, message: `Os dados não foram excluídos`}
            else resposta = {...resp, status:200, message: `Sucesso: ${resp.affectedRows} linha(s) alterada(s)`}
            res.json(resposta).status(200)
        })
    } catch (erro) {
        res.send('O registro não pode ser gravado. '+erro).status(400)
    }    
})

app.listen(porta, ()=>console.log(`Servidor rodando em: http://localhost:${porta}`))