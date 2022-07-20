module.exports = (env) => {
  console.log(env)
  let port = 0
  switch(env) {
    case 'development':
      port = 5000;
      break;
    case 'test':
      port = 4000;
      break;
    default:
      port = 3000
  }
  return port;
}