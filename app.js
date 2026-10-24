const express = require("express")
const app = express()
const axios = require("axios")
const {engine} = require("express-handlebars")
const PORT = 3000
const path = require("path")
const API_URL = "https://ron-swanson-quotes.herokuapp.com/v2/quotes"

let citacaoDia = ""
let ultimoAcesso = ""

app.engine("handlebars",engine({defaultLayout: "main",
        layoutsDir: path.join(__dirname, "views/layouts"),
    }))
app.set("view engine","handlebars")


app.get("/", async (req,res)=>{
    try {
        const hoje = new Date().toLocaleDateString("pt-br")

        if (ultimoAcesso !== hoje || !citacaoDia) {
            const response = await axios.get(API_URL)
            citacaoDia = response.data[0]
            ultimoAcesso = hoje            
            console.log("Requisição da API feita com êxito!")
        }

        res.render("home",{citacao: citacaoDia})
        console.log(`Frase do dia ${ultimoAcesso} mostrada!`)
    }
    catch(err) {
        console.log(err)
        res.send("Erro ao acessar API ")
    }
    
})

app.listen(PORT,()=> {
    console.log(`Servidor rodando na porta ${PORT}!`)
})