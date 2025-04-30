const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée'];

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Produit', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Le nom est déjà pris.'
      },
      validate: {
        notNull: { msg: 'Le nom est requis.' },
        notEmpty: { msg: 'Le nom ne doit pas être vide.' },
        len: {
          args: [3, 50],
          msg: 'Le nom doit contenir entre 3 et 50 caractères.'
        }
      }
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Utilisez uniquement des nombres entiers.' },
        min: {
          args: [0],
          msg: 'Les points de dégâts doivent être supérieurs ou égaux à 0.'
        },
        max: {
          args: [99],
          msg: 'Les points de dégâts doivent être inférieurs ou égaux à 99.'
        },
        notNull: { msg: 'Les points de dégâts sont une propriété requise.' }
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: { msg: 'Utilisez une URL valide pour l\'image.' }
      }
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('types');
        return rawValue ? rawValue.split(',') : [];
      },
      set(types) {
        if (Array.isArray(types)) {
          this.setDataValue('types', types.join(','));
        } else if (typeof types === 'string') {
          this.setDataValue('types', types);
        }
      },
      validate: {
        isTypesValid(value) {
          if (!value) {
            throw new Error('Un produit doit avoir au moins un type.');
          }
          const typesArray = value.split(',');
          if (typesArray.length > 3) {
            throw new Error('Un produit ne peut pas avoir plus de trois types.');
          }
          typesArray.forEach(type => {
            if (!validTypes.includes(type)) {
              throw new Error(`Le type "${type}" doit appartenir à la liste suivante : ${validTypes.join(', ')}`);
            }
          });
        }
      }
    }
  },
  {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  });
};
