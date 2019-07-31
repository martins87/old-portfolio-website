const express = require('express')
const app = express()

app.get('/', function(req, res) {
    res.send('aeeeew')
})

app.get('/token/:id', function(req, res) {
    console.log(req.params.id)
    res.send('aeeeew')
})

app.get('*', function(req, res) {
    res.send('404 page not found')
})

var port = 3087

app.listen(port, function() {
    console.log('Server listening on port ' + port)
})