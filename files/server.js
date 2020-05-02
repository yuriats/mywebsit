// // Vamos falar de coisas basicas da programação em javascript 

// // // Variáve
// // const mensagem = "Oi, como vai?" //string 
// // const number = 3.4 // number

// // // Criando função com parametros (parametre)
// // function soma(numero1, numero2) {
// //     const somar = numero1 + numero2
// //     // console.log(numero1 + numero2)  --> printa
// //     return somar
// // }

// // console.log(mensagem)
// // console.log(number)

// // // Executando função
// // const somar = soma(10, 20)
// // console.log(soma(5,5))
// // console.log(somar)
// // soma(4, 20)
// // soma(8, 9)
// // soma(0, 2)
// // soma(10, 4)


// // O que é um objeto? 

// const xicara = {
//     // propriedades (atributos)
//     cor: "branco",
//     tamanho: 10,
//     estaSujo(simNao) {
//         // Lógica de programação
//         console.log(simNao)
//     }
//     // valor
// }

// console.log(xicara.cor)
// xicara.estaSujo("Não")

// const cor = "preto"
// const tamanho = 5
// function sujo(esta) {
//     console.log(esta)
// }

// const xicara2 = {
//     cor,
//     tamanho,
//     sujo
// }

//  Como configurar um servidor
// npm i nunjucks permite o uso de variaveis no html
// usei o expresso para criar e configurar o cervidor
const express = require("express")
const server = express()


// criando seu primeiro vetor

const db = require("./db")

// const ideas = [
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
//         title: "Cursos de programação",
//         category: "Estudo",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//         url: "http://youtube.com/c/pa!ciencias",
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
//         title: "Meditação",
//         category: "Saúde",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//         url: "http://youtube.com/c/pa!ciencias",
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729069.svg",
//         title: "Exercícios",
//         category: "Saúde",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//         url: "http://youtube.com/c/pa!ciencias",
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729078.svg",
//         title: "Jogo de Gartic",
//         category: "Entreterimento",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//         url: "http://youtube.com/c/pa!ciencias",
//     },
// ]

// configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

// habilitar uso do req.body
server.use(express.urlencoded({ extended: true }))

// configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    // noCache: true, //boolean 
    // cache guarda algumas coisas em memória para usar mais tarde 
})

// console.log(server)
// criei uma rota / 
// e capturo o pedido do cliente para responder (como um formulário)
// _dirname é uma variavel do node
server.get("/", function (req, res) {


    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) return console.log(err)

        const reversedIdeas = [...rows].reverse()
        let lastIdeas = []
        for (let idea of reversedIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }

        }
        return res.render("index.html", { ideas: lastIdeas })

        // console.log(rows)
    })

    // return res.sendFile(__dirname + "/index.html")
    // const cria uma variavel que não varia constante e o let uma "variavel"
    // REGRA DE NEGÓCIO
    //  o mesmo conteudo de ideas espalhado


    // pega as ideias de tras para frente 
    // lastIdeas = lastIdeas.reverse()

})

server.get("/ideias", function (req, res) {

    // req.query // ?

    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }
        const reversedIdeas = [...rows].reverse()

        return res.render("ideias.html", { ideas: reversedIdeas })

    })


})


server.post("/", function (req, res) {
    // console.log(req.body)

    // INSERIR DADOS NA TABELA
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
    `

    const values = [
       req.body.image,
       req.body.title,
       req.body.category,
       req.body.description,
       req.body.link,
    ]

    // callback é uma função que passa dentro de uma função em apenas determinado momento

    db.run(query, values, function (err) {
        if (err) return console.log(err)

        return res.redirect("/ideias")
    })

})


// liguei o servidor na porta 3000
server.listen(3000)


// array (vetores)
