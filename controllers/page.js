const Page = require("../models/Page");
const User = require("../models/User");
const Note = require("../models/Note");
const mongoose = require("mongoose");

async function getPages(req, res) {
  // if(req.payload===undefined){
  //   res.status(404).send()
  // }
  const user = await User.findById(req.payload._id);
  const pages = await Page.find({ _id: { $in: user.pages } }).lean();
  // console.log(user.pages);
  res.json({ pages: pages });
}

async function getPageById(req, res) {
  try {
    var page = await Page.findById(req.params.id).populate("notesIn").lean();
  } catch (error) {
    res.status(404).send();
  }
  if (req.payload._id == page.ownerId || page.status == "public") {
    res.json({ page: page });
  } else {
    res.status(401).send();
  }
}

async function addPage(req, res) {
  try {
    let name = "Untitled";
    if (req.body.hasOwnProperty("title")) {
      name = req.body.title;
    }
    let page = await Page.create({
      ownerId: req.payload._id,
      title: name,
    });
    let myUser = await User.findById(req.payload._id);
    myUser.pages.push(page._id);
    await myUser.save();
    res.send(page);
    // res.status(200).send("Update Successful")
  } catch (error) {
    res.status(500);
  }
}

async function updatePage(req, res) {
  let page = req.body;
  try {
    var notes = page.notesIn;
    console.log(notes)
    page.notesIn = [];
    for (let note of notes) {
      try {
        console.log("note ",note);
        pattern = new RegExp(
          "^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$",
          "i"
        ); // Pattern to check uuidv4
        if (pattern.test(note._id)) {
          var temp = await Note.create({
            content: note.content,
            priority: note.priority,
            imgList: note.imgList,
            ownerId: req.payload._id,
            pageId: note.pageId,
          });
          page.notesIn.push(temp._id);
        } else {
          note.ownerId = req.payload._id;
          var temp = await Note.findOneAndUpdate(
            { _id: note._id },
            note,
            {
              new: true,
              runValidators: true,
              upsert: true,
            }
          );
          page.notesIn.push(note._id);
        }
      } catch (err) {
        console.log(err);
        res.status(500).send();
      }
    }
    const tempPage = await Page.findById(req.params.id);
    tempPage.notesIn
      .filter((i) => page.notesIn.indexOf(i) === -1)
      .forEach(async (i) => {
        await Note.deleteOne({ _id: i });
      });
    page = await Page.findOneAndUpdate({ _id: req.params.id }, page, {
      new: true,
      runValidators: true,
    });
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}

async function deletePage(req, res) {
  try {
    var page = await Page.findById(req.params.id).lean();
    console.log(page);
    console.log(req.payload._id);
    if (!page) {
      res.status(404).send();
    } else if (page.ownerId != req.payload._id) {
      res.status(401).send("Un authorized");
    } else {
      var notes = page.notesIn;
      for (let note of notes) {
        if (note == null) {
          break;
        }
        var temp = await Note.deleteOne(note._id);
      }
      var g = await Page.findByIdAndDelete(req.params.id);
       let myUser = await User.findById(req.payload._id);
       myUser.pages.splice(myUser.pages.indexOf(req.payload._id), 1);
       await myUser.save();
      res.status(201).send();
    }
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
}

async function copyPage(req, res) {
  try {
    var page = await Page.findById(req.params.id).lean();
    delete page._id;
    var newPage = await Page.create(page);
    newPage.title+=" Copy";
    newPage.save();
    res.send(newPage);
    // res.status(200).send("Update Successful")
  } catch (error) {
    res.status(500);
  }
}

module.exports = { getPages, getPageById, addPage, updatePage, deletePage ,copyPage};
