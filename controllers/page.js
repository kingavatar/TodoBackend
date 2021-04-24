const Page = require('../models/Page');
const User = require('../models/User');
const Note = require('../models/Note');

async function getPages(req,res){
    const user = await User.findById(req.payload._id)
    const pages = await Page.find({_id: {"$in":user.pages }}).lean()
    res.json({pages: pages})
    res.status(200).send()
}

async function getPageById(req,res){
    try{
        var page = await Page.findById(req.params.id).populate('notesIn').lean()
    }catch(error){
        res.status(404).send()
    }
    if(req.payload._id==page.ownerId || page.status=="public"){
        res.json({page: page})
    }
    else{
        res.status(401).send()
    }
}

async function addPage(req,res){
    try {
        let name= 'Untitled'
        if(req.body.hasOwnProperty(pageName)){
            name = req.body.name
        }
        let page = await Page.create({
                                    'ownerId':req.payload.id,
                                    'pageName':name
                                })
        res.status(200).send("Update Successful")
    } catch (error) {
        res.status(500)
    }
}

async function updatePage(req,res){
    let page = req.body.page
    try{
        var notes = page.notesIn
        console.log(notes)
        page.notesIn = []
        for(let note of notes){
            try{
                console.log(note)
                var temp = await Note.findOneAndUpdate({_id: note._id},note,{new: true, runValidators: true})
                page.notesIn.push(note._id) 
                
            }catch(err){
                console.log(err)
                res.status(500).send()
            }
        }
        console.log(page)
        page = await Page.findOneAndUpdate({_id : req.params.id}, page, {
            new: true,
            runValidators: true
        })
        res.status(200).send()
    }catch(error){
        res.status(500).send()
    }
}

async function deletePage(req,res){
    try{
        var page = await Page.findById(req.params.id).lean()
        console.log(page)
        console.log(req.payload._id)
        if(!page){
            res.status(404).send()
        }
        else if(page.ownerId != req.payload._id){
            res.status(401).send("Un authorized")
        }
        else{
            var notes = page.notesIn
            for(let note of notes){
                if(note == null){
                    break
                }
                var temp = await Note.deleteOne(note._id)
            }
            var g = await Page.findByIdAndDelete(req.params.id)
            res.status(201).send()
        }
    }catch(err){
        console.log(err)
        res.status(500).send()
    }
}
module.exports = {getPages, getPageById, addPage, updatePage, deletePage}