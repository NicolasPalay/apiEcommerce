const { Sequelize, DataTypes } = require('sequelize')
const ProduitModel = require('../models/produits')
const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
let produits = require('./mock-produits')
require('dotenv').config();


let sequelize

if (process.env.NODE_ENV === 'production') {
    sequelize = new Sequelize( // ✅ ici on affecte à la variable globale
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            dialect: process.env.DB_DIALECT,
            dialectOptions: {
              ssl: {
                require: true,
                rejectUnauthorized: false, // pour Aiven
              }
            }
        }
    )
} else {
    sequelize = new Sequelize( // ✅ ici aussi
        "marketplace-artiste",
        "root",
        "",
        {
            host: "localhost",
            port: 3308,
            dialect: 'mariadb',
            
        dialectOptions: {
          timezone: 'Etc/GMT-2',
        },
            logging: true
        }
    )
}
const Produit = ProduitModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
    return sequelize.sync({force:true})
    .then(_ => {
        console.log('la base est synchro')        
        produits.map(produit =>{
            Produit.create({
                name:produit.name,
                content: produit.content,
                hp:produit.hp,
                picture: produit.picture,
                types: produit.types
            })
        })
        bcrypt.hash('pikachu',10)
            .then(hash => { User.create({username:'pikachu',password:hash})
            })
        
    })
}

module.exports = {
    initDb, Produit, User
}
