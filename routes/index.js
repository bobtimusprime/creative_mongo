var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Student  = mongoose.model('Student');

router.post('/students', function(req, res,next){
  var student = new Student(req.body);
  student.save(function(err, student){
    if(err) {return next(err); }
    res.json(student);
  });
});

router.get('/students', function(req, res, next) {
  Student.find(function(err, students){
    if(err){ return next(err); }
    res.json(students);
  });
});

module.exports = router;
