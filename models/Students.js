var mongoose = require('mongoose');
var StudentSchema = new mongoose.Schema({
  name:String,
  practiceTime:{type:Number, default:0}
});

StudentSchema.methods.addPracticeTime = function(cb) {
  this.practiceTime +=1;
  this.save(cb);
};
mongoose.model('Student', StudentSchema);

