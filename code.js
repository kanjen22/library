const bookContainer = document.querySelector(".main-content");
const loadBook = document.querySelector("#loadBook");
const sortBy = document.querySelector("select");
const clearAll_btn = document.querySelector("#clearAllBtn");
const add_btn = document.querySelector("#addBtn");
const bookDiag = document.querySelector("#bookDialog");
const form = document.querySelector("form");
const confirm_btn = document.querySelector("#confirmBtn");
const clear_btn = document.querySelector("#clearBtn")
const cancel_btn = document.querySelector("#cancelBtn")
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const page = document.querySelector("#page");
const read = document.querySelector("#read");
let myLibrary = [];
let bookId = 0;

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = '' + bookId++;
}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
}

loadSampleBooks();

loadBook.addEventListener("click", loadSampleBooks);

sortBy.addEventListener('change', function(e) {
    if (['title','author'].includes(this.value)) {
        myLibrary.sort((a, b) => a[this.value].localeCompare(b[this.value]));
    } else {
        myLibrary.sort((a, b) => a[this.value] - b[this.value]);
    }
    render();
})

sortBy.addEventListener('focus', function(e) { // allow code to execute even when same option is selected
    this.selectedIndex=-1;
    this.blur();
})


clearAll_btn.addEventListener("click", function(e) {
    if (confirm("Are you sure you want to delete all books?")) {
        myLibrary = [];
        render();
    }
})

add_btn.addEventListener("click", function(e) {
    bookDiag.showModal();
})

confirm_btn.addEventListener('click', (e) => {
    if (title.value && author.value && page.value) {
        e.preventDefault(); // prevent the page from reloading
        const newBook = new Book(title.value, author.value, Number(page.value), read.checked);
        myLibrary.push(newBook);
        form.reset();
        bookDiag.close();
        render();
    }
})

cancel_btn.addEventListener("click", (e) => {
    form.reset();
    bookDiag.close();
});


clear_btn.addEventListener("click", (e) => {
    e.preventDefault();
    form.reset();
})

function render() {
    // clear bookContainer
    bookContainer.innerHTML = "";
    // empty page
    if (myLibrary.length === 0) {
        const emptyBox = document.createElement("span");
        emptyBox.textContent = "Library is empty, add some books"
        bookContainer.appendChild(emptyBox);
    }
    // render books
    myLibrary.forEach((book) => {
        // create card and add to bookContainer
        bookContainer.appendChild(createBookNode(book.title, book.author, book.pages, book.read, book.id));
    })
}

function createBookNode(title, author, pages, read, id) {
    // create a bookNode in DOM
    const bookNode = document.createElement("div");
    bookNode.classList.add("book");
    bookNode.id = id;
    bookNode.innerHTML =
        `<h1> Title: ${title} </h1>
                <h1> Author: ${author} </h1>
                <h1> Pages: ${pages} </h1>
                <h1 class=${read ? "complete" : "in-progress"}>Read</h1>
                <button class="cancel-btn"> X </button>`;
    // addEventListener
    bookNode.addEventListener('click', function (e) {
        // read button
        if (e.target.classList.contains('complete') || e.target.classList.contains('in-progress')) {
            e.target.classList.toggle('complete');
            e.target.classList.toggle('in-progress');
            const targetBookNode = e.target.closest('.book');
            myLibrary[findBook(targetBookNode)].toggleReadStatus();
            console.log(myLibrary[findBook(targetBookNode)].read);
        }
        // cancel button
        if (e.target.classList.contains('cancel-btn')) {
            const targetBookNode = e.target.closest('.book');
            const idx = findBook(targetBookNode);
            myLibrary.splice(idx, 1);
            render();
        }
    })

    return bookNode
}

function findBook(targetBookNode) {
    for (book of myLibrary) {
        if (book.id === targetBookNode.id) {
            return myLibrary.indexOf(book);
        }
    }
    alert("There is an error, check the code!");
    return null;
}

function loadSampleBooks() {
    const sampleBooks = [
        ["Harry Potter", "J.K Rolling", 213, true],
        ["The Black Book", "Steven Spilberg", 300, false],
        ["Game of Thrones", "George R.R. Martin", 694, true],
        ["To Kill a Mockingbird", "Harper Lee", 281, true],
        ["1984", "George Orwell", 328, false],
        ["The Great Gatsby", "F. Scott Fitzgerald", 180, true],
        ["The Catcher in the Rye", "J.D. Salinger", 277, false],
        ["The Hobbit", "J.R.R. Tolkien", 310, true],
        ["The Da Vinci Code", "Dan Brown", 489, false],
        ["Pride and Prejudice", "Jane Austen", 279, true]
    ];
    sampleBooks.forEach((book) => {
        myLibrary.push(new Book(book[0], book[1], book[2], book[3]));
    })
    render();
}
