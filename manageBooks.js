// Base API URL for books
const baseUrl = 'http://localhost:8080/api/book/getBooksByParam';

// Function to display books in the table
function displayBooks(data) {
    const tbody = document.querySelector("#books-table tbody");
    tbody.innerHTML = ""; // Clear previous entries

    data.forEach(book => {
        // Adjust key names based on the API response structure
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.bookId}</td>
            <td>${book.bookTitle}</td>
            <td>${book.authorId}</td>
            <td>${book.publisherId}</td>
            <td>${book.quantity}</td>
            <td>
                <button class="update-btn" onclick="updateBook(${book.bookId})">Update</button>
                <button class="delete-btn" onclick="deleteBook(${book.bookId})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Function to handle the "Get" button click
document.getElementById("get-books-btn").addEventListener("click", () => {
    const bookId = document.getElementById("search-book-id").value.trim();
    const authorId = document.getElementById("search-author-id").value.trim();
    const publisherId = document.getElementById("search-publisher-id").value.trim();
    const bookTitle = document.getElementById("search-book-title").value.trim().toLowerCase();

    // Build the search query parameters based on the input
    let url = `${baseUrl}?`;
    if (bookId) {
        url += `bookId=${bookId}&`;
    }
    if (authorId) {
        url += `authorId=${authorId}&`;
    }
    if (publisherId) {
        url += `publisherId=${publisherId}&`;
    }
    if (bookTitle) {
        url += `bookTitle=${encodeURIComponent(bookTitle)}&`;
    }

    // Remove the trailing '&' or '?' if no parameters were added
    url = url.slice(0, -1);

    // Fetch the books from the backend API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Display books in the table
            displayBooks(data);
        })
        .catch(error => console.error('Error fetching books:', error));
});

// Function to handle book update (dummy functionality)
function updateBook(id) {
    alert(`Update book with ID: ${id}`);
    // Implement the actual update logic here
    window.location.href = `update-book.html?bookId=${id}`;  // Redirect to the update page
}

// Function to delete a book
function deleteBook(id) {
    // Confirm before deleting the book
    const confirmation = confirm(`Are you sure you want to delete the book with ID: ${id}?`);
    
    if (confirmation) {
        // API URL to delete the book
        const url = `http://localhost:8080/api/book/deleteBook?bookId=${id}`;

        // Send DELETE request to the server
        fetch(url, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                alert(`Book with ID: ${id} has been deleted.`);
                // Remove the deleted book from the table
                removeBookFromTable(id);
            } else {
                alert('Failed to delete the book. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error deleting book:', error);
            alert('An error occurred while trying to delete the book.');
        });
    }
}

// Function to remove the deleted book from the table
function removeBookFromTable(id) {
    const rows = document.querySelectorAll("#books-table tbody tr");

    rows.forEach(row => {
        const firstCell = row.querySelector("td:first-child");
        if (firstCell && firstCell.textContent == id) {
            row.remove(); // Remove the matching row
        }
    });
}
