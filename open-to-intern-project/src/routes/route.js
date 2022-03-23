const express = require('express');
const router = express.Router();

const collegeController = require('../controllers/collegeController')
const internController = require('../controllers/internController')



//collage
router.post('/functionUp/collage', collegeController.createCollage)
//intern
router.post('/functionUp/intern', internController.createIntern)
//collegeDetails
router.get('/functionUp/collegeDetails',collegeController.getCollegeDetails )






module.exports = router;