module.exports = (env) => {
  console.log(env)
  let port = 0
  switch(env) {
    case 'development':
      port = 5000;
    case 'test':
      port = 4000;
    default:
      port = 3000
  }
  return port;
}