var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Student  = mongoose.model('Student');

router.param('student', function(req, res, next, id) {
  var query = Student.findById(id);
  query.exec(function(err, comment) {
    if (err) { return next(err) }
    if (!comment) { return next( new Error("Can't find comment"));}
    req.comment = comment;
    return next();
  });
});

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


router.get('/students/:student', function(req, res) {
  res.json(req.student);
});

//req.student is the object found in the param route
//addPracticeTime is the method declared with the schema
router.put('/students/:student/practiceTime', function(req, res, next) {
  req.student.addPracticeTime(function(err, student){
    if (err) { return next(err);}
    res.json(student);
  });
});

router.delete('/students/:student', function(req, res) {
  console.log("in Delete");
  req.student.remove();
  res.sendStatus(200);
});

module.exports = router;
