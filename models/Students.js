var mongoose = require('mongoose');
var StudentSchema = new mongoose.Schema({
  name:String,
  practiceTime:{type:Number, default:0}
});
mongoose.model('Student', StudentSchema);

