// iniciando o projeto pegando as bibliotecas necessarias

const express = require("express")
const app = express()
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//criando um banco de dados falso
var DB = {
    games: [
        {
            id: 1,
            title: "Call of Duty MW",
            year: 2019,
            price: 55
        },
        {
            id: 2,
            title: "Sea of Thieves",
            year: 2018,
            price: 30
        },
        {
            id: 3,
            title: "Counter Strike: Global Offensive",
            year: 2012,
            price: 20
        },
        {
            id: 4,
            title: "Fifa 23",
            year: 2022,
            price: 100
        }
    ]
}

//criando as rotas
app.get("/games",(req, res)=>{
    res.statusCode = 200
    res.json(DB.games)
})

//rota pra pegar os games pelo ID
app.get("/game/:id",(req, res) =>{

    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
       var id = parseInt(req.params.id)

       var game = DB.games.find(g => g.id == id)

       if(game != undefined){
            res.statusCode = 200
            res.json(game)
       }else{
            res.sendStatus(404)
       }
    }
})

// rota para cadastro de dados na api
app.post("/game",(req, res) => {
    
    var {title, price , year} = req.body

    DB.games.push({
        id: 5,
        title,
        price,
        year
    })
res.sendStatus(200)
})

// endpoint pra deletar dados
app.delete("/game/:id",(req, res) =>{

    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
       var id = parseInt(req.params.id)
       var index = DB.games.findIndex(g => g.id == id)

        if(index == -1){
            res.sendStatus(404)
        }else{
            DB.games.splice(index,1)
            res.sendStatus(200)
        }

    }
})

// editando dados na api
app.put("/game/:id",(req, res) =>{
    
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
       var id = parseInt(req.params.id)

       var game = DB.games.find(g => g.id == id)

       if(game != undefined){
            
        var {title, price , year} = req.body

        if(title != undefined){
            game.title = title
        }

        if(price != undefined){
            game.price = price
        }

        if(year != undefined){
            game.year = year
        }

        res.sendStatus(200)

       }else{
            res.sendStatus(404)
       }
    }
})


//iniciando o servidor
app.listen(1220,() =>{
    console.log("API rodando")
})