const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userDetails = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture : {
    type : String,
    required : true,
    default : "https://res.cloudinary.com/rahul4019/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1695133265/pngwing.com_zi4cre.png"
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("user", userDetails);
module.exports = User;
