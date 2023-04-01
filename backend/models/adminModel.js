const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
},
{
  timestamps:true
});

//static signup method
adminSchema.statics.signup = async function (data) {
  const { email, password } = data;
  const isBlank = (str) => {
    const blankRgx = /^\s*$/;
    return blankRgx.test(str);
  };
  //validation
  if (!email || isBlank(email)) {
    throw Error("email is required");
  }
  if (!password || isBlank(password)) {
    throw Error("password is required");
  }
  if (!validator.isEmail(email)) {
    throw Error("email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "password must have uppercase,lowercase,number,special character,min-lenth 8"
    );
  }

  const exists = await this.findOne({ email: email.trim() });
  if (exists) {
    throw Error("email already exist!");
  }
  const admin = await this.create({
    fullname,
    mobile,
    email: email.trim(),
    password: await bcrypt.hash(password, 10),
  });
  return admin;
};

//static login method
adminSchema.statics.login = async function (data) {
  const { email, password } = data;
  const isBlank = (str) => {
    const blankRgx = /^\s*$/;
    return blankRgx.test(str);
  };
  if (!email || isBlank(email)) {
    throw Error("email is required");
  }
  if (!password || isBlank(password)) {
    throw Error("password is required");
  }
  const admin = await this.findOne({ email: email.trim() });
  if (!admin) {
    throw Error("admin doesnot exist!");
  }
  const match = await bcrypt.compare(password, admin.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  return admin;
};

module.exports = mongoose.model("Admin", adminSchema);
