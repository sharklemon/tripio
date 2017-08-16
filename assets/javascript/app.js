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

$(document).ready(function() {

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
            "maxStops": "",
            "preferredCabin": ""
    
            }, {
            "origin": destination,
            "destination": home,
            "date": returndate,
            "maxStops": "",
            "preferredCabin": ""

            }
        ],
        "solutions": 1,
        }

};

//Event listener for cheap button click
$("#Cheapo-cent-btn").on("click", function() {
    $("#plane-spinner").removeClass('hidden');
    $("#plane-spinner").addClass('show');
    $("#price-display").removeClass('show');
    $("#price-display").addClass('hidden');
    event.preventDefault();

    lowCalculation(FlightRequest);

});

//MID RANGE SECTION
$("#Middler-cent-btn").on("click", function() {

    event.preventDefault();

    midCalculation(FlightRequest);

});

//MAD CASH SECTION
$("#MadCash-cent-btn").on("click", function() {

    event.preventDefault();

    highCalculation(FlightRequest);

});

});



