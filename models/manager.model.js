const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const managerSchema= new Schema({
    name:{type:String , required:true},
    username: {type:String , required:true},
    email: {type:String , required:true},
    password: {type:String, required:true},
    club: {type:String, required:true},
    account:{type:Number, default:4500000}
}, {
    timestamps: true
});



const Manager = mongoose.model('Manager', managerSchema);
module.exports=Manager;