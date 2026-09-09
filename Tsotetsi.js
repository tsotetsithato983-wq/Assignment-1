// Library System using DOM Manipulation


// Get elements from the HTML
const bookTitle = document.getElementById("bookTitle");
const bookAuthor = document.getElementById("bookAuthor");
const addBookBtn = document.getElementById("addBookBtn");

const bookList = document.getElementById("bookList");
const transactionList = document.getElementById("transactionList");

const noBooks = document.getElementById("noBooks");
const noTransactions = document.getElementById("noTransactions");


// Store books and transactions
let books = [];
let transactions = [];


// Add a new book
addBookBtn.addEventListener("click", function () {

    const title = bookTitle.value.trim();
    const author = bookAuthor.value.trim();

    // Check that the user entered both fields
    if (title === "" || author === "") {
        alert("Please enter both the book title and author.");
        return;
    }

    // Create a book object
    const book = {
        id: Date.now(),
        title: title,
        author: author,
        available: true
    };

    // Add book to the array
    books.push(book);

    // Clear input fields
    bookTitle.value = "";
    bookAuthor.value = "";

    // Display the books
    displayBooks();
});


// Display books on the webpage
function displayBooks() {

    // Clear the current book list
    bookList.innerHTML = "";

    // Show message if there are no books
    if (books.length === 0) {
        bookList.appendChild(noBooks);
        return;
    }

    // Create a section for every book
    books.forEach(function (book) {

        const bookDiv = document.createElement("div");
        bookDiv.className = "book";

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = "Author: " + book.author;

        const status = document.createElement("p");

        if (book.available) {
            status.textContent = "Status: Available";
        } else {
            status.textContent = "Status: Borrowed";
        }

        // Borrow button
        const borrowButton = document.createElement("button");
        borrowButton.textContent = "Borrow";
        borrowButton.className = "borrow-btn";

        // Return button
        const returnButton = document.createElement("button");
        returnButton.textContent = "Return";
        returnButton.className = "return-btn";

        // Delete book button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete Book";
        deleteButton.className = "delete-btn";


        // Borrow book
        borrowButton.addEventListener("click", function () {

            if (!book.available) {
                alert("This book is already borrowed.");
                return;
            }

            book.available = false;

            addTransaction(
                book.title,
                "Borrowed"
            );

            displayBooks();
        });


        // Return book
        returnButton.addEventListener("click", function () {

            if (book.available) {
                alert("This book has not been borrowed.");
                return;
            }

            book.available = true;

            addTransaction(
                book.title,
                "Returned"
            );

            displayBooks();
        });


        // Delete book
        deleteButton.addEventListener("click", function () {

            const confirmDelete = confirm(
                "Are you sure you want to delete this book?"
            );

            if (confirmDelete) {

                books = books.filter(function (item) {
                    return item.id !== book.id;
                });

                displayBooks();
            }
        });


        // Add elements to the book div
        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookDiv.appendChild(status);
        bookDiv.appendChild(borrowButton);
        bookDiv.appendChild(returnButton);
        bookDiv.appendChild(deleteButton);

        // Add book div to the webpage
        bookList.appendChild(bookDiv);
    });
}


// Add a transaction
function addTransaction(bookTitle, action) {

    const transaction = {
        id: Date.now(),
        book: bookTitle,
        action: action,
        date: new Date().toLocaleString()
    };

    transactions.push(transaction);

    displayTransactions();
}


// Display transaction history
function displayTransactions() {

    transactionList.innerHTML = "";

    if (transactions.length === 0) {
        transactionList.appendChild(noTransactions);
        return;
    }

    transactions.forEach(function (transaction) {

        const transactionDiv = document.createElement("div");

        transactionDiv.className = "transaction";

        const information = document.createElement("p");

        information.textContent =
            transaction.action +
            ": " +
            transaction.book +
            " | " +
            transaction.date;


        // Delete transaction button
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete Transaction";

        deleteButton.className = "delete-btn";


        deleteButton.addEventListener("click", function () {

            transactions = transactions.filter(function (item) {

                return item.id !== transaction.id;

            });

            displayTransactions();
        });


        transactionDiv.appendChild(information);
        transactionDiv.appendChild(deleteButton);

        transactionList.appendChild(transactionDiv);
    });
                  }
