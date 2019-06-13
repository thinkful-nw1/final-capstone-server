'use strict'

function getWeather(lat, long, timestamp) { 
    const apiKey = '1c450a6ebba94dbe3d3cd5e78f8fbe59'; 
    const lat = 42.3601
    const long = -71.0589
    const timestamp = 1560634430
    fetch(`https://api.darksky.net/forecast/${apiKey}/${lat}/${long}/${timestamp}`)
        .then(response => {
            if (response.ok) {
                return response.json(); 
            }
            throw new Error(response.statusText); 
        })
        .then(responseJson => console.log(JSON.stringify(responseJson)))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        })
}



function watchForm() {
    $('flight-search-form').submit(event => {
      event.preventDefault();
    
    getWeather();
    });
}

$(watchForm);