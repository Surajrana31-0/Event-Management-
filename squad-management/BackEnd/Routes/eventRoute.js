const express = require('express');
const router = express.Router();
const eventController = require('../Controller/eventController');

router.post('/', eventController.createEvent);

router.get('/', eventController.getAllEvents);
module.exports = router;
