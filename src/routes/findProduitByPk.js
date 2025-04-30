const {Produit} = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/produit/:id',auth, (req,res) => {
        Produit.findByPk(req.params.id)
            .then(produit =>{
                const message = 'un produit a bien été trouvé'
                res.json({message, data:produit})
            })
            .catch(error =>{
                const message = 'Le produit n\'a pu être récupérée. Réessayez dans quelques instants.'
                res.status(500).json({message, data:error})
            })
    }) 
}