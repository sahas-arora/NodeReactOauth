let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema({
  googleID: String,
  credits: { type: Number, default: 0 }
});

mongoose.model("users", userSchema); //This loads the userSchema that we have defined on line 4 into mongoose.
//One other thing to remember, when there's one argument with mongoose.model(), it means we're trying to fetch something out of the mongoose library, and when there's two arguments associated with mongoose.model(), it means that we're trying to load something into the mongoose library.
