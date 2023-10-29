let id = 0;
let applicantId = 0;
export class JobModel {
    constructor(
        jobcategory,
        jobdesignation,
        joblocation,
        companyname,
        salary,
        applyby,
        skillsrequired,
        numberofopenings,
        jobposted,
        applicants
    ) {
        this.id = ++id;
        this.jobcategory = jobcategory;
        this.jobdesignation = jobdesignation;
        this.joblocation = joblocation;
        this.companyname = companyname;
        this.salary = salary;
        this.applyby = applyby;
        this.skillsrequired = skillsrequired;
        this.numberofopenings = numberofopenings;
        this.jobposted = jobposted;
        this.applicants = applicants || [];
    }
    /*Operation on Job*/

    static create(job) {
        const {
            jobcategory,
            jobdesignation,
            joblocation,
            companyname,
            salary,
            applyby,
            skillsrequired,
            openings,
            jobposted,
            applicants,
        } = job;
        const newJob = new JobModel(
            jobcategory,
            jobdesignation,
            joblocation,
            companyname,
            salary,
            applyby,
            skillsrequired,
            openings,
            jobposted,
            applicants
        );
        jobs.push(newJob);
        return newJob;
    }

    // Get a specific job with an id
    static getJob(id) {
        const job = jobs.find((j) => j.id == id);
        return job;
    }
    // Getting all jobs
    static getAll() {
        return jobs;
    }
    // Updating existing job
    static update(id, newJob) {
        const jobIndex = jobs.findIndex((j) => j.id == id);
        if (jobIndex != -1) {
            jobs[jobIndex] = { ...jobs[jobIndex], ...newJob };
            return jobs[jobIndex];
        }
        return null;
    }
    // Deleting an existing job with an id
    static delete(id) {
        const jobIndex = jobs.findIndex((j) => j.id == id);
        if (jobIndex != -1) {
            const deletedJob = jobs[jobIndex];
            jobs.splice(jobIndex, 1);
            return deletedJob;
        }
        return null;
    }

    static filter(name) {
        name = name.trim().toLowerCase(); // Convert to lowercase and remove leading/trailing spaces
        const filteredJobs = jobs.filter(job => {
            const jobDesignation = job.jobdesignation.toLowerCase();
            return jobDesignation.includes(name) ||
                jobDesignation.startsWith(name) ||
                jobDesignation.split(' ')[0].startsWith(name) ||
                jobDesignation[0] === name;
        });
        return filteredJobs;
    }



    /* Operations for Job Applicants */

    // Adding an applicant to a specific job with an id
    static add(id, newApplicant) {
        const job = jobs.find((job) => job.id == id);
        job.applicants.push({ id: ++applicantId, ...newApplicant });
    }

    // Fetching all application of a specific job from an id
    static getAllApplicants(id) {
        const job = jobs.find((job) => job.id == id);
        return job.applicants;
    }
    static deleteApplicant(id, applicantId) {
        const job = this.getJob(id);
        const applicantIndex = job.applicants.findIndex(
            (applicant) => applicant.id == applicantId
        );
        const deletedApplicant = job.applicants[applicantIndex];
        job.applicants.splice(applicantIndex, 1);
        return deletedApplicant;
    }
}

let jobs = [
    new JobModel(
        "IT",
        "Software Developer",
        "New York",
        "Tech Company A",
        80000,
        "2023-12-31",
        ["JavaScript", "React", "Node.js"],
        5,
        "2023-10-21",
        [
            // {
            //     id: 1,
            //     name: "vinayak",
            //     email: "vinayakt890@gmail.com",
            //     contact: "8010736467",
            // },
            // {
            //     id: 2,
            //     name: "jane stephenson",
            //     email: "jane@gmail.com",
            //     contact: 9595234464,
            // },
        ]
    ),
    new JobModel(
        "Finance",
        "Financial Analyst",
        "Chicago",
        "Finance Corp B",
        75000,
        "2023-12-15",
        ["Financial Analysis", "Excel", "Accounting"],
        3,
        "2023-10-20",
        []
    ),
];
