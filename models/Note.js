const mongoose = require("mongoose");
const constants = require("../config/constants");

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
      trim: true,
    },
    content: {
      type: String,
      required: false,
      default:''
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    timer: {
      type: Date,
      required: true,
      default: new Date(+new Date() + constants.ONEDAY),
    },
    priority: {
      type: Number,
      required: true,
      min: 0,
      max: 4,
      default: 0,
    },
    imgList: [
      {
        type: String,
        required: false,
        default: "",
      },
    ],
    pageId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Page",
    },
  },
  { timestamps: true }
);


function isStringRequired() {
  console.log(this.content);
  return typeof this.content === "string" ? false : true;
}


module.exports = mongoose.model("Note", NoteSchema);
