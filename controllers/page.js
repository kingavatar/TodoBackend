const Page = require('../models/Page')

async function getPages(req,res){
    var user = req.user;
    const pages = await Page.find({_id: {"$in":user.pages }}).lean()
    return pages
}

async function getPageById(req,res){
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
        return page._id

    } catch (error) {
        // TODO:
    }
}

async function updatePage(req,res){
    let page = req.body
    try{
        page = await Page.findOneAndUpdate({_id : req.params.id}, page, {
            new: true,
            runValidators: true
        })
    }catch(error){
        // TODO:
    }
}

module.exports = {getPages, getPageById, addPage, updatePage}