const mongoose= require('mongoose');

const Schema = mongoose.Schema;
const ObjectId= Schema.Types.ObjectId

const playerSchema= new Schema({
    name: {type:String , required:true},
    nationality: {type:String , required:true},
    age: {type:Number , required:true},
    strength:{type:Number , required:true},
    position: {type:String , required:true},
    value: {type:Number , required:true},
    strong_foot: {type:String , required:true},
    club: {type:String , required:true},
    forSale:{type:Boolean, required:true, default:false},
    managerId: {type: ObjectId}

}, {
    timestamps: true
});



const Player = mongoose.model('player', playerSchema);

module.exports=Player;