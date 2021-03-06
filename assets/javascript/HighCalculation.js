function highCalculation(FlightRequest) {

	console.log(FlightRequest);

    //Pulls search criteria from page
    home = $("#home").val().trim();
    destination = $("#destination").val().trim();
    startdate = $("#startdate").val().trim();
    returndate = $("#returndate").val().trim();

    //Prints search criteria to console
    console.log(home, "to", destination, "leaving", startdate, "and returning", returndate, "and we're spending mad ca$h");

//////////////////////////////
// FLIGHT SEARCH WITH QPX ////
//////////////////////////////

    //Creates object to submit to QPX for search
    //Departing flight
    FlightRequest.request.slice[0].origin = home;
    FlightRequest.request.slice[0].destination = destination;
    FlightRequest.request.slice[0].date = startdate;
    FlightRequest.request.slice[0].maxStops = 0; //only allows non-stops for the high spenders
    FlightRequest.request.slice[0].preferredCabin = ["BUSINESS","FIRST"]; //only searches business or first classs
    //Returning flight
    FlightRequest.request.slice[1].origin = destination;
    FlightRequest.request.slice[1].destination = home;
    FlightRequest.request.slice[1].date = returndate;
    FlightRequest.request.slice[1].maxStops = 0; //only allows non-stops for the high spenders
    FlightRequest.request.slice[1].preferredCabin = ["BUSINESS","FIRST"]; //only searches business or first classs


    //Ajax to pull the flight search results object
    $.ajax({

        type: "POST",
        url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyB3JP72tQdTTasFMFLaFYLywEvTElmnEuA", 
        contentType: "application/json", 
        dataType: "json",
        data: JSON.stringify(FlightRequest),
        success: function (response) {

        //Logs response object for each console checking
        console.log(response);

        //Error checking for flights
        if (!response.trips.tripOption) {
            console.log("Error");
            cancel("flights");
            return;
        }

        //Stores the total trip price for the return cheapest option
        airlinePrice = parseInt(response.trips.tripOption[0].pricing[0].saleTotal.replace("USD", ""));

        //Stores the landing time of the departing flight and the takeOff time of the returning flight
        landing = response.trips.tripOption[0].slice[0].segment[0].leg[response.trips.tripOption[0].slice[0].segment[0].leg.length-1].arrivalTime;
        takeOff = response.trips.tripOption[0].slice[1].segment[0].leg[response.trips.tripOption[0].slice[1].segment[0].leg.length-1].departureTime;

        //Stores the hours from the times, and adds :00 to adhere to HH:MM format
        landing = landing.substr(landing.indexOf("T") + 1, 2) + ":00";
        takeOff = takeOff.substr(takeOff.indexOf("T") + 1, 2) + ":00";

        }

        //Upon completion of Flight AJAX, proceeds to car rental
        }).done(function() {

//////////////////////////////////////
// CAR RENTAL SEARCH WITH HOTWIRE ////
//////////////////////////////////////

        //Reformats dates for hotwire format (MM/DD/YYYY)
        startdate = startdate.substring(5, 7) + "/" + startdate.substring(8, 10) + "/" + startdate.substring(0, 4);
        returndate = returndate.substring(5, 7) + "/" + returndate.substring(8, 10) + "/" + returndate.substring(0, 4);

        //car API key for Hotwire.com API
        var carAPIkey = "qwjnwktsp5td59nb8z3n3qeg";
        
        //Creates URL for Hotwire URL
        //Utilizes a CORS enabled wrapper on the Hotwire API created by Dana Silver
        //https://github.com/danasilver/hotwire
        var carURL = "https://hotwire.herokuapp.com/v1/search/car?" 
            + "apikey=" + carAPIkey 
            + "&format=" + "JSON" 
            + "&dest=" + destination
            + "&startdate=" + startdate
            + "&enddate=" + returndate
            + "&pickuptime=" + landing
            + "&dropofftime=" + takeOff
            + "&includeResultsLink=true";
   
        //Ajax to pull the car rental search results object
        $.ajax({
            url: carURL,
            method: "GET",
            dataType: "json"
        }).done(function(carResults) { 

        //Console logs car search results
        console.log(carResults);

        //Error checking for cars
        if (carResults.StatusDesc !== "success") {
            console.log("Error");
            cancel("cars");
            return;
        }

        //Acceptable classes of Luxury cars
        var luxuryCarsTypes = ["FCAR", "FFAR", "LCAR", "PCAR", "STAR"];
        //Variable for position of cheapest acceptable car
        var cheapestLuxuryCar = 0;

        //Runs through the already-sorted array of all cars searching for the cheapest acceptable car
        //And breaks the for loop once it finds it
        //Since the array is sorted by price lowest to highest, we can use the first car that is the right class 
        //If none of them are one of those classes, we just go with the cheapest car (position 0)
        for(var i = 0; i < carResults.Result.length; i++) {
            if(luxuryCarsTypes.indexOf(carResults.Result[i].CarTypeCode) > -1) {
                cheapestLuxuryCar = i;
                break;
            }
        }

        //Parses the price of the car as an Int
        carPrice = parseInt(carResults.Result[cheapestLuxuryCar].TotalPrice);

        //Upon completion of Car rental AJAX, proceeds to hotel search
        }).done(function() {

/////////////////////////////////
// HOTEL SEARCH WITH HOTWIRE ////
/////////////////////////////////

            //Hotel API key for Hotwire.com API
            var hotelAPIkey = "knzduxyfwxk9gshgf2ztxmum";

            //Creates URL for Hotwire URL
            //Utilizes a CORS enabled wrapper on the Hotwire API created by Dana Silver
            //https://github.com/danasilver/hotwire
            var hotelURL = "https://hotwire.herokuapp.com/v1/search/hotel?" 
                + "apikey=" + hotelAPIkey 
                + "&format=" + "JSON" 
                + "&dest=" + destination
                + "&rooms=" + "1"
                + "&adults=" + "1"
                + "&children=" + "0"
                + "&startdate=" + startdate
                + "&enddate=" + returndate
                + "&includeResultsLink=true";

             //Ajax to pull the hotel search results object
            $.ajax({
                url: hotelURL,
                method: "GET",
                dataType: "json"
            }).done(function(hotelResults) {

            // Console logs hotel results
            console.log(hotelResults);

            //Error checking for hotels
            if (hotelResults.StatusDesc !== "success") {
                console.log("Error");
                cancel("hotels");
                return;
            }

            //Acceptable hotel ratings for the high-end spender (4+ stars)
            var acceptableHotelRatings = ["4.0", "4.5", "5.0"];
            //Position for the cheapest acceptable-rating hotel
            var cheapestTopHotel = 0;

            //The hotel results are NOT sorted by price
            //Runs through the array checking the rating and price of the hotel listings
            //If there is a cheaper 4, 4.5, or 5 star hotel, stores the index of it
            //If there are no 4+ star hotels, returns the 0-index result
            for (var i = 0; i < hotelResults.Result.length; i++) {
                if(acceptableHotelRatings.indexOf(hotelResults.Result[i].StarRating) > -1) {
                    if(parseFloat(hotelResults.Result[i].TotalPrice) < parseFloat(hotelResults.Result[cheapestTopHotel].TotalPrice)) {
                        cheapestTopHotel = i;
                    }
                }
            }

            //Parses the hotel price as an Int
            hotelPrice = parseInt(hotelResults.Result[cheapestTopHotel].TotalPrice);

            //Console logs the three price estimates for airline, car, and hotel
            console.log(airlinePrice, carPrice, hotelPrice);

            //Hides the spinning plane and unhides the price-display upon completion of the search
            $("#plane-spinner").removeClass('show');
            $("#plane-spinner").addClass('hidden');
            $("#price-display").removeClass('hidden');
            $("#price-display").addClass('show');
            $("#myChart").removeClass('hidden');
            $("#myChart").addClass('show');            

            //Updates the text results with the total price
            $("#totalPrice").text("$" + (airlinePrice + carPrice + hotelPrice));

            }).done(function() {
                //Updates the price variables and calls the method to create the price-breakdown chart
                createVariables();
                createChart();

            });

        });

    });

}