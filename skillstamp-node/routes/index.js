import express from 'express';
let router = express.Router();

import {users, NewQuestion, VerifyJwt, courseCtrl } from '../controllers';
import {newEnroller} from '../schema';

// login admin

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname.substr(file.originalname.lastIndexOf("."), file.originalname.length))
    }
})
var upload = multer({
    storage: storage
})


router.get('/check-state',VerifyJwt.verifyToken ,(req, res) => {
    res.send({success: true, message: 'Successfully logged in'});
});

router.get("/emailConfirmation/:token", users.confirmationPost);

router.post('/signup', users.signup);
router.post('/login', users.login);
router.put('/dashboard/editUser/:id', users.editUser);
router.post('/newcourse',upload.any(),courseCtrl.newCourse);


router.post('/courses/query', NewQuestion.newQuestion);

module.exports = router;