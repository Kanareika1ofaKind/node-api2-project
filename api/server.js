// implement your server here

const express = require('express')
const server = express()

// require your posts router and connect it here

const postRouter = require('./posts/posts-router')

server.use(express.json());
server.use('/api/posts', postRouter);

server.use('/', (req, res) => {
    res.status(404).json({ message: 'not found' });
})

module.exports = server;

