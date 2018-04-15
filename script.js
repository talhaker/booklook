var fetch = function(searchURL) {
    $.ajax({
        method: "GET",
        url: searchURL,
        success: function(data) {
            displaySearchResults(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
};

let displaySearchResults = function(data) {
    // Get div to place results into
    let bookList = $('.books');
    bookList.empty();
    $('<h3>Search Results:</h3>').appendTo(bookList);

    let listSize = (data.totalItems <= 10 ? data.totalItems : 10);
    for (let ix = 0; ix < listSize; ix++) {
        // Create display for a single book in the list
        displayBookInfo(data, ix);
    }
}

let displayBookInfo = function(data, ix) {
    let bookList = $('.books');

    // Create display for a single book in the list
    let bookDisplay = '<div class="book-details" id="' + ix + '">';
    if (data.items[ix].volumeInfo.imageLinks !== undefined) {
        bookDisplay += '<div class="ilb" ><img src="' + data.items[ix].volumeInfo.imageLinks.thumbnail + '" alt="Title image"></img></div>';
    }
    bookDisplay += '<div class = "ilb book-data" ><h1 class = "book-title">' + data.items[ix].volumeInfo.title + ' </h1>';
    if (data.items[ix].volumeInfo.description !== undefined) {
        bookDisplay += '<p class="book-description">' + data.items[ix].volumeInfo.description + '</p>';
    };
    bookDisplay += '<h3 class="book-authors">Written by: ' + data.items[ix].volumeInfo.authors + '</h3> \
    </div></div>'

    $(bookDisplay).appendTo(bookList);
}

let displaySelectedBook = function(id) {
    let bookList = $('.book-details');
    for (let ix = 0; ix < bookList.length; ix++) {
        // Remove all books - other than selected
        if (this.id !== bookList[ix].id) {
            bookList[ix].remove();
        }
    }
}

let searchHandler = function() {
    let text = $('.form-control').val();
    let selectProperty = $("select option:selected").val();
    let searchURL = 'https://www.googleapis.com/books/v1/volumes?q=';
    switch (selectProperty) {
        case "title":
            searchURL += 'intitle:';
            break;
        case "author":
            searchURL += 'inauthor:';
            break;
        case "isbn":
            searchURL += 'isbn:';
            break;
        default:
            alert('Illegal option!');
            return;
    }
    searchURL += text;
    fetch(searchURL);
}

$('.search-text').click(searchHandler);
$('.books').on('click', '.book-details', displaySelectedBook);