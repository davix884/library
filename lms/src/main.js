import { Admin } from "./models/Admin.js";
import { Member } from "./models/Member.js";
import { Book } from "./models/Book.js";  //I am importing book then down there i am going to create an instance of the book
import { LibrarySystem } from "./services/LibraryService.js";

const userSwitcher = document.getElementById("userSwitcher");
const bookSection = document.getElementById("bookSection");
const borrowedSection = document.getElementById("borrowedSection");

const bookForm = document.getElementById("bookForm");

const bookList = document.getElementById("bookList");
const borrowedList = document.getElementById("borrowedList");

let currentUser = new Member("John Doe", "john@email.com");

const library = new LibrarySystem();

userSwitcher.addEventListener("change", (e) => {  //so now depending on what the drop down wll tend to select  i am going to create a new object and this is polymorphism in action cc
    const selected = e.target.value;
    currentUser =
        selected === "admin"
            ? new Admin("Alice", "alice@email.com")   //so if it is am admin we are going  now to create this admin instance 
            : new Member("John Doe", "john@email.com");  //so here admin is a class and also member is a class and they are  both inheriting from a parent called user 

// if (selected === "admin") {
//     currentUser = new Admin("Alice", "alice@email.com");
// } else {
//     currentUser = new Member("John Doe", "john@email.com");
// }



    bookSection.style.display = selected === "admin" ? "block" : "none";
    borrowedSection.style.display = selected === "member" ? "block" : "none";

// if (selected === "admin") {
//    bookSection.style.display = "block";
// } else {
//    bookSection.style.display = "none";
// }



    renderBooks();
    renderBorrowed();
});

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();    //to prevent the page from reloading 

    const title = document.getElementById("title").value; //i am taking what the user will type in  the title input box and store it in variable 'title"
    const author = document.getElementById("author").value;
    const genre = document.getElementById("genre").value;
    const book = new Book(title, author, genre);

    library.addBook(book);

    renderBooks();

    bookForm.reset();
});

function renderBooks() {
    bookList.innerHTML = "";
    library.getAllBooks().forEach((book) => {
        const li = document.createElement("li");
        li.className =
            "bg-white p-4 rounded shadow flex justify-between items-center";

        let controls = "";
        if (currentUser.getRole() === "Member" && book.isAvailable) {
            controls = `<button class="bg-green-500 text-white px-3 py-1 rounded" data-action="borrow" data-id="${book.id}">Borrow</button>`;
        } else if (currentUser.getRole() === "Admin") {
            controls = `<span class="text-sm text-gray-500">${
                book.isAvailable ? "Available" : "Borrowed"
            }</span>`;
        }

        li.innerHTML = `
            <div>
              <strong>${book.title}</strong> by ${book.author} <em>(${book.genre})</em>
            </div>
            ${controls}
        `;
        bookList.appendChild(li);
    });
}

function renderBorrowed() {
    borrowedList.innerHTML = "";

    if (currentUser.getRole() !== "Member") return;

    const borrowedBooks = currentUser.getBorrowedBooks();

    borrowedBooks.forEach((book) => {
        const li = document.createElement("li");

        li.className =
            "bg-yellow-100 p-4 rounded shadow flex justify-between items-center";

        li.innerHTML = `
        <div>
            ${book.title} by ${book.author}
        </div>
        <button class="bg-red-500 text-white px-3 py-1 rounded" data-action="return" data-id="${book.id}">Return</button>
    `;
        borrowedList.appendChild(li);
    });
}

bookList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const id = e.target.getAttribute("data-id");
        const action = e.target.getAttribute("data-action");
        const book = library.getBookById(id);

        if (
            action === "borrow" &&
            currentUser.getRole() === "Member" &&
            book.isAvailable
        ) {
            currentUser.borrowBook(book);
            renderBooks();
            renderBorrowed();
        }
    }
});

// Initial Rendering
bookSection.style.display = "none";
renderBooks();
renderBorrowed();