document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-book-form');
    const responseMessage = document.getElementById('responseMessage');
    const apiBaseUrl = 'http://localhost:8080/api/'; // Ensure this is correct

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent form from submitting the traditional way
        let isValid = true;
        const messages = {
            bookTitle: '',
            authorId: '',
            publisherId: '',
            quantity: ''
        };

        clearErrors();

        // Perform validation
        const bookTitle = form['book-title'].value.trim();
        if (bookTitle === '') {
            messages.bookTitle = 'Book title is required.';
            isValid = false;
            showError('book-title', messages.bookTitle);
        }

        const authorId = form['author-id'].value.trim();
        if (!authorId || isNaN(authorId)) {
            messages.authorId = 'Author ID must be a valid number.';
            isValid = false;
            showError('author-id', messages.authorId);
        }

        const publisherId = form['publisher-id'].value.trim();
        if (!publisherId || isNaN(publisherId)) {
            messages.publisherId = 'Publisher ID must be a valid number.';
            isValid = false;
            showError('publisher-id', messages.publisherId);
        }

        const quantity = form['quantity'].value.trim();
        if (!quantity || isNaN(quantity)) {
            messages.quantity = 'Quantity must be a valid number.';
            isValid = false;
            showError('quantity', messages.quantity);
        }

        if (isValid) {
            try {
                // Send data to the backend API
                const response = await fetch(`${apiBaseUrl}book/addBook?bookTitle=${encodeURIComponent(bookTitle)}&authorId=${encodeURIComponent(authorId)}&publisherId=${encodeURIComponent(publisherId)}&quantity=${encodeURIComponent(quantity)}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();

                if (response.ok) {
                    showResponseMessage(result.message || 'Book added successfully!', 'success');
                    form.reset();
                } else {
                    showResponseMessage(result.message || 'Failed to add book.', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showResponseMessage('An error occurred. Please try again later.', 'error');
            }
        }
    });

    function showError(fieldName, message) {
        const input = form[fieldName];
        const errorElement = document.getElementById(`${fieldName}Error`);
        if (input) {
            input.classList.add('error-border');
        }
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function clearErrors() {
        document.querySelectorAll('.error-border').forEach(el => el.classList.remove('error-border'));
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    }

    function showResponseMessage(message, type) {
        responseMessage.textContent = message;
        responseMessage.className = 'response-message'; // Reset the class
        if (type === 'error') {
            responseMessage.classList.add('error');
        } else {
            responseMessage.classList.add('success');
        }
        responseMessage.style.display = 'block';
        setTimeout(() => {
            responseMessage.style.display = 'none'; // Hide after 10 seconds
        }, 10000);
    }
});
