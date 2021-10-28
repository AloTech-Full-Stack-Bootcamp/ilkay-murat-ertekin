const express = require('express')

const app = express()
const port = 5000

app.get('/', (req, res) => {
    res.send('<h1>index</h1>')
})

app.get('/about', (req, res) => {
    res.send('<h1>About</h1>')
})

app.get('/contact', (req, res) => {
    res.send('<h1>Contact</h1>')
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

