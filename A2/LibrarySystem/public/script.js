const GRAPHQL_URL = "http://localhost:4000/graphql";


//helper to send graphQl requests : 
async function fetchGraphQl(query , variables = {}) {
    const response = await fetch(GRAPHQL_URL , {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({ query , variables }),
    });
    return response.json();
}


// fetch all the books : 
async function fetchBooks() {
    const query = `
        query {
            getAllBooks {
                id
                title
                authorId {
                    id
                    name
                }
            }
        }
    `;
    const { data } = await fetchGraphQl(query);
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    data.getAllBooks.forEach(book => {
        const li = document.createElement("li");
        li.textContent = `${book.title} by ${book.authorId.name}`;
        bookList.appendChild(li);
    });
}
// add an Author : 
async function addAuthor() {
    const name = document.getElementById("authorName").value;

    const mutation = `
        mutation($name : String!) {
            addAuthor(name : $name) {
                id
                name
            }
        }
    `;
    await fetchGraphQl(mutation , { name });
    alert("Author added!");
    fetchAuthors();
}

// Add a book : 
async function addBook() {
    const title = document.getElementById("bookTitle").value;
    const authorId = document.getElementById("authorId").value;

    const mutation = `
        mutation($title : String! , $authorId : ID!) {
            addBook(title : $title , authorId : $authorId) {
                id
                title
            }
        }
    `;

    await fetchGraphQl(mutation , { title , authorId });
    alert("Book Added!");
    fetchBooks();
}

// Fetch all authors : 

async function fetchAuthors() {
    const query = `
        query {
            getAllAuthors {
                id
                name
            }
        }
    `;

    const { data } = await fetchGraphQl(query);
    const authorList = document.getElementById("authorList");
    authorList.innerHTML = "";

    data.getAllAuthors.forEach(author => {
        const li = document.createElement("li");
        li.textContent = `${author.name} (ID : ${author.id})`;
        authorList.appendChild(li);
    });
}

// Fetch a book by Id : 

async function fetchBookById() {
    const bookId = document.getElementById("bookId").value;

    const query = `
        query($id : ID!) {
            getBookById(id : $id) {
                id
                title
                authorId {
                    id
                    name
                }
            }
        }
    `;

    const { data } = await fetchGraphQl(query , { id : bookId });
    const bookDetails = document.getElementById("bookDetails");

    if(data.getBookById) {
        const book = data.getBookById;
        bookDetails.textContent = `${book.title} by ${book.authorId.name}`;
    }
    else {
        bookDetails.textContent = "Book not Found!";
    }
}

// Fetch books by author ID:
async function fetchBooksByAuthor() {
    const authorId = document.getElementById("authorIdSearch").value;

    const query = `
        query($authorId: ID!) {
            getBooksByAuthor(authorId: $authorId) {
                id
                title
            }
        }
    `;

    const { data } = await fetchGraphQl(query, { authorId });
    const authorBooksList = document.getElementById("authorBooksList");
    authorBooksList.innerHTML = "";

    if (data.getBooksByAuthor.length === 0) {
        authorBooksList.innerHTML = "<li>No books found for this author!</li>";
        return;
    }

    data.getBooksByAuthor.forEach(book => {
        const li = document.createElement("li");
        li.textContent = book.title;
        authorBooksList.appendChild(li);
    });
}

