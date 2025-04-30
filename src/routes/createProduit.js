const {Produit} = require('../db/sequelize')
const auth = require('../auth/auth')

const {ValidationError, UniqueConstraintError} = require('sequelize')

module.exports = (app) => {
    app.post('/api/produits',auth, (req,res) => {
        Produit.create(req.body)
            .then(produit => {
                const message = `Le produit ${req.body.name} a bien été crée.`
                res.json({message, data:produit})
            })
            .catch(error =>{
                if(error instanceof ValidationError){
                    return res.status(400).json({message:error.message, data:error})
                }
                if(error instanceof UniqueConstraintError){
                    return res.status(400).json({message: error.message, data:error})
                }
                const message = 'Le produit n\'a pu être ajouté. Réessayez dans quelques instants.'
                res.status(500).json({message, data:error})
            })
    })
}