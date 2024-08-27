const Message = require("../models/Message");
const _ = require('lodash');
const {client} = require('../../client')


client.on('vote_update', async (vote) => {
    console.log("Nouveau vote", vote);

    const message = await Message.findOne({whatsappId : vote.parentMessage.id.id}, {'pollOptions.votes': true});
    const votes = message.pollOptions.votes 


    if(votes.some((item) => item.voter === vote.voter)){
        if(vote.selectedOptions.length === 0) { 
            votes = votes.filter((item) => item.voter !== vote.voter)
            console.log('one: ')
            await Message.updateOne({ whatsappId : vote.parentMessage.id.id }, { $set: {'pollOptions.votes' : votes} })
        } else {
            votes.find((item) => item.voter === vote.voter).selectedOptions = vote.selectedOptions

            // votes = votes.map(item => {
            //     if (item.voter === vote.voter) {
            //         return { ...item, selectedOptions: _.cloneDeep(vote.selectedOptions) }
            //     }

            //     return item
            // })

            console.log('two: ', votes.find((item) => item.voter === vote.voter).selectedOptions);
            console.log('two votes only: ', votes);
            await Message.updateOne({ whatsappId : vote.parentMessage.id.id }, { $set: {'pollOptions.votes' : votes} })
        } 
    } else {
        votes.push({ voter: vote.voter, selectedOptions: vote.selectedOptions })
        console.log('three: ')
        await Message.updateOne({ whatsappId : vote.parentMessage.id.id }, { $set: {'pollOptions.votes' : votes} })
    }

    // console.log('nouveau vote: ', votes); 
    // console.log('four' ,vote)
    
}) ;
