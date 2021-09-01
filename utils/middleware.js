const catchAsync = require('../utils/catchAsync');
const Camptour = require('../models/camptour');
const Review = require('../models/review');
const { camptourSchema, reviewSchema } = require('../schema');

//validate camptours
module.exports.validateCamptour = (req, res, next) => {   
    const { error } = camptourSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',')
        throw new AppError(message, 400)
    } else {
        next();
    }
}


module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
     if (error) {
        const message = error.details.map(el => el.message).join(',')
        throw new AppError(message, 400)
    } else {
        next();
    }
}


//viết middleware chứng thực người dùng phải authenticated
module.exports.isLoggedIn = (req,res,next)=>{
    console.log("Request .User", req.user);
    if(!req.isAuthenticated()){
        console.log(req.path);
        req.session.returnTo = req.originalUrl;
        req.flash('error',"Please sign in first");
        return res.redirect("/login");
    }
     next();
    
}

//middle is Athor
module.exports.isAuthor = async(req,res,next)=>{
    const {id} = req.params;
    const camptour = await Camptour.findById(id);
    if(!camptour.author.equals(req.user._id)){
        req.flash('error','you do not permission');
        res.redirect(`/camptour/${id}`)
    }
    next();
}
//middleware is review author
module.exports.isReviewAuthor = async(req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "you do not permission");
    res.redirect(`/camptour/${id}`);
  }
  next();
};
