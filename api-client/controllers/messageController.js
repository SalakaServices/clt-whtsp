const message = require('../../models/Message') ;
const {client} = require('../../client');

/**-------------------------GET ALL MESSAGES---------------------------------------------*/
exports.getAllMessages = (req, res, next) => {
    message.find()
    .then((msgs) => res.status(200).json(msgs)) 
    .catch((error) => res.status(400).json(error))

};
/**--------------------------------------------------------------------------------------*/

/**------------------------GET ALL MESSAGE OF SENDER------------------------------------------------*/
exports.getAllMessagesOfSender = (req, res, next) => {
    message.find({'sender.from' : req.params.from})
    .then((msgs) => res.status(200).json(msgs))
    .catch((err) => res.status(400).json(err)); 

    console.log('Requete recue');
};
/**--------------------------------------------------------------------------------------*/

/**------------------------GET ALL MESSAGE OF SENDER------------------------------------------------*/
exports.getAllMessagesByMotCle = async (req, res, next) => {
  const q = req.params.key;

  // const agg = [
  //   {
  //     $search: {
  //       text: {
  //         query: q,
  //         path: 'content.body'
  //       }
  //     }
  //   },
  //   {
  //     $limit: 10,
  //   }
  // ]
  // const coll = await message.find(); 
  // let cursor = await coll.aggregate(agg);
  // await cursor.forEach((doc) => res.status(200).json(doc));

  const result =  await message.find({
    'content.body': {$regex: new RegExp(q, 'i')}
  }).limit(10);

  res.status(200).json(result);
};
/**--------------------------------------------------------------------------------------*/


/**------------------------GET A MESSAGE BY ID------------------------------------------------*/
exports.getOneMessage = (req, res, next) => {
    message.findOne({whatsappId: req.params.id})
    .then((message) => res.status(200).json(message))
    .catch((error) => res.status(400).json({error}));

    console.log('requette bien recu') ;

};
/**--------------------------------------------------------------------------------------*/

/**------------------------POST A MESSAGE------------------------------------------------*/
exports.createMessage = async (req, res, next) => {
  delete req.body._id;

  await client.sendMessage(req.body.recipient, req.body.content); 
};
/**--------------------------------------------------------------------------------------*/

/**-----------------------PUT A MESSAGE--------------------------------------------------*/
exports.updateMessage = (req, res, next) => {

};
/**--------------------------------------------------------------------------------------*/

/**-----------------------DELETE A MESSAGE-----------------------------------------------*/
exports.deleteMessage = (req, res, next) => {

};
/**--------------------------------------------------------------------------------------*/
