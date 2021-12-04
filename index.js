const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json({ extended: true, limit: '10mb' }))

app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/note', require('./routes/note.route'))

async function start() {
  try {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.q5qfk.mongodb.net/note?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    app.listen(PORT, () => console.log('Server started on port ', PORT))
  } catch (e) {
    console.error(e)
  }
}

start()