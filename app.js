const express = require("express");
const app = express();
const fs = require("fs");
const port = 3000;
app.use(express.json());
// app.get("/", (req, res) => {
//   res.status(404).json({ message: "hiii", msg: "hello" });
// });

// app.post("/", (req, res) => {
//   res.send("hii post");
// });
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get("/api/v1/tour", (req, res) => {
  res
    .status(200)
    .json({ status: "success", results: tours.length, data: { tours } });
});

app.get("/api/v1/tour/:id", (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (id > tours.length) {
    return res.status(404).json({ status: "fail", body: "not found" });
  }

  res.status(200).json({ status: "success", data: tour });
});

app.post("/api/v1/tour", (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
});
app.listen(port, () => {
  console.log("app running on port 3000");
});
