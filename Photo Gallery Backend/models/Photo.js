const { sequelize, Sequelize } = require("../config/dbConnection"); 

const Images = sequelize.define('images', {
    id_img: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_album: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    dimentions: {
        type: Sequelize.STRING,
        allowNull: false
    },
    size: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    image_url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    public_id: {
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




module.exports = Images;