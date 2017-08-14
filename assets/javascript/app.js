

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
            "date": startdate
    
            }, {
            "origin": destination,
            "destination": home,
            "date": returndate

            }
        ],
        "solutions": 1,
        }

};

$("#Cheapo-cent-btn").on("click", function() {

    event.preventDefault();

    console.log(FlightRequest);

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

        airlinePrice = response.trips.tripOption[0].pricing[0].baseFareTotal;

        console.log(response);

        landing = response.trips.tripOption[0].slice[0].segment[0].leg[1].arrivalTime;
        takeOff = response.trips.tripOption[0].slice[1].segment[0].leg[0].departureTime;

        landing = landing.substr(landing.indexOf("T") + 1, 2) + ":00";
        takeOff = takeOff.substr(takeOff.indexOf("T") + 1, 2) + ":00";

        }

        }).done(function() {

    ////CAR RENTAL SEARCH WITH HOTWIRE

        //FOR NOW, JUST ASSUMING THE SAME START/END DATES AS THE FLIGHTS AT NOON
        //TO UPDATE WITH NEW START END DATES & TIMES BASED ON FLIGHT TIMES

        //Reformats dates for hotwire format
        startdate = startdate.substring(5, 7) + "/" + startdate.substring(8, 10) + "/" + startdate.substring(0, 4);
        returndate = returndate.substring(5, 7) + "/" + returndate.substring(8, 10) + "/" + returndate.substring(0, 4);

        console.log(startdate);
        console.log(returndate);

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

        console.log("Hotwire Car URL:", carURL); 
   
        //AJAX for car rental
        $.ajax({
            url: carURL,
            method: "GET",
            dataTYpe: "json"
        }).done(function(carResponse) { 

        var carResults = JSON.parse(carResponse);
        console.log(carResults);

        carPrice = carResults.Result[0].TotalPrice;



        }).done(function() {

        ////HOTEL RENTAL SEARCH WITH HOTWIRE

            //FOR NOW, JUST ASSUMING THE SAME START/END DATES AS THE FLIGHTS AT NOON
            //TO UPDATE WITH NEW START END DATES & TIMES BASED ON FLIGHT TIMES

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

            console.log("Hotwire Hotel URL:", hotelURL);

            //AJAX for hotel rental
            $.ajax({
                url: hotelURL,
                method: "GET",
                dataTYpe: "json"
            }).done(function(hotelResponse) {

            var hotelResults = JSON.parse(hotelResponse);
            console.log(hotelResults);

            hotelPrice = hotelResults.Result[0].TotalPrice;

            console.log(hotelPrice);
            console.log(carPrice);
            console.log(airlinePrice);

            $("#totalPrice").text("$" + (parseInt(hotelPrice) + parseInt(carPrice) + parseInt(airlinePrice.replace("USD", ""))));

            });

        });

    });

});

var car = carPrice;
var hotel = hotelPrice;
var airfare = airlinePrice;
var labels = ["Trip Costs"];

function createChartTest() {

    var ctx = document.getElementById("income").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Car',
                    data: car,
                    backgroundColor: "rgba(153, 102, 255, 0.2)",
                    hoverBackgroundColor: "rgba(153, 102, 255, .7)",
                    hoverBorderWidth: 2,
                    hoverBorderColor: 'lightgrey'
                },
                {
                    label: 'Hotel',
                    data: hotel,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    hoverBackgroundColor: "rgba(54, 162, 235, .7)",
                    hoverBorderWidth: 2,
                    hoverBorderColor: 'lightgrey'
                },
                {
                    label: 'Plane',
                    data: airfare,
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
})
}
window.onload = function() {
   createChartTest();
}


});



