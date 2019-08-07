module.exports.getChat = (req, res) => {
    res.render("chat")
}

module.exports.postChat = (req, res) => {

    const Chat = require("../database/Chat")

    const mongo = require('mongodb').MongoClient;
    const client = require('socket.io').listen(4000).sockets

    // Connect to mongo
    mongo.connect('mongodb://127.0.0.1/mongochat', (err, db) => {
        if (err)
            throw err

        console.log('MongoDB connected...')

        // Connect to Socket.io
        client.on('connection', socket => {
            let chat = db.collection('chats')

            // Create function to send status
            sendStatus = s => socket.emit('status', s)


            // Get chats from mongo collection
            Chat.find().limit(100).sort({
                _id: 1
            }).toArray((err, res) => {
                if (err)
                    throw err

                // Emit the messages
                socket.emit('output', res)
            });

            // Handle input events
            socket.on('input', data => {
                let name = data.name
                let message = data.message

                // Check for name and message
                if (name == '' || message == '') {
                    // Send error status
                    sendStatus('Please enter a name and message')
                } else {
                    // Insert message
                    Chat.insert({
                        name,
                        message
                    }, () => {
                        client.emit('output', [data])

                        // Send status object
                        sendStatus({
                            message: 'Message sent',
                            clear: true
                        })
                    })
                }
            })

            // Handle clear
            socket.on('clear', data => {
                // Remove all chats from collection
                Chat.remove({}, () => {
                    // Emit cleared
                    socket.emit('cleared')
                })
            })

        })
    })
}