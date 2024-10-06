const User = require('../Model/userModel');
const AppError = require('../utils/appError');
const { promisify } = require('util');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

// eslint-disable-next-line arrow-body-style
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.testFunction = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestT,
  });
};

exports.createNewUser = async (req, res) => {
  console.log(req.body);

  try {
    const createUser = User.create(req.body);

    const user = await createUser;
    const token = signToken(user._id);

    res.status(201).json({
      status: 'sucess',
      requestAt: req.requestT,
      token,
      message: {
        data: user,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Username or password Missed!',
    });
  }

  const user = await User.findOne({ email }).select('+password');

  if (user) {
    console.log(user);

    if (!(await user.correctPassword(password, user.password)) || !user) {
      return res.status(404).json({
        status: 'faild',
        message: 'user not found',
      });
    }

    console.log(user._id);
    const token = signToken(user._id);
    console.log(token);
    res.status(200).json({
      status: 'success',
      token,
    });
  } else {
    return res.status(401).json({
      message: 'User Not found',
    });
  }
};

exports.getAllUsers = async (req, res) => {
  const all = await User.find();

  res.status(200).json({
    status: 'success',
    message: {
      data: all,
    },
  });
};

exports.protected = async (req, res, next) => {
  // 1) Getting token and check of it's here

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  console.log(token);

  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: 'UnAuthorized Access! Login PLS!',
    });
  }

  // 2) verification token
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);
  } catch (err) {
    return res.status(500).json({
      err: err,
    });
  }
  // 3) check if user still exists

  // 4) check if user changed password after the token was issued

  next();
};
