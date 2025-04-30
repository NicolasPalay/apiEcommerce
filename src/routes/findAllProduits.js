const { Produit } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/produits',auth, (req, res) => {
        if(req.query.name) {
            const name = req.query.name
            const limit = parseInt(req.query.limit) || 5
            if(name.length < 2){
                const message = 'le terme de recherche doit contenir au moins 2 caractères.'
                return res.status(400).json({message})
            }
            return Produit.findCountAll({
                where:{
                    name:{
                        [Op.like]: `%${name}%`
                    }
                },
                order: ['name'],
                limit :limit
            })
            .then(produits =>{
                const message = `il y a ${produits.length} prouits qui correspondant au terme de recherche ${name}.`
                res.json({message, data:produits})
            })
        }
     else {
        Produit.findAll({order: ['name']})
            .then(produits => {
                const message = 'la list des produit a bien été récupérée.'
                res.json({message, data: produits})
            })
            .catch(error =>{
                const message = 'La liste des produits n\'a pu être récupérée. Réessayez dans quelques instants.'
                res.status(500).json({message, data:error})
            })
     }
        
    })
}