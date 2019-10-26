// Grab button and add event listener to respond to click and fetch results of input
document.querySelector('#button').addEventListener('click', bookSearch);


function bookSearch(e) {
    // get input from search bar
    const searchInput = document.querySelector('#input').value;
    // console.log(searchInput);
    // Declare and instantiate xhr to get API from External source
    // On success, convert response from XML data to json

    const xhr = new XMLHttpRequest();

    xhr.open('GET', `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&maxresults=15`, true);

    xhr.onload = function() {
        if (this.status === 200) {
            const response = JSON.parse(this.responseText);

            console.log(response);

            let searchOutput = '';

            if (response.kind === "books#volumes") {

                // loop through the array of the data fetched from the restAPI
                response.items.forEach(function(form) {

                    searchOutput += `<img src="${form.volumeInfo.imageLinks.thumbnail}"><br>
                                <a href="${form.volumeInfo.previewLink}">Preview</a><br>
                                <li>${form.volumeInfo.title}</li>
                                <li>Author: ${form.volumeInfo.authors}</li>
                               `;

                });


            } else {
                searchOutput += "<li>Oops! Book Can Not Be Found, Check Later</li>"
            }
            // Populate divs with search results.
            document.querySelector('.card-body').innerHTML = searchOutput;
        }
    }


    xhr.send();
    e.preventDefault();
}