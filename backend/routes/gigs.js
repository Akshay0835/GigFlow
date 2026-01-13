const express = require('express');
const router = express.Router();
const {
  createGig,
  getGigs,
  getGigById,
  updateGig,
  deleteGig,
  getMyGigs
} = require('../controllers/gigController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getGigs)
  .post(protect, createGig);

router.get('/my-gigs', protect, getMyGigs);

router.route('/:id')
  .get(getGigById)
  .put(protect, updateGig)
  .delete(protect, deleteGig);

module.exports = router;