// these vars will equal to whatever we pull from the form; the JSON object right now has placeholder origins, destinations, and dates
var origin;
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
            "kind": "qpxexpress#sliceInput",
            "origin": "DCA",
            "destination": "LAX",
            "date": "2017-08-14"
    
            }
        ],
        "solutions": 1,
        }

};

$.ajax({

    type: "POST",
    url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyB0y0LKck7gyTlGvcsuqtPrmQBS4_BBhGA", 
    contentType: "application/json", 
    dataType: "json",
    data: JSON.stringify(FlightRequest),
    success: function (response) {

    // console.logging so i don't forget how to find what we really need from the ajax
    console.log(response.trips.tripOption[0].pricing[0].baseFareTotal);

    }

    });