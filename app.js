const express = require("express");
const app = express();
const fs = require("fs");
const morgan = require("morgan");
const port = 3000;
app.use(express.json());
app.use(morgan("dev"));
// app.get("/", (req, res) => {
//   res.status(404).json({ message: "hiii", msg: "hello" });
// });

// app.post("/", (req, res) => {
//   res.send("hii post");
// });

//middlewares----------------------
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//functions-------------------------------------
const getAlltours = (req, res) => {
  res
    .status(200)
    .json({ status: "success", results: tours.length, data: { tours } });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (id > tours.length) {
    return res.status(404).json({ status: "fail", body: "not found" });
  }

  res.status(200).json({ status: "success", data: tour });
};

const createTour = (req, res) => {
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
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({ status: "fail", body: "not found" });
  }

  res.status(204).json({ status: "success", data: "null" });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet implemented",
  });
};

const createUser = (req, res) => {
  res.send(500).json({
    status: "error",
    message: "this route is not yet implemented",
  });
};
// app.get("/api/v1/tour", getAlltours);
// app.get("/api/v1/tour/:id", getTour);
// app.post("/api/v1/tour", createTour);
// app.delete("/api/v1/tour/:id", deleteTour);

const tourRouter = express.Router();
const userRouter = express.Router();

//routes-------------------------------------------------

tourRouter.route("/").get(getAlltours).post(createTour);

tourRouter.route("/:id").get(getTour).delete(deleteTour);

userRouter.route("/").get(getAllUsers).post(createUser);

app.use("/api/v1/tour", tourRouter);
app.use("/api/v1/users", userRouter);
// app
//   .route("/api/v1/users/:id")
//   .get(getUser)
//   .patch(updateUser)
//   .delete(deleteUser);
app.listen(port, () => {
  console.log("app running on port 3000");
});
