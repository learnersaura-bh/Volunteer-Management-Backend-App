const express = require('express');
const {
  getAllEvents,
  addEvent,
  editEvent,
  deleteEvent,
  getEvent
} = require('../controllers/event.controller');

const eventRouter = express.Router();

eventRouter.get('/', async (req, res) => {
  try {
    const allEvents = await getAllEvents();
    res.status(200).json(allEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch all events' });
  }
});

eventRouter.post('/', async (req, res) => {
  try {
    const newEvent = await addEvent(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add event' });
  }
});

eventRouter.get('/:eventName', async (req, res) => {
  try {
    const selectedEvent = await getEvent(req.params.eventName);
    if (selectedEvent) {
      res.status(200).json(selectedEvent);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

eventRouter.put('/:eventId', async (req, res) => {
  try {
    const updatedEvent = await editEvent(req.params.eventId, req.body);
    if (updatedEvent) {
      res.status(200).json(updatedEvent);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

eventRouter.delete('/:eventId', async (req, res) => {
  try {
    const deletedEvent = await deleteEvent(req.params.eventId);
    if (deletedEvent) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

module.exports = eventRouter;
