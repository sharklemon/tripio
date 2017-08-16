// these vars will be used in the AJAX search throughout all javascript files; the JSON object right now has placeholder origins, destinations, and dates
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

    // the JSON object for the ajax call, there's some room to make some modifications in the future (number of adults/kids, number of results, max price, nonstop or not, etc)
    var FlightRequest = {
        "request": {
            "passengers": {
                "kind": "qpxexpress#passengerCounts",
                "adultCount": 1
                },
            "slice": [
                { 
                //Departing flight 'slice'
                "origin": home,
                "destination": destination,
                "date": startdate,
                "maxStops": "", //currently left blank, to be filled in depending on price option selected
                "preferredCabin": "" //currently left blank, to be filled in depending on price option selected
        
                }, { 
                //Returning flight 'slice'
                "origin": destination,
                "destination": home,
                "date": returndate,
                "maxStops": "", //currently left blank, to be filled in depending on price option selected
                "preferredCabin": "" //currently left blank, to be filled in depending on price option selected

                }
            ],
            "solutions": 1, //AJAX will only return the one flight option that is the cheapest
            }

    };

    //Event listener for cheap button click
    $("#Cheapo-cent-btn").on("click", function() {

        event.preventDefault();

        //Hides the price display and shows the plane spinner while searching
        $("#plane-spinner").removeClass('hidden');
        $("#plane-spinner").addClass('show');
        $("#price-display").removeClass('show');
        $("#price-display").addClass('hidden');

        //Updates the text results with your price option and search criteria
        $("#top-results").text("You have chosen the low-cost option, your total is: ");
        $("#bottom-results").text("Your results reflect the lowest priced airfare, car rental, and hotel rates available.");

        //Calls the low-price calculation method and passes it FlightRequest for flight search details
        lowCalculation(FlightRequest);

    });

    //MID RANGE SECTION
    $("#Middler-cent-btn").on("click", function() {

        event.preventDefault();

        //Hides the price display and shows the plane spinner while searching
        $("#plane-spinner").removeClass('hidden');
        $("#plane-spinner").addClass('show');
        $("#price-display").removeClass('show');
        $("#price-display").addClass('hidden');

        //Updates the text results with your price option and search criteria
        $("#top-results").text("You have chosen the medium-cost option, your total is: ");
        $("#bottom-results").text("Your results reflect the lowest non-stop airfare, mid-class to luxury car rental, and 3+ star hotel rates available.");

        //Calls the mid-price calculation method and passes it FlightRequest for flight search details
        midCalculation(FlightRequest);

    });

    //MAD CASH SECTION
    $("#MadCash-cent-btn").on("click", function() {

        event.preventDefault();

        //Hides the price display and shows the plane spinner while searching
        $("#plane-spinner").removeClass('hidden');
        $("#plane-spinner").addClass('show');
        $("#price-display").removeClass('show');
        $("#price-display").addClass('hidden');

        //Updates the text results with your price option and search criteria
        $("#top-results").text("You have chosen the premium option, your total is: ");
        $("#bottom-results").text("Your results reflect the lowest non-stop First/Business class airfare, luxury car rental, and 4+ star hotel rates available.");

        //Calls the high-price calculation method and passes it FlightRequest for flight search details
        highCalculation(FlightRequest);

    });

});

function cancel(error) {
    var errorMessage;

    if(error = "flights") {
        errorMessage = "Your flight search was unsuccessful. Please verify or change your search criteria.";
    }
    else if(error = "cars") {
        errorMessage = "Your car search was unsuccessful. Please verify or change your search criteria.";
    }
    else {
        errorMessage = "Your hotel search was unsuccessful. Please verify or change your search criteria. Hotel stays should be no longer than 30 days.";
    }

    //Hides plane spinner, shows price-display
    $("#plane-spinner").removeClass('show');
    $("#plane-spinner").addClass('hidden');
    $("#price-display").removeClass('hidden');
    $("#price-display").addClass('show');
    
    //Sets text in results section
    $("#top-results").html("");
    $("#bottom-results").html("");
    $("#price-display").html(errorMessage);

}