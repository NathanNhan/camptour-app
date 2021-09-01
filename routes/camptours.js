const express = require('express');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const router = express.Router();
const { validateCamptour, isLoggedIn , isAuthor} = require("../utils/middleware");
const camptours = require('../controllers/camptours');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });


router
  .route("/")
  .get(catchAsync(camptours.index))
  .post(upload.single('image'),catchAsync(camptours.createCamptour));
//   .post(
//     isLoggedIn,
//     validateCamptour,
//     catchAsync(camptours.createCamptour)
//   );;
//get a new camptour
router.get('/new',isLoggedIn, camptours.renderNewForm);
//create a camptour
router
  .route("/:id")
  .get(isLoggedIn, catchAsync(camptours.showCamptour))
  .put(isLoggedIn,isAuthor ,catchAsync(camptours.updateCamptour))
  .delete(isLoggedIn,isAuthor, camptours.deleteCamptour);

//edit a camptour
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(camptours.editCamptour))

//update a camptours


//delete


module.exports = router;