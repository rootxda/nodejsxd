const express=require('express')


exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet implemented",
  });
};

exports.createUser = (req, res) => {
  res.send(500).json({
    status: "error",
    message: "this route is not yet implemented",
  });
};