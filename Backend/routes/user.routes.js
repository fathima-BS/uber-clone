const express=require('express');
const router=express.Router();
const userController=require('../controllers/user.controller');
const {body}=require('express-validator');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be atleast 3 characters long'),
    body('password').isLength({min:6}).withMessage('password must be at least 6 characters long')
],userController.registerUser);
// router.get('/allUser',userController.getUser);
router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('password must be atleast 6 charcaters long')
],userController.loginUser)


module.exports=router;