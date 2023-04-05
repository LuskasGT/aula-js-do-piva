import express from "express"
import bodyParser from "body-parser"
import jwt from "jsonwebtoken"
import axios from "axios"


const app = express()

//middlewares
app.use(bodyParser.json())

// Requisições GET e POST
// GET -> pegar informação
// POST -> inserir, enviar informação

// json -> Content-Type: application/json
// query parameters -> ?
app.get('/', (request, response) => {
    const parametros = request.query // {nome: Pedro}

    //console.log(request)

    response.json({
        nome: parametros.nome,
        banana: true
    })
})

app.post('/dados', (req, res) => {
    const token = req.body.token
    jwt.verify(token, "aula", (erro, decodificado) => {
        if (erro) {
            res.status(401).send()
        } else {
            res.json(decodificado)
        }
    })
})

app.get('/discord', (req, res) => {
    const URL_BASE = "https://discord.com/api"
    console.log(req.query.code)

    const params = new URLSearchParams()
    params.append("client_id", "1085514062525374495")
    params.append("client_secret", "")
    params.append("grant_type", "authorization_code")
    params.append("code", req.query.code)
    params.append("redirect_uri", )
    axios.post(URL_BASE + "/oauth2/token")

    res.send()
})


app.listen(3000, () => {
    console.log("servidor online")
})
