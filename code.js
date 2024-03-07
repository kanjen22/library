const myLibrary = [];
const bookContainer = document.querySelector(".main-content");
const add_btn = document.querySelector("#add-btn");
let bookId = 0;

// create some sample books
const book1 = new Book("Harry Potter", "J.K Rolling", 213, true);
const book2 = new Book("The Black Book", "Steven Spilberg", 300, false);
myLibrary.push(book1);
myLibrary.push(book2);
showBook();

add_btn.addEventListener("click", function(e) {
    let newBook = createBook("added book", "xxx", "xxx", "xxx");
    addBook(newBook);
})

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        let info = `${this.title} by ${this.author}, ${pages} pages, `
        if (this.read) {
            info += 'read'
        } else {
            info += 'not read yet'
        }
        return info
    }
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

function showBook() {
    for (let book of myLibrary) {
        let newBook = createBook(book.title, book.author, book.pages, book.read);
        addBook(newBook);
    }
}

function createBook (title, author, pages, read) {
    const book = document.createElement("div");
    book.classList.add("book");
    const titleNd = document.createElement("h1");
    const authorNd = document.createElement("h1");
    const pagesNd = document.createElement("h1");
    const readNd = document.createElement("h1");
    titleNd.textContent = "Title: " + title;
    authorNd.textContent = "Author: " + author;
    pagesNd.textContent = "Pages: "+ pages;
    if (read) {
        readNd.classList.add("complete");
        readNd.textContent = "Read: True";
    } else {
        readNd.classList.add("in-progress");
        readNd.textContent = "Read: False";
    }
    Nds = [titleNd, authorNd, pagesNd, readNd];
    for (let nd of Nds) {
        book.appendChild(nd);
    }
    readNd.addEventListener("click", function(e) {
        if (this.textContent === "Read: True") {
            this.textContent = "Read: False";
            this.classList.replace("complete", "in-progress")
        } else {
            this.textContent = "Read: True";
            this.classList.replace("in-progress", "complete")
        }
    })
    const cancel = document.createElement("button");
    cancel.classList.add("cancel-btn");
    cancel.textContent = "X";
    book.appendChild(cancel);
    cancel.addEventListener("click", function(e) {
        e.target.parentNode.remove();

    })
    return book
}

function addBook(newBook) {
    bookContainer.appendChild(newBook);
}

function removeBook() {

}

