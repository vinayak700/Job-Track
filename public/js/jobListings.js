
const jobs = "<%= JSON.stringify(jobs) %>"; // Assuming 'jobs' is an array of job listings.
const itemsPerPage = 4; // Number of job listings to show per page.
let currentPage = 1;

// Function to display jobs on the current page.
function displayJobs(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const jobsToDisplay = jobs.slice(startIndex, endIndex);

    const jobListingsContainer = document.querySelector('.job-listings');
    jobListingsContainer.innerHTML = '';

    jobsToDisplay.forEach((job) => {
        // Create job listing HTML as you've shown in your code and append it to jobListingsContainer.
        // Make sure you add the job listing HTML to the .job-listings container.
    });
}

// Initial page load.
displayJobs(currentPage);

// Function to update the active page and job listings when a page number is clicked.
function updatePage(page) {
    const paginationItems = document.querySelectorAll('.pagination .page-item');
    paginationItems.forEach((item) => item.classList.remove('active'));

    const activePage = document.getElementById(`page-${page}`);
    activePage.classList.add('active');

    displayJobs(page);
}

// Previous page click event.
document.getElementById('page-prev').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updatePage(currentPage);
    }
});

// Next page click event.
document.getElementById('page-next').addEventListener('click', () => {
    const totalPages = Math.ceil(jobs.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        updatePage(currentPage);
    }
});

// Page number click event for dynamically added page numbers.
document.querySelectorAll('.pagination .page-item').forEach((item) => {
    item.addEventListener('click', (e) => {
        const page = Number(e.target.innerText);
        if (!isNaN(page)) {
            currentPage = page;
            updatePage(currentPage);
        }
    });
});
