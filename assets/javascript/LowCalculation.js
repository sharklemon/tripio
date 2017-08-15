function lowCalculation(FlightRequest) {

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
    FlightRequest.request.slice[0].preferredCabin = "COACH";

    FlightRequest.request.slice[1].origin = destination;
    FlightRequest.request.slice[1].destination = home;
    FlightRequest.request.slice[1].date = returndate;
    FlightRequest.request.slice[1].maxStops = 3;
    FlightRequest.request.slice[1].preferredCabin = "COACH";

    $.ajax({

        type: "POST",
        url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyB0y0LKck7gyTlGvcsuqtPrmQBS4_BBhGA", 
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

                createChartTest(airlinePrice, carPrice, hotelPrice);

            });

        });

    });
}