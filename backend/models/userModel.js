const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: String,
  date: {
    type: Date,
    default: Date("<YYYY-mm-dd>"),
  },
});

//static signup method
userSchema.statics.signup = async function (data) {
  const { fullname, mobile, email, password } = data;
  const isBlank = (str) => {
    const blankRgx = /^\s*$/;
    return blankRgx.test(str);
  };
  //validation
  if (!fullname || isBlank(fullname)) {
    throw Error("fullname is required");
  }
  if (!mobile || isBlank(mobile)) {
    throw Error("mobile is required");
  }
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
  const user = await this.create({
    fullname,
    mobile,
    email: email.trim(),
    password: await bcrypt.hash(password, 10),
  });
  return user;
};

//static login method
userSchema.statics.login = async function (data) {
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
  const user = await this.findOne({ email: email.trim() });
  if (!user) {
    throw Error("user doesnot exist!");
  }
  const match = await bcrypt.compare(password,user.password)
  if(!match){
    throw Error("Incorrect password")
  }
  return user
};

module.exports = mongoose.model("User", userSchema);