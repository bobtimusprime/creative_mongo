var mongoose = require('mongoose');
var StudentSchema = new mongoose.Schema({
  name:String,
  practiceTime:{type:Number, default:0}
});

StudentSchema.methods.addPracticeTime = function(cb) {
  this.practiceTime +=5;
  this.save(cb);
};

StudentSchema.methods.minusPracticeTime = function(cb){
 if( this.practiceTime >= 5) {  this.practiceTime -=5; }
 else { this.practiceTime = 0};
  this.save(cb);
};

mongoose.model('Student', StudentSchema);

