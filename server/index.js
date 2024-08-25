const express = require("express");

const app = express();

const userRoutes = require("./routes/User");
const paymentRoutes = require("./routes/Payments");
const profileRoutes = require("./routes/Profile");
const CourseRoutes = require("./routes/Course");
const contactUsRoutes = require("./routes/ContactUs");

const database = require("./config/database");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const fileUpload = require("express-fileupload");
const { cloudnairyconnect } = require("./config/cloudinary");
cloudnairyconnect();

require("dotenv").config();

const PORT = process.env.PORT || 4000;
database.connect();

app.use(express.json());
app.use(cookieParser());

app.options(
  "*",
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"], // Include PATCH
    credentials: true,
    maxAge: 14400,
  })
);

app.use(
  cors({
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"], // Include PATCH
    credentials: true,
    maxAge: 14400,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

app.use("/auth", userRoutes);

app.use("/payment", paymentRoutes);

app.use("/profile", profileRoutes);

app.use("/course", CourseRoutes);

app.use("", contactUsRoutes);
const projectRoutes = require("./routes/ProjectsRoutes");
app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
