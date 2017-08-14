

$(document).ready(function() {

// these vars will equal to whatever we pull from the form; the JSON object right now has placeholder origins, destinations, and dates
var home;
var destination;
var startdate;
var returndate;
var airlinePrice;
var landing;
var takeOff;
var carPrice;
var hotelPrice;
var carURL;
var hotelURL;


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
            "date": startdate,
    
            }, {
            "origin": destination,
            "destination": home,
            "date": returndate

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
    startdate = $("#startdate").val().trim();
    returndate = $("#returndate").val().trim();

    console.log(home);
    console.log(destination);
    console.log(startdate);
    console.log(returndate);

    ////FLIGHT SEARCH WITH QPX

    FlightRequest.request.slice[0].origin = home;
    FlightRequest.request.slice[0].destination = destination;
    FlightRequest.request.slice[0].date = startdate;

    FlightRequest.request.slice[1].origin = destination;
    FlightRequest.request.slice[1].destination = home;
    FlightRequest.request.slice[1].date = returndate;


    $.ajax({

        type: "POST",
        url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyB3JP72tQdTTasFMFLaFYLywEvTElmnEuA", 
        contentType: "application/json", 
        dataType: "json",
        data: JSON.stringify(FlightRequest),
        success: function (response) {

        // console.logging so i don't forget how to find what we really need from the ajax
        // console.log(response.trips.tripOption[0].pricing[0].baseFareTotal);
        // console.log(response.trips.tripOption[0].slice[0].segment[7].leg[0].arrivalTime);
        // console.log(response.trips.tripOption[0].slice[0].segment[7].leg[0].departureTime);

        console.log(response);

        landing = response.trips.tripOption[0].slice[0].segment[0].leg[1].arrivalTime;
        takeOff = response.trips.tripOption[0].slice[1].segment[0].leg[0].departureTime;

        console.log(landing);
        console.log(takeOff);

        }

        }).done(function() {

    console.log(FlightRequest);

    ////CAR RENTAL SEARCH WITH HOTWIRE

        //FOR NOW, JUST ASSUMING THE SAME START/END DATES AS THE FLIGHTS AT NOON
        //TO UPDATE WITH NEW START END DATES & TIMES BASED ON FLIGHT TIMES
        startdate = "08/15/2017";
        returndate = "08/17/2017";

        //car API key for Hotwire.com API
        var carAPIkey = "qwjnwktsp5td59nb8z3n3qeg";
        
        carURL = "http://hotwire.herokuapp.com/v1/search/car?" 
            + "apikey=" + carAPIkey 
            + "&format=" + "JSON" 
            + "&dest=" + destination
            + "&startdate=" + startdate
            + "&enddate=" + returndate
            + "&pickuptime=" + landing
            + "&dropofftime=" + takeOff;

        console.log("Hotwire Car URL:", carURL); 

    });
   
    //AJAX for car rental
    $.ajax({
        url: carURL,
        method: "GET",
        dataTYpe: "json"
    }).done(function(carResponse) { 

    var carResults = JSON.parse(JSON.stringify(carResponse));
    console.log(carResults.Result);

    }).done(function() {

    ////HOTEL RENTAL SEARCH WITH HOTWIRE

        //FOR NOW, JUST ASSUMING THE SAME START/END DATES AS THE FLIGHTS AT NOON
        //TO UPDATE WITH NEW START END DATES & TIMES BASED ON FLIGHT TIMES

        //Hotel API key for Hotwire.com API
        var hotelAPIkey = "qwjnwktsp5td59nb8z3n3qeg";
        
        var hotelURL = "http://hotwire.herokuapp.com/v1/search/car?" 
            + "apikey=" + hotelAPIkey 
            + "&format=" + "JSON" 
            + "&dest=" + destination
            + "&rooms=" + "1"
            + "&adults=" + "1"
            + "&children=" + "0"
            + "&startdate=" + startdate
            + "&enddate=" + returndate;

        console.log("Hotwire Hotel URL:", hotelURL);

    });

    //AJAX for car rental
    $.ajax({
        url: hotelURL,
        method: "GET",
        dataTYpe: "json"
    }).done(function(hotelResponse) {

    var hotelResults = JSON.parse(JSON.stringify(hotelResponse));
    console.log(hotelResults.Result);

    });


});

});