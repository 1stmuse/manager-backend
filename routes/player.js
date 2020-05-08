const router= require('express').Router();

let Player = require('../models/player.model');


router.route('/own/:id').get((req, res)=>{
    Player.find({managerId:req.params.id, forSale:false})
        .then(users=> res.json(users))
        .catch(err=> res.status(404).json('error to get players' + err))
})

router.route('/addPlayer').post((req, res)=>{
    
    const playerInfo= {
        name: req.body.name,
        nationality: req.body.nationality,
        age: req.body.age,
        strength:req.body.strength,
        position: req.body.position,
        value: req.body.value,
        strong_foot:req.body.strong_foot,
        club: req.body.club,
        managerId:req.body.managerId
    }

    const newPlayer = new Player(playerInfo)
    newPlayer.save()
     .then(()=> res.json(newPlayer))
     .catch(err=> res.status(404).json('error' + err) )
})

router.route('/delete/:id').delete((req, res)=>{
    Player.findByIdAndDelete(req.params.id)
        .then(()=>res.json('player deleted'))
        .catch(err=> res.status(404).json('error' + err))
})

router.route('/sale').put(async(req,res)=>{

    const checkPlayerExist = await Player.findOne({_id: req.body.id})
    if(!checkPlayerExist) return res.status(400).json('player does not exist')

    try {
        Player.findByIdAndUpdate({_id: req.body.id}, {forSale: true}, {new: true, useFindAndModify: false})
        .then(data=>{
            if(data) return res.status(200).json(data)
        })
    } catch (error) {
        res.status(404).json(error, 'backend')
    }
})

router.route('/forSale').get((req,res)=>{
    Player.find({forSale: true})
        .then(players=>res.json(players))
        .catch(err=> res.status(404).json('error ' + err))
})






module.exports= router;