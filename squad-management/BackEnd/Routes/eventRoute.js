const express = require('express');
const router = express.Router();
const eventController = require('../Controller/eventController');

router.post('/', eventController.createEvent);

module.exports = router;
router.get('/', eventController.getAllEvents);
