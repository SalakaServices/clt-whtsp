const express = require('express');
const router = express.Router() ;

const messageController = require('../controllers/messageController')

router.get('/messages', messageController.getAllMessages);
router.get('/message/:id', messageController.getOneMessage);
router.get('/messages/mot-cle/:key', messageController.getAllMessagesByMotCle)
router.get('/messages/sender/:from', messageController.getAllMessagesOfSender);
router.post('/message', messageController.createMessage);
router.put('/message/:id', messageController.updateMessage);
router.delete('message/:id', messageController.deleteMessage);


module.exports = router ;