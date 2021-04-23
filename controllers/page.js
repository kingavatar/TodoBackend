const Page = require('../models/Page')

async function getPages(req,res){
    var user = req.user;
    const pages = await Page.find({_id: {"$in":user.pages }}).lean()
    res.json({pages: pages})
    res.status(200)
}

async function getPageById(req,res){
    try{
        const page = await Page.findOne({_id:req.params.id}).lean()
    }catch(error){
        res.status(404)
    }
    if(req.user.id===page.ownerId || page.status==="public"){
        res.json({page: page})
    }
    else{
        res.status(401).json({})
    }
}

async function addPage(req,res){
    try {
        let name= 'Untitled'
        if(req.body.hasOwnProperty(pageName)){
            name = req.body.name
        }
        let page = await Page.create({
                                    'ownerId':req.user.id,
                                    'pageName':name
                                })
        res.status(200).send("Update Successful")
    } catch (error) {
        res.status(500)
    }
}

async function updatePage(req,res){
    let page = req.body
    try{
        page = await Page.findOneAndUpdate({_id : req.params.id}, page, {
            new: true,
            runValidators: true
        })
        res.status(200)
    }catch(error){
        res.status(500)
    }
}

module.exports = {getPages, getPageById, addPage, updatePage}