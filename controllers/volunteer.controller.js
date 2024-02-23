const Volunteer = require('../models/volunteer.model')


const getAllVolunteers = async () => {
  try {
    const allVolunteers = await Volunteer.find().populate({
      path: 'events',
      select: 'name date location'
    })
    console.log('All volunteers:', allVolunteers)
    return allVolunteers
  } catch (error) {
    console.log('Error fetching all volunteers')
  }
}

const addVolunteer = async (volunteer) => {
    try {
      const newVolunteer = new Volunteer(volunteer);
      
      const savedVolunteer = await newVolunteer.save();
  
      await Volunteer.populate(savedVolunteer, {
        path: "events",
        select: "name location"
      });
  
      if (savedVolunteer) {
        console.log('Added new volunteer:', savedVolunteer);
        return savedVolunteer;
      } else {
        console.log('Unable to add volunteer');
        return null;
      }
    } catch (error) {
      console.error('Error adding volunteer:', error);
      throw error;
    }
  }
  
  
  

  const editVolunteer = async (volunteerId, editedVolunteer) => {
    try {
      const updatedVolunteer = await Volunteer.findByIdAndUpdate(volunteerId, editedVolunteer, { new: true }).populate({
        path: "events",
        select: "name location"
      });
      if (updatedVolunteer) {
        console.log('Updated volunteer:', updatedVolunteer);
        return updatedVolunteer;
      } else {
        console.log('Unable to update volunteer');
        return null; 
      }
    } catch (error) {
      console.log('Error editing volunteer:', error);
      throw error; 
    }
  };
  

const deleteVolunteer = async (volunteerId) => {
  try {
    const deletedVolunteer = await Volunteer.findByIdAndDelete(volunteerId)
    if (deletedVolunteer) {
      console.log('Deleted volunteer:', deletedVolunteer)
      return deletedVolunteer
    } else {
      console.log('Unable to delete volunteer')
    }
  } catch (error) {
    console.log('Error deleting volunteer:', error)
  }
}

const getVolunteer = async (volunteerName) => {
  try {
    const selectedVolunteer = await Volunteer.findOne({ name: volunteerName }).populate({
      path: "events",
      select: "name location"
    })
    if (selectedVolunteer) {
      console.log('Volunteer fetched successfully:', selectedVolunteer)
      return selectedVolunteer
    } else {
      console.log('Unable to fetch volunteer')
    }
  } catch (error) {
    console.log('Error fetching volunteer:', error)
  }
}

module.exports = {
  getAllVolunteers,
  addVolunteer,
  editVolunteer,
  deleteVolunteer,
  getVolunteer
}