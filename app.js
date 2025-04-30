const express = require("express")
const sequelize = require('./src/db/sequelize')

const favicon = require("serve-favicon")
const path = require("path") 
const bodyParser = require("body-parser")


const app = express()
const port = process.env.PORT || 3000


app
    .use(favicon(path.join(__dirname, "favicon.ico")))
    .use(bodyParser.json())

sequelize.initDb()

app.get('/', (req,res) => {
    res.json('Hello, heroku !')
})

//Points de terminaison
require('./src/routes/findAllProduits')(app)
require('./src/routes/findProduitByPk')(app)
require('./src/routes/createProduit')(app)
require('./src/routes/updateProduit')(app)
require('./src/routes/deleteProduit')(app)
require('./src/routes/login')(app)


//Gestion d'erreur
app.use(({res}) => {
    const message = 'Impossible de trouver la page demander.'
    res.status(404).json({message})
})


app.listen(port, () => console.log(`notre appli est demarrée sur :http://localhost:${port}`))