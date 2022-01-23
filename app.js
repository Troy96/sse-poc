/**
 * Created by Tuhin Roy on 23rd Jan, 2022
 * Basic POC for a SSE (Server-Sent Event) communication between a server and a client
 * Can be used when client is only interested to received updates from server and does not send any updates back to server
 */

const express = require('express')

const app = express()
app.use(express.static('public'))

app.get('/countdown', function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    })
    countdown(res, 10)
})

function countdown(res, count) {
    res.write("data: " + count + "\n\n")
    if (count)
        setTimeout(() => countdown(res, count - 1), 1000)
    else
        res.end()
}

app.listen(3000, () => console.log('SSE app listening on port 3000!'))