const express = require('express')
const router = express.Router()
const {ensureAuth} = require('../middleware/auth')
const Page = require('../models/Page')



router.get('/',ensureAuth,async (req,res)=>{
    var user = req.user;
    const pages = await Page.find({_id: {"$id":user.pages }}).lean()
    return pages
})


router.get('/:id',ensureAuth,async (req,res)=>{
    
    try{
        const page = await Page.findOne({_id:req.params.id}).lean()
    }catch(error){
        //RETURN RESOURCE NOT FOUND
    }
    if(req.user.id===page.ownerId){
        return page;
    }
    else{
        res.redirect('/dashboard')
    }
})



module.exports = router