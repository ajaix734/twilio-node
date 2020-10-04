'use strict'

const express = require('express')
const router = express.Router()
const { sendService, statusService } = require('../services/index.js')

exports.sendController = router.post('/send', async (req, res) => {
    try {
        let response = await sendService(req.body)
        res.json({ message: response })
    } catch (error) {
        res.status(404).send(error)
    }
    
})

exports.statusController = router.post('/status', async (req,res) => {
    try {
        let response = await statusService(req.body)
        res.json({ message: response })
    } catch (error) {
        res.status(404).send(error)
    }
});