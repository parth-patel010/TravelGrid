const mongoose = require('mongoose');

//Reply Schema

const replySchema = new mongoose.Schema({
    senderName:{type:String,required:true},
    message:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
});

// Question Answer Schema

const qaSchema = new mongoose.Schema({
    senderName:{type:String,required:true},
    message:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  info: { type: String, required: true },
  tag: { type: String, required: true },
  tagColor: { type: String, required: true },
  senderName: { type: String, required: true },
  postType: {
    type: String,
    enum: ['question', 'experience'],
    default: 'question'
  },
  replies: [replySchema],
  qa: [qaSchema]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);