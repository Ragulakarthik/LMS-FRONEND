// Base URL for the HomeApi endpoints
const baseHomeApiUrl = 'http://localhost:8080/api';

// Function to fetch counts and update the respective elements
function fetchCountsAndDisplay() {
    const endpoints = [
        { url: '/students/count', elementId: 'studentsRegistered' },
        { url: '/books/count', elementId: 'booksPresent' },
        { url: '/authors/count', elementId: 'authorsCount' },
        { url: '/publishers/count', elementId: 'publishersCount' },
        { url: '/issuedBooks/count', elementId: 'booksIssued' },
        { url: '/booksNotReturned/count', elementId: 'booksNotReturned' },
        { url: '/studentsWithFines/count', elementId: 'studentsWithFines' }
    ];

    // Loop through each endpoint and fetch the count
    endpoints.forEach(endpoint => {
        fetch(baseHomeApiUrl + endpoint.url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${endpoint.url}`);
                }
                return response.json();
            })
            .then(count => {
                document.getElementById(endpoint.elementId).textContent = count;
            })
            .catch(error => console.error('Error fetching count:', error));
    });
}

// Call the function on page load to display the counts
document.addEventListener('DOMContentLoaded', fetchCountsAndDisplay);
