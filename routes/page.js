const express = require('express')
const router = express.Router()
const {ensureAuth} = require('../middleware/auth')
const Page = require('../models/Page')


router.get('/',ensureAuth,async (req,res)=>{
    var user = req.user;
    const pages = await Page.find({_id: {"$in":user.pages }}).lean()
    return pages
})


router.get('/:id',ensureAuth,async (req,res)=>{
    try{
        const page = await Page.findOne({_id:req.params.id}).lean()
    }catch(error){
        //RETURN RESOURCE NOT FOUND

    }
    if(req.user.id===page.ownerId || page.status==="public"){
        return page;
    }
    else{
        res.redirect('/dashboard')
    }
})


router.post('/add',ensureAuth,async (req,res)=>{
    
    try {
        let name= 'Untitled'
        if(req.body.hasOwnProperty(pageName)){
            name = req.body.name
        }
        
        let page = await Page.create({
                                    'ownerId':req.user.id,
                                    'pageName':name
                                })
        return page._id

    } catch (error) {
        // TODO:
    }
})

router.put('/:id',ensureAuth,async (req,res)=>{
    let page = req.body
    try{
        page = await Page.findOneAndUpdate({_id : req.params.id}, page, {
            new: true,
            runValidators: true
        })
    }catch(error){
        // TODO:
    }
})
module.exports = router