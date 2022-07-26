const Event = require('../../../models/Event')
const fs = require('fs')
const date = require('../../../utils/date')

const getAllEvents = async (req, res) => {
  try {
    let events = await Event.find({}).exec()
    return res.status(200).json({ sucess: true, info: events })
  } catch(e) {
    return res.status(500).json({ success: false, msg: '' })
  }
}

const getLatestEvent = async (req, res) => {
  try {
    let response = []
    let event = await Event.find({}).sort({ createdAt: -1 }).limit(4).exec()
    event.forEach(e => {
      response.push({
        id: e._id,
        title: e.title,
        description: `${e.description.substring(0, 200)}...`,
        img: e.img,
        createdAt: date(e.createdAt, 'MMMM DD, YYYY')
      })
    })
    return res.status(200).json({ success: true, info: response })
  } catch(e) {
    return res.status(500).json({ success: false, msg: '' })
  }
}

const saveEvent = async (req, res) => {
  const { file, body: { title, description } } = req
  let imgName = req.body.title.replace(' ', '-').toLowerCase(),
        format = file.mimetype.split('/')[1]
  new Event({
    title: title,
    description: description,
    img: `/events/${imgName}.${format}`
  }).save()
    .then(newEvt => {
      return res.status(200).json({ success: true, msg: 'Event added successfully' })
    })
    .catch(e => {
      return res.status(500).json({ success: false, msg: '' })
    })
}

const viewEvent = async (req, res) => {
  try {
    let evt = await Event.findById(req.params.id).exec()
    let response = {
      id: evt._id,
      title: evt.title,
      description: evt.description,
      img: evt.img,
      createdAt: date(evt.createdAt, 'MMMM DD, YYYY')
    }
    return res.status(200).json({ success: true, info: response })
  } catch(e) {
    return res.status(500).json({ success: false, msg: '' })
  }
}

module.exports = { getAllEvents, saveEvent, viewEvent, getLatestEvent }