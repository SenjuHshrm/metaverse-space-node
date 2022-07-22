module.exports = (obj) => {
  if(obj.middleName === '') {
    if(obj.extName === '') {
      return `${obj.firstName} ${obj.lastName}`
    } else {
      return `${obj.firstName} ${obj.lastName}, ${obj.extName}`
    }
  } else {
    if(obj.extName === '') {
      return `${obj.firstName} ${obj.middleName.charAt(0)}. ${obj.lastName}`
    } else {
      return `${obj.firstName} ${obj.middleName.charAt(0)}. ${obj.lastName}, ${obj.extName}`
    }
  }
}