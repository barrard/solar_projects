// const bcrypt = require("bcrypt");
// const formidable = require("formidable");
const {validate_new_client} = require('../services/validator.js')
// const Socket_emitter = require('../socket_server.js').emit_event_to;
// const Socket_emitter = () => {
//   logger.log("Socet emitter");
// };

// var mongoose = require("mongoose");

var client_schema = require("../models/client_schema.js");
// const twilio = require("../services/twilio.js");
// const sendgrid = require("../services/sendgrid.js");

const Client = client_schema;
module.exports = Client;




module.exports.update_client = async (req, res, next) => {
  let updated_client = req.body
  logger.log({updated_client})
  logger.log('updated_client CLIENT!!')
  setTimeout(async()=>{
    try {
      let valid = validate_new_client(updated_client)
      if(!valid)throw 'Invalid client data'
      logger.log(`Find this id ${req.params.client_id}`)
      let client = await Client.findOneAndUpdate({
        _id: req.params.client_id}, {...updated_client}, {
          new:true
        });

      return res.send(client);
    } catch (err) {
      logger.log({err})
      return res.send({err:true, msg:err});
    }
  }, 500)

};


module.exports.add_client = async (req, res, next) => {
  let new_client = req.body
  logger.log({new_client})
  logger.log('CREATE CLIENT!!')
  setTimeout(async()=>{
    try {
      let valid = validate_new_client(new_client)
      if(!valid)throw 'Invalid client data'
      let client = await new Client(new_client).save();
      return res.send(client);
    } catch (err) {
      logger.log({err})
      return res.send({err:true, msg:err});
    }
  }, 500)

};



module.exports.get_clients = async (req, res, next) => {
  logger.log(req.user.id)/* Make sure clients belong to this user */
  let clients = await Client.find();
  // logger.log({clients})
  res.send(clients)
};


module.exports.get_client = async (req, res, next) => {
  logger.log(req.params)
  res.send(

    await Client.findById(req.params.client_id)
  )
};

module.exports.get_client_by_email = async email => {
  try {
    const query = {
      primary_email: email
    };
    let client = await Client.findOne(query);
    return client;
  } catch (err) {
    throw err;
  }
};



