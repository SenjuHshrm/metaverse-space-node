const moment = require('moment')

module.exports = (date, format) => {
  return moment(date, 'LL').format(format)
}