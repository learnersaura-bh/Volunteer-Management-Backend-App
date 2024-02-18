const express = require('express');
const {
  getAllVolunteers,
  addVolunteer,
  editVolunteer,
  deleteVolunteer,
  getVolunteer
} = require('../controllers/volunteer.controller');

const volunteerRouter = express.Router();

volunteerRouter.get('/', async (req, res) => {
  try {
    const allVolunteers = await getAllVolunteers();
    res.status(200).json(allVolunteers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch all volunteers' });
  }
});

volunteerRouter.post('/', async (req, res) => {
  try {
    const newVolunteer = await addVolunteer(req.body);
    res.status(201).json(newVolunteer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add volunteer' });
  }
});

volunteerRouter.get('/:volunteerName', async (req, res) => {
  try {
    const selectedVolunteer = await getVolunteer(req.params.volunteerName);
    if (selectedVolunteer) {
      res.status(200).json(selectedVolunteer);
    } else {
      res.status(404).json({ error: 'Volunteer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch volunteer' });
  }
});

volunteerRouter.put('/:volunteerId', async (req, res) => {
  try {
    const updatedVolunteer = await editVolunteer(req.params.volunteerId, req.body);
    if (updatedVolunteer) {
      res.status(200).json(updatedVolunteer);
    } else {
      res.status(404).json({ error: 'Volunteer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update volunteer' });
  }
});

volunteerRouter.delete('/:volunteerId', async (req, res) => {
  try {
    const deletedVolunteer = await deleteVolunteer(req.params.volunteerId);
    if (deletedVolunteer) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Volunteer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete volunteer' });
  }
});

module.exports = volunteerRouter;
