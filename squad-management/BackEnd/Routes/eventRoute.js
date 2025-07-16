const express = require('express');
const router = express.Router();
const eventController = require('../Controller/eventController');
const { deleteEvent } = require('../Controller/eventController');

router.post('/', eventController.createEvent);

router.get('/', eventController.getAllEvents);
router.delete('/:id', deleteEvent);
router.put('/:id', eventController.updateEvent);
module.exports = router;
