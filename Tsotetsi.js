// ==========================================
// COMMUNITY LIBRARY MANAGEMENT SYSTEM
// DOM + LOCAL STORAGE
// ==========================================


// ------------------------------------------
// GET DATA FROM LOCAL STORAGE
// ------------------------------------------

let books = JSON.parse(localStorage.getItem("books")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];
let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];


// ------------------------------------------
// MAIN APP
// ------------------------------------------

const app = document.getElementById("app");


// ------------------------------------------
// CREATE HEADER
// ------------------------------------------

const header = document.createElement("header");

const title = document.createElement("h1");
title.textContent = "📚 Community Library";

const subtitle = document.createElement("p");
subtitle.textContent = "Library Management System";

header.appendChild(title);
header.appendChild(subtitle);

app.appendChild(header);


// ------------------------------------------
// CREATE NAVIGATION
// ------------------------------------------

const nav = document.createElement("nav");

function createNavButton(text, page) {

    const button = document.createElement("button");

    button.textContent = text;

    button.addEventListener("click", function () {
        showPage(page);
    });

    nav.appendChild(button);
}

createNavButton("Dashboard", "dashboard");
createNavButton("Books", "books");
createNavButton("Transactions", "transactions");
createNavButton("Users", "users");

app.appendChild(nav);


// ------------------------------------------
// MAIN CONTENT
// ------------------------------------------

const content = document.createElement("main");

app.appendChild(content);


// ==========================================
// DASHBOARD
// ==========================================

const dashboard = document.createElement("section");

dashboard.id = "dashboard";

const dashboardTitle = document.createElement("h2");
dashboardTitle.textContent = "Dashboard";

dashboard.appendChild(dashboardTitle);


// Dashboard cards

const cards = document.createElement("div");

cards.className = "dashboard-cards";


const bookCard = createCard("Total Books", "totalBooks");
const stockCard = createCard("Total Stock", "totalStock");
const userCard = createCard("Registered Users", "totalUsers");

cards.appendChild(bookCard);
cards.appendChild(stockCard);
cards.appendChild(userCard);

dashboard.appendChild(cards);


// Availability heading

const availabilityTitle = document.createElement("h3");

availabilityTitle.textContent =
    "Current Book Availability";

dashboard.appendChild(availabilityTitle);


// Availability table

const dashboardTable = document.createElement("table");

const dashboardHead = document.createElement("thead");

dashboardHead.innerHTML = `
    <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Genre</th>
        <th>ISBN</th>
        <th>Quantity</th>
    </tr>
`;

const dashboardBody = document.createElement("tbody");

dashboardTable.appendChild(dashboardHead);
dashboardTable.appendChild(dashboardBody);

dashboard.appendChild(dashboardTable);

content.appendChild(dashboard);


// ------------------------------------------
// CREATE CARD FUNCTION
// ------------------------------------------

function createCard(label, id) {

    const card = document.createElement("div");

    card.className = "card";

    const heading = document.createElement("h3");

    heading.textContent = label;

    const value = document.createElement("p");

    value.id = id;

    value.textContent = "0";

    card.appendChild(heading);
    card.appendChild(value);

    return card;
}


// ==========================================
// BOOK MANAGEMENT
// ==========================================

const booksPage = document.createElement("section");

booksPage.id = "books";

booksPage.className = "hidden";


const booksTitle = document.createElement("h2");

booksTitle.textContent = "Book Management";

booksPage.appendChild(booksTitle);


// ------------------------------------------
// BOOK FORM
// ------------------------------------------

const bookForm = document.createElement("form");


// Hidden index

const bookIndex = document.createElement("input");

bookIndex.type = "hidden";


// Title

const titleLabel = document.createElement("label");

titleLabel.textContent = "Title:";

const titleInput = document.createElement("input");

titleInput.type = "text";

titleInput.required = true;


// Author

const authorLabel = document.createElement("label");

authorLabel.textContent = "Author:";

const authorInput = document.createElement("input");

authorInput.type = "text";

authorInput.required = true;


// Genre

const genreLabel = document.createElement("label");

genreLabel.textContent = "Genre:";

const genreInput = document.createElement("input");

genreInput.type = "text";

genreInput.required = true;


// ISBN

const isbnLabel = document.createElement("label");

isbnLabel.textContent = "ISBN:";

const isbnInput = document.createElement("input");

isbnInput.type = "text";

isbnInput.required = true;


// Quantity

const quantityLabel = document.createElement("label");

quantityLabel.textContent = "Initial Quantity:";

const quantityInput = document.createElement("input");

quantityInput.type = "number";

quantityInput.min = "0";

quantityInput.required = true;


// Save button

const saveBookButton = document.createElement("button");

saveBookButton.type = "submit";

saveBookButton.textContent = "Save Book";


// Clear button

const clearBookButton = document.createElement("button");

clearBookButton.type = "button";

clearBookButton.textContent = "Clear";

clearBookButton.addEventListener("click", clearBookForm);


// Add everything to form

bookForm.appendChild(bookIndex);

bookForm.appendChild(titleLabel);
bookForm.appendChild(titleInput);

bookForm.appendChild(authorLabel);
bookForm.appendChild(authorInput);

bookForm.appendChild(genreLabel);
bookForm.appendChild(genreInput);

bookForm.appendChild(isbnLabel);
bookForm.appendChild(isbnInput);

bookForm.appendChild(quantityLabel);
bookForm.appendChild(quantityInput);

bookForm.appendChild(saveBookButton);
bookForm.appendChild(clearBookButton);

booksPage.appendChild(bookForm);


// ------------------------------------------
// BOOK TABLE
// ------------------------------------------

const booksHeading = document.createElement("h3");

booksHeading.textContent = "Books List";

booksPage.appendChild(booksHeading);


const bookTable = document.createElement("table");

const bookHead = document.createElement("thead");

bookHead.innerHTML = `
    <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Genre</th>
        <th>ISBN</th>
        <th>Quantity</th>
        <th>Actions</th>
    </tr>
`;

const bookBody = document.createElement("tbody");

bookTable.appendChild(bookHead);
bookTable.appendChild(bookBody);

booksPage.appendChild(bookTable);

content.appendChild(booksPage);


// ==========================================
// ADD / UPDATE BOOK
// ==========================================

bookForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const book = {

        title: titleInput.value,

        author: authorInput.value,

        genre: genreInput.value,

        isbn: isbnInput.value,

        quantity: Number(quantityInput.value)
    };


    if (bookIndex.value !== "") {

        books[Number(bookIndex.value)] = book;

        alert("Book updated successfully!");

    } else {

        books.push(book);

        alert("Book added successfully!");
    }


    saveData();

    clearBookForm();

    displayBooks();

    displayDashboard();

    updateTransactionBooks();
});


// ==========================================
// DISPLAY BOOKS
// ==========================================

function displayBooks() {

    bookBody.innerHTML = "";

    books.forEach(function(book, index) {

        const row = document.createElement("tr");


        if (book.quantity < 2) {

            row.className = "low-stock";
        }


        const titleCell = document.createElement("td");

        titleCell.textContent = book.title;


        const authorCell = document.createElement("td");

        authorCell.textContent = book.author;


        const genreCell = document.createElement("td");

        genreCell.textContent = book.genre;


        const isbnCell = document.createElement("td");

        isbnCell.textContent = book.isbn;


        const quantityCell = document.createElement("td");

        quantityCell.textContent = book.quantity;


        const actionCell = document.createElement("td");


        const updateButton =
            document.createElement("button");

        updateButton.textContent = "Update";

        updateButton.addEventListener("click", function() {

            editBook(index);
        });


        const deleteButton =
            document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {

            deleteBook(index);
        });


        actionCell.appendChild(updateButton);

        actionCell.appendChild(deleteButton);


        row.appendChild(titleCell);

        row.appendChild(authorCell);

        row.appendChild(genreCell);

        row.appendChild(isbnCell);

        row.appendChild(quantityCell);

        row.appendChild(actionCell);


        bookBody.appendChild(row);
    });
}


// ==========================================
// EDIT BOOK
// ==========================================

function editBook(index) {

    const book = books[index];

    bookIndex.value = index;

    titleInput.value = book.title;

    authorInput.value = book.author;

    genreInput.value = book.genre;

    isbnInput.value = book.isbn;

    quantityInput.value = book.quantity;

    showPage("books");
}


// ==========================================
// DELETE BOOK
// ==========================================

function deleteBook(index) {

    if (confirm("Delete this book?")) {

        books.splice(index, 1);

        saveData();

        displayBooks();

        displayDashboard();

        updateTransactionBooks();
    }
}


// ==========================================
// CLEAR BOOK FORM
// ==========================================

function clearBookForm() {

    bookForm.reset();

    bookIndex.value = "";
}


// ==========================================
// TRANSACTIONS
// ==========================================

const transactionsPage =
    document.createElement("section");

transactionsPage.id = "transactions";

transactionsPage.className = "hidden";


const transactionTitle =
    document.createElement("h2");

transactionTitle.textContent = "Transactions";

transactionsPage.appendChild(transactionTitle);


// ------------------------------------------
// TRANSACTION FORM
// ------------------------------------------

const transactionForm =
    document.createElement("form");


const bookSelectLabel =
    document.createElement("label");

bookSelectLabel.textContent = "Select Book:";


const transactionBook =
    document.createElement("select");

transactionBook.required = true;


const typeLabel =
    document.createElement("label");

typeLabel.textContent = "Transaction Type:";


const transactionType =
    document.createElement("select");


const addOption =
    document.createElement("option");

addOption.value = "add";

addOption.textContent = "Add Stock";


const borrowOption =
    document.createElement("option");

borrowOption.value = "borrow";

borrowOption.textContent = "Borrow Book";


transactionType.appendChild(addOption);

transactionType.appendChild(borrowOption);


const transactionQuantityLabel =
    document.createElement("label");

transactionQuantityLabel.textContent =
    "Quantity:";


const transactionQuantity =
    document.createElement("input");

transactionQuantity.type = "number";

transactionQuantity.min = "1";

transactionQuantity.required = true;


const transactionButton =
    document.createElement("button");

transactionButton.type = "submit";

transactionButton.textContent =
    "Record Transaction";


transactionForm.appendChild(bookSelectLabel);

transactionForm.appendChild(transactionBook);

transactionForm.appendChild(typeLabel);

transactionForm.appendChild(transactionType);

transactionForm.appendChild(transactionQuantityLabel);

transactionForm.appendChild(transactionQuantity);

transactionForm.appendChild(transactionButton);


transactionsPage.appendChild(transactionForm);


// ------------------------------------------
// TRANSACTION TABLE
// ------------------------------------------

const transactionHeading =
    document.createElement("h3");

transactionHeading.textContent =
    "Transaction History";

transactionsPage.appendChild(transactionHeading);


const transactionTable =
    document.createElement("table");


const transactionHead =
    document.createElement("thead");

transactionHead.innerHTML = `
    <tr>
        <th>Date</th>
        <th>Book</th>
        <th>Type</th>
        <th>Quantity</th>
    </tr>
`;


const transactionBody =
    document.createElement("tbody");


transactionTable.appendChild(transactionHead);

transactionTable.appendChild(transactionBody);

transactionsPage.appendChild(transactionTable);

content.appendChild(transactionsPage);


// ==========================================
// RECORD TRANSACTION
// ==========================================

transactionForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const index =
            Number(transactionBook.value);


        const quantity =
            Number(transactionQuantity.value);


        if (!books[index]) {

            alert("Please select a book.");

            return;
        }


        if (
            transactionType.value === "borrow"
            &&
            quantity > books[index].quantity
        ) {

            alert("Not enough books available.");

            return;
        }


        if (transactionType.value === "add") {

            books[index].quantity += quantity;

        } else {

            books[index].quantity -= quantity;
        }


        transactions.push({

            date: new Date().toLocaleString(),

            book: books[index].title,

            type:
                transactionType.value === "add"
                    ? "Stock Added"
                    : "Book Borrowed",

            quantity: quantity
        });


        saveData();

        transactionForm.reset();

        displayBooks();

        displayDashboard();

        displayTransactions();

        updateTransactionBooks();

        alert("Transaction recorded!");
    }
);


// ==========================================
// UPDATE BOOK SELECT
// ==========================================

function updateTransactionBooks() {

    transactionBook.innerHTML = "";


    books.forEach(function(book, index) {

        const option =
            document.createElement("option");

        option.value = index;

        option.textContent =
            book.title +
            " (" +
            book.quantity +
            " available)";


        transactionBook.appendChild(option);
    });
}


// ==========================================
// DISPLAY TRANSACTIONS
// ==========================================

function displayTransactions() {

    transactionBody.innerHTML = "";


    transactions.forEach(function(transaction) {

        const row =
            document.createElement("tr");


        const date =
            document.createElement("td");

        date.textContent =
            transaction.date;


        const book =
            document.createElement("td");

        book.textContent =
            transaction.book;


        const type =
            document.createElement("td");

        type.textContent =
            transaction.type;


        const quantity =
            document.createElement("td");

        quantity.textContent =
            transaction.quantity;


        row.appendChild(date);

        row.appendChild(book);

        row.appendChild(type);

        row.appendChild(quantity);


        transactionBody.appendChild(row);
    });
}


// ==========================================
// USER MANAGEMENT
// ==========================================

const usersPage =
    document.createElement("section");

usersPage.id = "users";

usersPage.className = "hidden";


const usersTitle =
    document.createElement("h2");

usersTitle.textContent =
    "User Management";

usersPage.appendChild(usersTitle);


// ------------------------------------------
// LOGIN
// ------------------------------------------

const loginHeading =
    document.createElement("h3");

loginHeading.textContent =
    "User Login";

usersPage.appendChild(loginHeading);


const loginForm =
    document.createElement("form");


const loginLabel =
    document.createElement("label");

loginLabel.textContent =
    "Membership ID:";


const loginInput =
    document.createElement("input");

loginInput.type = "text";

loginInput.required = true;


const loginButton =
    document.createElement("button");

loginButton.type = "submit";

loginButton.textContent = "Login";


const loginMessage =
    document.createElement("p");


loginForm.appendChild(loginLabel);

loginForm.appendChild(loginInput);

loginForm.appendChild(loginButton);


usersPage.appendChild(loginForm);

usersPage.appendChild(loginMessage);


// ------------------------------------------
// USER FORM
// ------------------------------------------

const userHeading =
    document.createElement("h3");

userHeading.textContent =
    "Add / Update User";

usersPage.appendChild(userHeading);


const userForm =
    document.createElement("form");


const userIndex =
    document.createElement("input");

userIndex.type = "hidden";


const nameLabel =
    document.createElement("label");

nameLabel.textContent = "Name:";


const userName =
    document.createElement("input");

userName.type = "text";

userName.required = true;


const memberLabel =
    document.createElement("label");

memberLabel.textContent =
    "Membership ID:";


const membershipId =
    document.createElement("input");

membershipId.type = "text";

membershipId.required = true;


const roleLabel =
    document.createElement("label");

roleLabel.textContent = "Role:";


const role =
    document.createElement("select");


["Member", "Librarian", "Admin"].forEach(
    function(roleName) {

        const option =
            document.createElement("option");

        option.value = roleName;

        option.textContent = roleName;

        role.appendChild(option);
    }
);


const saveUserButton =
    document.createElement("button");

saveUserButton.type = "submit";

saveUserButton.textContent =
    "Save User";


const clearUserButton =
    document.createElement("button");

clearUserButton.type = "button";

clearUserButton.textContent =
    "Clear";


clearUserButton.addEventListener(
    "click",
    clearUserForm
);


userForm.appendChild(userIndex);

userForm.appendChild(nameLabel);

userForm.appendChild(userName);

userForm.appendChild(memberLabel);

userForm.appendChild(membershipId);

userForm.appendChild(roleLabel);

userForm.appendChild(role);

userForm.appendChild(saveUserButton);

userForm.appendChild(clearUserButton);


usersPage.appendChild(userForm);


// ------------------------------------------
// USER TABLE
// ------------------------------------------

const userHeading =
    document.createElement("h3");

userHeading.textContent =
    "Registered Users";

usersPage.appendChild(userHeading);


const userTable =
    document.createElement("table");


const userHead =
    document.createElement("thead");

userHead.innerHTML = `
    <tr>
        <th>Name</th>
        <th>Membership ID</th>
        <th>Role</th>
        <th>Actions</th>
    </tr>
`;


const userBody =
    document.createElement("tbody");


userTable.appendChild(userHead);

userTable.appendChild(userBody);

usersPage.appendChild(userTable);

content.appendChild(usersPage);


// ==========================================
// ADD / UPDATE USER
// ==========================================

userForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const user = {

            name: userName.value,

            membershipId: membershipId.value,

            role: role.value
        };


        if (userIndex.value !== "") {

            users[Number(userIndex.value)] = user;

            alert("User updated successfully!");

        } else {

            users.push(user);

            alert("User added successfully!");
        }


        saveData();

        clearUserForm();

        displayUsers();

        displayDashboard();
    }
);


// ==========================================
// DISPLAY USERS
// ==========================================

function displayUsers() {

    userBody.innerHTML = "";


    users.forEach(function(user, index) {

        const row =
            document.createElement("tr");


        const name =
            document.createElement("td");

        name.textContent = user.name;


        const id =
            document.createElement("td");

        id.textContent =
            user.membershipId;


        const userRole =
            document.createElement("td");

        userRole.textContent =
            user.role;


        const actions =
            document.createElement("td");


        const update =
            document.createElement("button");

        update.textContent = "Update";

        update.addEventListener(
            "click",
            function() {

                editUser(index);
            }
        );


        const deleteButton =
            document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.addEventListener(
            "click",
            function() {

                deleteUser(index);
            }
        );


        actions.appendChild(update);

        actions.appendChild(deleteButton);


        row.appendChild(name);

        row.appendChild(id);

        row.appendChild(userRole);

        row.appendChild(actions);


        userBody.appendChild(row);
    });
}


// ==========================================
// EDIT USER
// ==========================================

function editUser(index) {

    const user = users[index];


    userIndex.value = index;

    userName.value = user.name;

    membershipId.value =
        user.membershipId;

    role.value = user.role;


    showPage("users");
}


// ==========================================
// DELETE USER
// ==========================================

function deleteUser(index) {

    if (confirm("Delete this user?")) {

        users.splice(index, 1);

        saveData();

        displayUsers();

        displayDashboard();
    }
}


// ==========================================
// CLEAR USER FORM
// ==========================================

function clearUserForm() {

    userForm.reset();

    userIndex.value = "";
}


// ==========================================
// LOGIN
// ==========================================

loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const id = loginInput.value;


        const user = users.find(
            function(user) {

                return user.membershipId === id;
            }
        );


        if (user) {

            loginMessage.textContent =
                "Login successful! Welcome "
                + user.name
                + " (" + user.role + ").";

        } else {

            loginMessage.textContent =
                "User not found.";
        }
    }
);


// ==========================================
// DASHBOARD
// ==========================================

function displayDashboard() {

    document.getElementById(
        "totalBooks"
    ).textContent = books.length;


    let stock = 0;


    books.forEach(function(book) {

        stock += Number(book.quantity);
    });


    document.getElementById(
        "totalStock"
    ).textContent = stock;


    document.getElementById(
        "totalUsers"
    ).textContent = users.length;


    dashboardBody.innerHTML = "";


    books.forEach(function(book) {

        const row =
            document.createElement("tr");


        if (book.quantity < 2) {

            row.className = "low-stock";
        }


        const title =
            document.createElement("td");

        title.textContent = book.title;


        const author =
            document.createElement("td");

        author.textContent = book.author;


        const genre =
            document.createElement("td");

        genre.textContent = book.genre;


        const isbn =
            document.createElement("td");

        isbn.textContent = book.isbn;


        const quantity =
            document.createElement("td");

        quantity.textContent =
            book.quantity;


        row.appendChild(title);

        row.appendChild(author);

        row.appendChild(genre);

        row.appendChild(isbn);

        row.appendChild(quantity);


        dashboardBody.appendChild(row);
    });
}


// ==========================================
// LOCAL STORAGE
// ==========================================

function saveData() {

    localStorage.setItem(
        "books",
        JSON.stringify(books)
    );

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}


// ==========================================
// PAGE NAVIGATION
// ==========================================

function showPage(pageName) {

    const pages = document.querySelectorAll(
        "main section"
    );


    pages.forEach(function(page) {

        page.classList.add("hidden");
    });


    document.getElementById(
        pageName
    ).classList.remove("hidden");
}


// ==========================================
// START SYSTEM
// ==========================================

displayBooks();

displayDashboard();

displayTransactions();

displayUsers();

updateTransactionBooks();

showPage("dashboard");
