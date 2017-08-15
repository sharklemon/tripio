
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

    event.preventDefault();

    console.log(FlightRequest);

    home = $("#home").val().trim();
    destination = $("#destination").val().trim();
    startdate = $("#startdate").val().trim();
    returndate = $("#returndate").val().trim();

    console.log(home, "to", destination, "leaving", startdate, "and returning", returndate);

    ////FLIGHT SEARCH WITH QPX

    FlightRequest.request.slice[0].origin = home;
    FlightRequest.request.slice[0].destination = destination;
    FlightRequest.request.slice[0].date = startdate;
    FlightRequest.request.slice[0].maxStops = 3;
    FlightRequest.request.slice[0].preferredCabin = "coach";

    FlightRequest.request.slice[1].origin = destination;
    FlightRequest.request.slice[1].destination = home;
    FlightRequest.request.slice[1].date = returndate;
    FlightRequest.request.slice[1].maxStops = 3;
    FlightRequest.request.slice[1].preferredCabin = "coach";

    $.ajax({

        type: "POST",
        url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyB3JP72tQdTTasFMFLaFYLywEvTElmnEuA", 
        contentType: "application/json", 
        dataType: "json",
        data: JSON.stringify(FlightRequest),
        success: function (response) {

        airlinePrice = parseInt(response.trips.tripOption[0].pricing[0].baseFareTotal.replace("USD", ""));

        console.log(response);

        landing = response.trips.tripOption[0].slice[0].segment[0].leg[response.trips.tripOption[0].slice[0].segment[0].leg.length-1].arrivalTime;
        takeOff = response.trips.tripOption[0].slice[1].segment[0].leg[response.trips.tripOption[0].slice[1].segment[0].leg.length-1].departureTime;

        landing = landing.substr(landing.indexOf("T") + 1, 2) + ":00";
        takeOff = takeOff.substr(takeOff.indexOf("T") + 1, 2) + ":00";

        }

        }).done(function() {

    ////CAR RENTAL SEARCH WITH HOTWIRE

        //Reformats dates for hotwire format
        startdate = startdate.substring(5, 7) + "/" + startdate.substring(8, 10) + "/" + startdate.substring(0, 4);
        returndate = returndate.substring(5, 7) + "/" + returndate.substring(8, 10) + "/" + returndate.substring(0, 4);

        //car API key for Hotwire.com API
        var carAPIkey = "qwjnwktsp5td59nb8z3n3qeg";
        
        var carURL = "http://hotwire.herokuapp.com/v1/search/car?" 
            + "apikey=" + carAPIkey 
            + "&format=" + "JSON" 
            + "&dest=" + destination
            + "&startdate=" + startdate
            + "&enddate=" + returndate
            + "&pickuptime=" + landing
            + "&dropofftime=" + takeOff
            + "&includeResultsLink=true";
   
        //AJAX for car rental
        $.ajax({
            url: carURL,
            method: "GET",
            dataTYpe: "json"
        }).done(function(carResponse) { 

        var carResults = JSON.parse(carResponse);
        console.log(carResults);

        carPrice = parseInt(carResults.Result[0].TotalPrice);

        }).done(function() {

        ////HOTEL RENTAL SEARCH WITH HOTWIRE

            //Hotel API key for Hotwire.com API
            var hotelAPIkey = "qwjnwktsp5td59nb8z3n3qeg";
            
            var hotelURL = "http://hotwire.herokuapp.com/v1/search/hotel?" 
                + "apikey=" + hotelAPIkey 
                + "&format=" + "JSON" 
                + "&dest=" + destination
                + "&rooms=" + "1"
                + "&adults=" + "1"
                + "&children=" + "0"
                + "&startdate=" + startdate
                + "&enddate=" + returndate
                + "&includeResultsLink=true";

            //AJAX for hotel rental
            $.ajax({
                url: hotelURL,
                method: "GET",
                dataTYpe: "json"
            }).done(function(hotelResponse) {

            var hotelResults = JSON.parse(hotelResponse);
            console.log(hotelResults);

            //Runs through array of search results and pulls index of cheapest option
            var cheapestHotel = 0;
            for (var i = 1; i < hotelResults.Result.length; i++) {
                if(parseFloat(hotelResults.Result[i].TotalPrice) < parseFloat(hotelResults.Result[cheapestHotel].TotalPrice)) {
                    cheapestHotel = i;
                }
            }

            hotelPrice = parseInt(hotelResults.Result[cheapestHotel].TotalPrice);

            console.log(airlinePrice, carPrice, hotelPrice);

            $("#totalPrice").text("$" + (airlinePrice + carPrice + hotelPrice));

            }).done(function() {

                createChartTest();

            });

        });

    });

});


//MAD CASH SECTION
$("#MadCash-cent-btn").on("click", function() {

    event.preventDefault();

    console.log(FlightRequest);

    home = $("#home").val().trim();
    destination = $("#destination").val().trim();
    startdate = $("#startdate").val().trim();
    returndate = $("#returndate").val().trim();

    console.log(home, "to", destination, "leaving", startdate, "and returning", returndate);

    ////FLIGHT SEARCH WITH QPX

    FlightRequest.request.slice[0].origin = home;
    FlightRequest.request.slice[0].destination = destination;
    FlightRequest.request.slice[0].date = startdate;
    FlightRequest.request.slice[0].maxStops = 0;
    FlightRequest.request.slice[0].preferredCabin = ["business","first"];

    FlightRequest.request.slice[1].origin = destination;
    FlightRequest.request.slice[1].destination = home;
    FlightRequest.request.slice[1].date = returndate;
    FlightRequest.request.slice[1].maxStops = 0;
    FlightRequest.request.slice[1].preferredCabin = ["business","first"];


    $.ajax({

        type: "POST",
        url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyB3JP72tQdTTasFMFLaFYLywEvTElmnEuA", 
        contentType: "application/json", 
        dataType: "json",
        data: JSON.stringify(FlightRequest),
        success: function (response) {

        airlinePrice = parseInt(response.trips.tripOption[0].pricing[0].baseFareTotal.replace("USD", ""));

        console.log(response);

        landing = response.trips.tripOption[0].slice[0].segment[0].leg[response.trips.tripOption[0].slice[0].segment[0].leg.length-1].arrivalTime;
        takeOff = response.trips.tripOption[0].slice[1].segment[0].leg[response.trips.tripOption[0].slice[1].segment[0].leg.length-1].departureTime;

        landing = landing.substr(landing.indexOf("T") + 1, 2) + ":00";
        takeOff = takeOff.substr(takeOff.indexOf("T") + 1, 2) + ":00";

        }

        }).done(function() {

    ////CAR RENTAL SEARCH WITH HOTWIRE

        //Reformats dates for hotwire format
        startdate = startdate.substring(5, 7) + "/" + startdate.substring(8, 10) + "/" + startdate.substring(0, 4);
        returndate = returndate.substring(5, 7) + "/" + returndate.substring(8, 10) + "/" + returndate.substring(0, 4);

        //car API key for Hotwire.com API
        var carAPIkey = "qwjnwktsp5td59nb8z3n3qeg";
        
        var carURL = "http://hotwire.herokuapp.com/v1/search/car?" 
            + "apikey=" + carAPIkey 
            + "&format=" + "JSON" 
            + "&dest=" + destination
            + "&startdate=" + startdate
            + "&enddate=" + returndate
            + "&pickuptime=" + landing
            + "&dropofftime=" + takeOff
            + "&includeResultsLink=true";
   
        //AJAX for car rental
        $.ajax({
            url: carURL,
            method: "GET",
            dataTYpe: "json"
        }).done(function(carResponse) { 

        var carResults = JSON.parse(carResponse);
        console.log(carResults);

        var luxuryCarsTypes = ["FCAR", "FFAR", "LCAR", "PCAR", "STAR"];
        var cheapestLuxuryCar = 0;

        for(var i = 0; i < carResults.Result.length; i++) {
            if(luxuryCarsTypes.indexOf(carResults.Result[i].CarTypeCode) > -1) {
                cheapestLuxuryCar = i;
                i = carResults.Result.length;
            }
        }

        carPrice = parseInt(carResults.Result[cheapestLuxuryCar].TotalPrice);

        }).done(function() {

        ////HOTEL RENTAL SEARCH WITH HOTWIRE

            //Hotel API key for Hotwire.com API
            var hotelAPIkey = "qwjnwktsp5td59nb8z3n3qeg";
            
            var hotelURL = "http://hotwire.herokuapp.com/v1/search/hotel?" 
                + "apikey=" + hotelAPIkey 
                + "&format=" + "JSON" 
                + "&dest=" + destination
                + "&rooms=" + "1"
                + "&adults=" + "1"
                + "&children=" + "0"
                + "&startdate=" + startdate
                + "&enddate=" + returndate
                + "&includeResultsLink=true";

            //AJAX for hotel rental
            $.ajax({
                url: hotelURL,
                method: "GET",
                dataTYpe: "json"
            }).done(function(hotelResponse) {

            var hotelResults = JSON.parse(hotelResponse);
            console.log(hotelResults);

            var cheapestHotelPerRating = Array(11); //
            for (var i = 0; i < hotelResults.Result.length; i++) {
                var starRating = hotelResults.Result[i].StarRating;
                //checks if the array is empty in the equivalent of the star position
                if(cheapestHotelPerRating[starRating * 2] == null) {
                    cheapestHotelPerRating[starRating * 2] = i;
                }
                
                if(parseFloat(hotelResults.Result[i].TotalPrice) < parseFloat(hotelResults.Result[cheapestHotelPerRating[starRating * 2]].TotalPrice)) {
                    cheapestHotelPerRating[starRating * 2] = i;
                }
            }
            console.log(cheapestHotelPerRating);

            //Chooses the cheapest out of the 4, 4.5, and 5 stars
            if(hotelResults.Result[cheapestHotelPerRating[10]].TotalPrice < hotelResults.Result[cheapestHotelPerRating[9]].TotalPrice &&
                hotelResults.Result[cheapestHotelPerRating[10]].TotalPrice < hotelResults.Result[cheapestHotelPerRating[8]].TotalPrice) {
                hotelPrice = parseInt(hotelResults.Result[cheapestHotelPerRating[10]].TotalPrice);
            }   
            else if(hotelResults.Result[cheapestHotelPerRating[9]].TotalPrice < hotelResults.Result[cheapestHotelPerRating[8]].TotalPrice) {
                hotelPrice = parseInt(hotelResults.Result[cheapestHotelPerRating[9]].TotalPrice);
            }
            else {
                hotelPrice = parseInt(hotelResults.Result[cheapestHotelPerRating[8]].TotalPrice);
            }

            console.log(airlinePrice, carPrice, hotelPrice);

            $("#totalPrice").text("$" + (airlinePrice + carPrice + hotelPrice));

            }).done(function() {

                createChartTest();

            });

        });

    });

});


function createChartTest() {

    var ctx = document.getElementById("income").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: ["Trip Costs"],
            datasets: [
                {
                    label: 'Car',
                    data: [carPrice],
                    backgroundColor: "rgba(153, 102, 255, 0.2)",
                    hoverBackgroundColor: "rgba(153, 102, 255, .7)",
                    hoverBorderWidth: 2,
                    hoverBorderColor: 'lightgrey'
                },
                {
                    label: 'Hotel',
                    data: [hotelPrice],
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    hoverBackgroundColor: "rgba(54, 162, 235, .7)",
                    hoverBorderWidth: 2,
                    hoverBorderColor: 'lightgrey'
                },
                {
                    label: 'Plane',
                    data: [airlinePrice],
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    hoverBackgroundColor: "rgba(75, 192, 192, .7)",
                    hoverBorderWidth: 2,
                    hoverBorderColor: 'lightgrey'
                },
            ]
        },
        options: {
            scales: {
                xAxes: [{
                    stacked: true,
                    gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
                }],
                yAxes: [{
                    stacked: true,
                    gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
                }]
            }
        }
    }) //closes newChart
} //closes createChartType()

});



