const {Produit} = require('../db/sequelize')
const {ValidationError, UniqueConstraintError} = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.put('/api/produits/:id',auth, (req,res) => {
        const id = req.params.id
        Produit.update(req.body, {
            where:{id:id}
        })
        .then (_ => {
            return Produit.findByPk(id)
                .then(produit => {
                    if(produit === null){
                            const message = 'Le produit n\'existe pas. Réessayez avec un autre id.'
                            res.status(404).json({message, data:error})
                    }
                    const message = `Le produit ${req.body.name} a bien été modifié.`
                    res.json({message, data:produit})
                })
               
        })
        .catch(error =>{
            if(error instanceof ValidationError){
                return res.status(400).json({message:error.message, data:error})
            }
            if(error instanceof UniqueConstraintError){
                return res.status(400).json({message: error.message, data:error})
            }
            const message = 'Le produit n\'a pu être modifié. Réessayez dans quelques instants.'
            res.status(500).json({message, data:error})
        })
    })
}