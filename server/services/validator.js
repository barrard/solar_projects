module.exports = {
  validate_new_client
}


function validate_new_client(client){
  /* just make sure there is a first and last name */
  logger.log({client})
  console.log('validate_new_client')
  let {firstname, lastname} = client
  if((firstname.trim() === '')||(lastname.trim() === '')){
    return false
  }else{
    return true
  }

}