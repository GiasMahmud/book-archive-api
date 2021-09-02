const searchBox = document.getElementById("search-area")
const countBook = document.getElementById("count-founded-book")
const resultFound = document.getElementById("error-detaction")

const toggleSpinner = displayStyle => {
    document.getElementById("spinner").style.display = displayStyle;
}


document.getElementById("search-btn").addEventListener("click", () => {

    toggleSpinner("block")
    resultFound.innerText = ""

    search = searchBox.value;

    searchBox.value = ""

    const url = https//openlibrary.org/search.json?q=${search}
    fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data.docs))
})


const displayResult = books => {

    toggleSpinner("none")

    const bookContainer = document.getElementById("book-container")

    bookContainer.textContent = ""

    if (!books.lenght) {
        resultFound.innerText = "Result Not Found"

        countBook.innerText = ""
    }
    let count = 0;
    books.forEach(book => {

        resultFound.innerText = ""

        countBook.innerText = "Total Book Found: " + count++;

        const div = document.createElement("div")
        div.classList.add("col")
        div.innerHTML = `
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="..." height="450px">
            <div class="card-body">
                <h4 class="card-title">${book.title}</h4>
                <h6>Author Name: ${book.author_name[0] ? book.author_name[0] : "Not Available"}</h6>
                <h6>Publisher: ${book.publisher[0] ? book.publisher[0] : "Not Available"}</h6>
                <h6>First Published: ${book.first_publish_year ? book.first_publish_year : "Not Available"}</h6>
            </div>
        </div>
        `

        bookContainer.appendChild(div)
    });

}