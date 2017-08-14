$(document).ready(function() {

// these vars will equal to whatever we pull from the form; the JSON object right now has placeholder origins, destinations, and dates
var home;
var destination;
var date;

// the JSON object for the ajax call, there's some room to make some modifications (number of adults/kids, number of results, max price, nonstop or not, etc)
var FlightRequest = {
    "request": {
        "passengers": {
            "kind": "qpxexpress#passengerCounts",
            "adultCount": 1
            },
        "slice": [
            {

            "origin": home,
            "destination": destination,
            "date": date
    
            }
        ],
        "solutions": 1,
        }

};

$("#submit").on("click", function() {

    event.preventDefault();

    console.log("Pushed");

    home = $("#home").val().trim();
    destination = $("#destination").val().trim();
    date = $("#date").val().trim();

    console.log(home);
    console.log(destination);
    console.log(date);

    FlightRequest.request.slice[0].origin = home;
    FlightRequest.request.slice[0].destination = destination;
    FlightRequest.request.slice[0].date = date;


    $.ajax({

        type: "POST",
        url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyAMQGw6Z-4MykrHYhlIE191XnPEe85ACvE", 
        contentType: "application/json", 
        dataType: "json",
        data: JSON.stringify(FlightRequest),
        success: function (response) {

        // console.logging so i don't forget how to find what we really need from the ajax
        console.log(response);

        }

        });

    console.log(FlightRequest);

});

});