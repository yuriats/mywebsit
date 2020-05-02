const sqlite3 = require('sqlite3').verbose()

// new cria um objeto na linguagem orientada a objeto ./ significa raiz do meu projeto, é necessário ter a referência
const db = new sqlite3.Database('./ws.db')

db.serialize(function () {

    // CRIAR A TABELA
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT, 
            category TEXT,
            description TEXT,
            link TEXT
        );
    `)

    // INSERIR DADOS NA TABELA
    // const query = `
    // INSERT INTO ideas(
    //     image,
    //     title,
    //     category,
    //     description,
    //     link
    // ) VALUES (?,?,?,?,?);
    // `

    // const values = [
    //     "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    //     "Cursos de programação",
    //     "Estudo",
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    //     "http://youtube.com/c/pa!ciencias"
    // ]

    // // callback é uma função que passa dentro de uma função em apenas determinado momento

    // db.run(query, values, function(err){
    //     if (err) return console.log(err)

    //     console.log(this)
    // })

    // // DELETAR UM DADO DA TABELA - implementar treino desefio
    // db.run(`DELETE FROM ideas WHERE id = ?`, [1], function (err) {
    //     if (err) return console.log(err)

    //     console.log("DELETEI", this)


    // })

    // CONSULTAR DADOS NA TABELA 

    // db.all(`SELECT * FROM ideas`, function (err, rows) {
    //     if (err) return console.log(err)

    //     console.log(rows)
    // })

})


// como usar o db na aplicação 

module.exports = db