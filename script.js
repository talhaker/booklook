var fetch = function() {
    $.ajax({
        method: "GET",
        url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:0439023521',
        success: function(data) {
            displayBookInfo(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
};

let displayBookInfo = function(data) {
    let bookList = $('.books');

    $('<div class="book"> \
    <h1 class="book-title">' + data.items[0].volumeInfo.title + '</h1> \
    <p class="book-description">' + data.items[0].volumeInfo.description + '</p> \
    <h3 class="book-authors">Written by: ' + data.items[0].volumeInfo.authors + '</h3> \
    <img src="' + data.items[0].volumeInfo.imageLinks.thumbnail + '" alt="Title image"></img> \
    </div>').appendTo(bookList);

    console.log(data.items[0].volumeInfo.title);
    console.log(data.items[0].volumeInfo.authors);
    console.log(data.items[0].volumeInfo.description);
    console.log(data.items[0].volumeInfo.imageLinks.thumbnail);
}

let searchHandler = function() {
    let text = $('.form-control').val();
    //fetch(text);
    fetch();
}

$('.isbn-search').click(searchHandler);