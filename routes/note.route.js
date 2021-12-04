const { Router } = require('express')
const Note = require('../models/Note')

const router = Router()

router.post('/add', async (req, res) => {
  try {
    const { text, userId } = req.body

    const note = new Note({
      owner: userId,
      text
    })

    await note.save()

    res.json(note)
  } catch (error) {
    console.log(error)
  }
})

router.get('/', async (req, res) => {
  try {
    const { userId } = req.query

    const note = await Note.find({ owner: userId })

    res.json(note)
  } catch (error) {
    console.log(error)
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params

    const note = await Note.findOneAndDelete({ _id: id })

    res.json(note)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router



