const express = require('express');
const workoutDetailsController = require('../Controllers/WorkoutDetailsController'); // Controller file

const router = express.Router();

// Routes for WorkoutDetails
router
  .route('/')
  .post(workoutDetailsController.createWorkoutDetails) // Create workout details
  .get(workoutDetailsController.getAllWorkoutDetails); // Get all workout details

router
  .route('/:id')
  .get(workoutDetailsController.getWorkoutDetail) // Get workout details by ID
  .patch(workoutDetailsController.updateWorkoutDetail) // Update workout details by ID
  .delete(workoutDetailsController.deleteWorkoutDetail); // Delete workout details by ID

module.exports = router;
