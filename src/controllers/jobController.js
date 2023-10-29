import { sendConfirmationEmail } from "../middlewares/mail.middleware.js";
import { JobModel } from "../models/job.model.js";

export default class JobController {
    createJob = (req, res) => {
        const date = new Date();
        const newJob = JobModel.create({ ...req.body, date });

        if (newJob) {
            res.redirect("/jobs");
        } else {
            res.render("404", {
                message: "could not create a job", userEmail: req.session.userEmail,
                userName: req.session.userName,
            });
        }
    };
    getJobs = (req, res) => {
        const jobs = JobModel.getAll();
        res.render("jobListings", {
            jobs: jobs,
            userEmail: req.session.userEmail,
            userName: req.session.userName,
        });
    };

    updateJob = (req, res) => {
        const { id } = req.params;
        const updatedJob = JobModel.update(id, req.body);
        if (updatedJob != null) {
            return res.redirect("/jobs", {
                userEmail: req.session.userEmail,
                userName: req.session.userName,
            });
        }
        return res.render("404", {
            message: "could not update the job", userEmail: req.session.userEmail,
            userName: req.session.userName,
        });
    };
    deleteJob = (req, res) => {
        const { id } = req.params;
        console.log(id);
        const isDeleted = JobModel.delete(id);
        if (isDeleted) {
            res.redirect("/jobs");
        }
        res.redirect("/jobs");

        /*---------- For making DELETE request as POST ----------*/
        // return res.render("404", {
        //     message: "Failed to delete the job", userEmail: req.session.userEmail,
        //     userName: req.session.userName,
        // });
    };

    filterJobs = (req, res) => {
        const { input } = req.body;
        const jobs = JobModel.filter(input);
        res.render("jobListings", {
            jobs: jobs,
            userEmail: req.session.userEmail,
            userName: req.session.userName,
        });
    };

    /* Rendering Views */
    getJobDetailView = (req, res) => {
        const { id } = req.params;
        const job = JobModel.getJob(id);
        res.render("jobDetails", {
            job: job,
            userEmail: req.session.userEmail,
            userName: req.session.userName,
        });
    };
    getUpdateView = (req, res) => {
        const { id } = req.params;
        const job = JobModel.getJob(id);
        res.render("updateJob", {
            job: job,
            userEmail: req.session.userEmail,
            userName: req.session.userName,
        });
    };
    getNewJobView = (req, res) => {
        res.render("newJob", {
            userEmail: req.session.userEmail,
            userName: req.session.userName,
        });
    };

    /* Controller for job applicants */
    addApplicant = (req, res) => {
        const { id } = req.params;
        const imageUrl = "files/" + req.file.filename;
        const job = JobModel.getJob(id);
        JobModel.add(id, { ...req.body, imageUrl });
        sendConfirmationEmail(req.body.email, job.jobdesignation, job.companyname);
        res.redirect(`/jobs/${id}`);
    };
    getAllApplicants = (req, res) => {
        const { id } = req.params;
        const job = JobModel.getJob(id);
        res.render("applicantList", {
            job,
            userEmail: req.session.userEmail,
            userName: req.session.userName,
        });
    };
    deleteApplicant = (req, res) => {
        const { id, applicantId } = req.params;
        const isDeleted = JobModel.deleteApplicant(id, applicantId);
        if (isDeleted) {
            res.redirect(`/jobs/${id}/applicants`);
        }
    };
}
