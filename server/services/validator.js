module.exports = {
  validate_new_client, validate_new_proposal
}


function validate_new_proposal(proposal){
  /* just make sure there is a first and last name */
  logger.log({proposal})
  logger.log('validate_new_proposal')

  if(proposal.client == "Select Client"){
    logger.log('validate_new_proposal false')
    return false
  }else{
    logger.log('validate_new_proposal true')
    return true
  }

}



function validate_new_client(client){
  /* just make sure there is a first and last name */
  logger.log({client})
  logger.log('validate_new_client')
  let {firstname, lastname} = client
  if((firstname.trim() === '')||(lastname.trim() === '')){
    return false
  }else{
    return true
  }

}