import dotenv from "dotenv";
dotenv.config();

// Module imports
import cookieParser from "cookie-parser";
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import session from "express-session";
import path from "path";

// library imports
import JobController from "./src/controllers/jobController.js";
import UserController from "./src/controllers/userController.js";
import { auth } from "./src/middlewares/auth.middleware.js";
import { setLastVisit } from "./src/middlewares/lastVisit.middleware.js";
import { upload } from "./src/middlewares/fileUpload.middleware.js";

const jobController = new JobController();
const userController = new UserController();

const app = express();

app.use(express.static("public"));
app.use(cookieParser());

// Configure express session
app.use(
    session({
        secret: process.env.SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

// Middleware to parse json from request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure view engine & its layout
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));

app.use(expressEjsLayouts);

// Configure Application entrypoints

// auth routes
app.post("/register", userController.postRegister);
app.get("/login", userController.getLogin);
app.post("/login", userController.postLogin);
app.post("/logout", userController.logout);

app.get("/", setLastVisit, (req, res) => {
    res.render("landing", {
        userEmail: req.session.userEmail,
        userName: req.session.userName,
    });
});

// job routes
app.get("/jobs", jobController.getJobs);
app.get("/createJob", auth, jobController.getNewJobView);
app.post("/jobs", auth, jobController.createJob);
app.post("/filter", jobController.filterJobs);
app.get("/jobs/:id", jobController.getJobDetailView);
app.post("/jobs/:id", auth, jobController.updateJob);
app.get("/jobs/:id/delete", auth, jobController.deleteJob);
app.get("/jobs/:id/update", auth, jobController.getUpdateView);

// Aplicants Routes
app.get("/jobs/:id/applicants/:applicantId", auth, jobController.deleteApplicant);
app.get("/jobs/:id/applicants", auth, jobController.getAllApplicants);
app.post("/jobs/:id/applicants", upload.single('resume'), jobController.addApplicant);
// app.get('/jobs/:id/applicants/:applicantId', jobController.addApplicant);
// app.put('/jobs/:id/applicants/:applicantId', jobController.addApplicant);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
