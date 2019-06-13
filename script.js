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
    $('#weather').empty()
    
    $('#weather').append(
        `<ul>
            <h3>${responseJson[currently].summary}</h3>
            <p>${responseJson[currently].precipProbability}</p>
            <p>${responseJson[currently].precipType} </p>
            <p>${responseJson[currently].temperature}</p>
            <p>${responseJson[currently].apparentTemperature}</p>
        </ul>`
    )
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

function displayEvents(){
    console.log(resJson)
    const eventResults = resJson[embedded][events]
    $('#events').empty()

    for (let i =0; i < eventResults.length; i++ )
        $('#events').append(
            $('#results-list').append(
                `<li>
                    <h3><a href="${eventResults[i].url}>${eventResults[i].name}</a></h3>
                    <p>${responseJson.items[i].snippet.description}</p>
                    <img src='${responseJson.items[i].snippet.thumbnails.default.url}'>
                </li>`
            )
        )
}


function watchForm(){
    $('flight-search-form').submit(event => {
      event.preventDefault()
      getWeather();
    });
}

$(watchForm);