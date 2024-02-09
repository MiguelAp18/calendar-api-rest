/*
    Event routes
    /api/events
*/ 

const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validateFields } = require('../middlewares/validate-fields');
const { isDate } = require('../helpers/isDate');

const router = new Router();

router.use( validateJWT );

// Get events
router.get('/', getEvents);

// Create event
router.post(
    '/', 
    [
        check('title', 'The title is mandatory').not().isEmpty(),
        check('start', 'The start date is mandatory').custom( isDate ),
        check('end', 'The end date is mandatory').custom( isDate ),
        validateFields
    ],
    createEvent
);

// Update event
router.put('/:id', updateEvent);

// Delete event
router.delete('/:id', deleteEvent);


module.exports = router;