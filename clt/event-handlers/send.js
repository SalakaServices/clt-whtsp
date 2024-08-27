const Message = require("../models/Message");
const {client} = require('../../client')

client.on('message_create', async (msg) => {
    // Fired on all message creations, including your own
    if (msg.fromMe && msg.type === 'poll_creation') {
        // do stuff here
        console.log('MESSAGE SEND', msg) ;

        const message = new Message({
            whatsappId: msg.id.id ,
            content: {messageType: msg.type, body: msg.body, duration: msg.type === 'ptt'|| 'video'? msg._data.duration : null},
            sender: {from: msg.from, notifyName: msg._data.notifyName, author: msg.author},
            recipient: msg.to,
            timestamp: new Date(msg.timestamp * 1000),
            isRead: msg._data.viewed,
            deviceType: msg.deviceType,
            pollOptions: msg.type === 'poll_creation' ? {pollName: msg.body, voteCount: 0, options: msg.pollOptions} : null ,
            parentMessage: msg.hasQuotedMsg === true ? msg._data.quotedMsg : null 
        })
    
        await message.save()
                .then()
                .catch()
    }

    // Unpins a message
    if (msg.fromMe && msg.body.startsWith('!unpin')) {
        const pinnedMsg = await msg.getQuotedMessage();
        if (pinnedMsg) {
            // Will unpin a message
            const result = await pinnedMsg.unpin();
            console.log(result); // True if the operation completed successfully, false otherwise
        }
    }
});

