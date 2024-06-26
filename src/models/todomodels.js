
const {DataTypes} = require('sequelize');   
const sequelize = require('../../db/sequelize');

const todo = sequelize.define('todos', {


    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: true
    },
    completed:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    createdAt:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    
    


},
{
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
}
);

todo.sync({alter:true});
module.exports = todo;