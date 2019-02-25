const { sequelize, Sequelize } = require("../config/dbConnection"); 

const Albums = sequelize.define('albums', {
    id_album: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    background_image_url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: true
    },
    update_at: {
        type: Sequelize.DATE,
        allowNull: true
    }
},{
    timestamps: false
});

module.exports = Albums;