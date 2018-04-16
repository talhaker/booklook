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
    $('<h3>Search Results:</h3>').appendTo(bookList);
    if (data.totalItems === 0) {
        $('<h5>No results found...</h5>').appendTo(bookList);
        return;
    }

    let listSize = (data.totalItems <= 10 ? data.totalItems : 10);
    for (let ix = 0; ix < listSize; ix++) {
        // Create display for a single book in the list
        displayBookInfo(data, ix);
    }
}

let displayBookInfo = function(data, ix) {
    let bookList = $('.books');

    // Create display for a single book in the list
    let bookDisplay = '<div class="row book-details" id="' + ix + '"><div class="col-md-2 ilb">';
    if (data.items[ix].volumeInfo.imageLinks !== undefined) {
        bookDisplay += '<img src="' + data.items[ix].volumeInfo.imageLinks.thumbnail + '" alt="Title image"></img>';
    }
    bookDisplay += '</div><div class = "col-md-10 ilb book-data" ><h1 class = "book-title">' + data.items[ix].volumeInfo.title + ' </h1>';
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

let validateIsbn = function(isbnString) {
    if (isbnString.length !== 10) {
        alert('Wrong ISBN length!');
        return false;
    }

    let isbnNumber = Number(isbnString);
    if (isNaN(isbnNumber)) {
        alert('ISBN string is not a number!');
        return false;
    }

    return true;
}

let searchHandler = function(event) {
    // Allow 'enter' to execute (in addition to button click)
    event.preventDefault();

    // Cleare previous results (if exist)
    let bookList = $('.books');
    bookList.empty();

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
            let isbnValid = validateIsbn(text);
            if (!isbnValid) {
                alert('Invalid ISBN: ' + text);
                return;
            }
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
$(document).ajaxStart(function() {
    $(".busy-indicator").show();
});
$(document).ajaxStop(function() {
    $(".busy-indicator").hide();
});