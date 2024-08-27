const mongoose = require('mongoose')
//const Schema = mongoose ;

const optionVoteSchema = mongoose.Schema({
    voter: {type: String},
    selectedOpitons: {type: Array, required: true} 
    
})

const PollOptionSchema = mongoose.Schema({
    pollName: { type: String, required: true},
    voteCount: { type: Number, default: 0},
    votes: {type: [optionVoteSchema], required: false, default: []},
    options: { type: Array}
});

const senderSchema = mongoose.Schema({
    from: {type: String, required: true},
    notifyName: {type: String, required: false},
    author: {type: String, required: false}
})

const contentSchema = mongoose.Schema({
    messageType: {type: String, required: true},
    body: {type: String, required: false},
    duration: {type: String, required: false}
})

const messageSchema = mongoose.Schema({
    whatsappId: {type: String, required: true, unique: true},
    content: {type: contentSchema, required: true},
    sender: {type: senderSchema, required: true},
    recipient: {type: String, required: true},
    timestamp: { type: Date, required: true },
    isRead: {type: Boolean, required: true},
    deviceType: {type: String, required: true},
    pollOptions: { type: PollOptionSchema, required: false},
    parentMessage: { type: Object, required: false}
})



module.exports = mongoose.model('Message', messageSchema) ;