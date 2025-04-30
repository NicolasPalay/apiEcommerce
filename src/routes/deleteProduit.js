const {Produit} = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.delete('/api/produits/delete/:id',auth, (req,res) => {
        Produit.findByPk(req.params.id) 
            .then (produit => {
                if(produit === null){
                    const message = 'Le produit n\'existe pas. Réessayez avec un autre id.'
                    res.status(404).json({message, data:error})
                }
                const produitDeleted = produit
                return Produit.destroy({
                    where:{id:produit.id}
                })
                .then (_ => {
                    const message = `Le produit ${produit.name} a bien été supprimé.`
                    res.json({message, data:produitDeleted})
                })
            })
            .catch(error =>{
                const message = 'Le produit n\'a pu être modifié. Réessayez dans quelques instants.'
                res.status(500).json({message, data:error})
            })
    })
}