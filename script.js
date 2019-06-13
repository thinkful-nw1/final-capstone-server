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

function displayWeather(responseJson){
    console.log(responseJson)
    $('#results-list').empty()
}

function getEvents(){
    const apiKey= 'F1YG3M7FUGeHVW79Jwoj1GJK9QQyKzKR'
    const destination = 'New York'
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=${destination}&startDateTime=${departs}&endDateTime=${returns}&apiKey=${apiKey}`)
        .then(res => {
            if (res.ok) {
                return res.json(); 
            }
            throw new Error(res.statusText)
        })
        .then(resJson => console.log(JSON.stringify(resJson)))
}



function watchForm() {
    $('flight-search-form').submit(event => {
      event.preventDefault()
      getWeather();
    });
}

$(watchForm);