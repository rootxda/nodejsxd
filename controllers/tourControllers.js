const express = require("express");
const Tour = require("./../modals/tourModel");
const fs = require("fs");

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

exports.getAlltours = async (req, res) => {
  const tours = await Tour.find();
  res
    .status(200)
    .json({ status: "success", results: tours.length, data: { tours } });
};

exports.getTour = async (req, res) => {
  // const id = req.params.id * 1;
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({ status: "success", data: tour });
  } catch (err) {
    res.json({
      status: "error",
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err,
    });
  }
};

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({ status: "fail", body: "not found" });
  }

  res.status(204).json({ status: "success", data: "null" });
};
