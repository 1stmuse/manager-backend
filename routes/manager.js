const router= require('express').Router();
const bcrypt = require('bcrypt')

let Manager = require('../models/manager.model');



router.route('/register').post(async(req,res)=>{

    const emailExist = await Manager.findOne({email: req.body.email})
    if(emailExist) return res.status(400).json('a user with that email already exist')
    const usernameExist= await Manager.findOne({username: req.body.username})
    if(usernameExist) return res.status(400).json('username already exist')

    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(String(req.body.password), salt)



    const ManagerInfo = {
        name: req.body.name,
        email: req.body.email,
        password: hashPass,
        username: req.body.username,
        club: req.body.club
    }

    try {
        const newManager= new Manager(ManagerInfo)
        newManager.save()
        .then(()=> res.json({
            id: newManager._id,
            name: newManager.name,
            account: newManager.account,
            club: newManager.club
        }))
    } catch (error) {
        res.status(404).json('not found')
    }

})

router.route('/login').post( async(req,res)=>{

    const validUser = await Manager.findOne({username: req.body.username})
    if(!validUser) return res.status(400).json('username or password incorrect')

    const validatePassword = await bcrypt.compare(String(req.body.password), validUser.password)
    if(!validatePassword) return res.status(400).json('username or password incorrect')

    
    try {
        const loginInfo={
            password: req.body.password,
            username: req.body.username
        }

        res.status(200).json({
            id: validUser._id,
            name: validUser.name,
            account: validUser.account,
            club: validUser.club
        })

    } catch (error) {
        res.status(404).json('not found')
    }
})



module.exports= router;