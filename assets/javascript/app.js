$(document).ready(function() {

// // these vars will equal to whatever we pull from the form; the JSON object right now has placeholder origins, destinations, and dates
// var home;
// var destination;
// var startdate;
// var enddate;
// var pickup;

// // the JSON object for the ajax call, there's some room to make some modifications (number of adults/kids, number of results, max price, nonstop or not, etc)
// var FlightRequest = {
//     "request": {
//         "passengers": {
//             "kind": "qpxexpress#passengerCounts",
//             "adultCount": 1
//             },
//         "slice": [
//             {

//             "origin": home,
//             "destination": destination,
//             "startdate": startdate,
//             "returndate": returndate
    
//             }
//         ],
//         "solutions": 1,
//         }

// };

// $("#submit").on("click", function() {
//     event.preventDefault();

//     console.log("Pushed");

//     home = $("#home").val().trim();
//     destination = $("#destination").val().trim();
//     startdate = $("#startdate").val().trim();
//     returndate = $("#returndate").val().trim();

//     console.log(home);
//     console.log(destination);
//     console.log(startdate);
//     console.log(returndate);

//     ////FLIGHT SEARCH WITH QPX

//     FlightRequest.request.slice[0].origin = home;
//     FlightRequest.request.slice[0].destination = destination;
//     FlightRequest.request.slice[0].date = startdate;
//     FlightRequest.request.slice[0].date = startdate;

//     $.ajax({

//         type: "POST",
//         url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyAMQGw6Z-4MykrHYhlIE191XnPEe85ACvE", 
//         contentType: "application/json", 
//         dataType: "json",
//         data: JSON.stringify(FlightRequest),
//         success: function (response) {

//         // console.logging so i don't forget how to find what we really need from the ajax
//         console.log(response);
//         }
//         });

//     console.log(FlightRequest);
//     ////CAR RENTAL SEARCH WITH HOTWIRE
//     //FOR NOW, JUST ASSUMING THE SAME START/END DATES AS THE FLIGHTS AT NOON
//     //TO UPDATE WITH NEW START END DATES & TIMES BASED ON FLIGHT TIMES

//     //car API key for Hotwire.com API
//     var carAPIkey = "qwjnwktsp5td59nb8z3n3qeg";
    
//     var carURL = "http://hotwire.herokuapp.com/v1/search/car?" 
//         + "apikey=" + carAPIkey 
//         + "&format=" + "JSON" 
//         + "&dest=" + destination
//         + "&startdate=" + startdate
//         + "&enddate=" + enddate
//         + "&pickuptime=" + "12:00"
//         + "&dropofftime=" + "12:00";

//     console.log("Hotwire Car URL:", carURL);

//     //AJAX for car rental
//     $.ajax({
//         url: carURL,
//         method: "GET",
//         dataTYpe: "json"
//     }).done(function(carResponse) {

//     var carResults = JSON.parse(JSON.stringify(carResponse));
//     console.log(carResults.Result);

//     });
//     ////HOTEL RENTAL SEARCH WITH HOTWIRE
//     //FOR NOW, JUST ASSUMING THE SAME START/END DATES AS THE FLIGHTS AT NOON
//     //TO UPDATE WITH NEW START END DATES & TIMES BASED ON FLIGHT TIMES

//     //Hotel API key for Hotwire.com API
//     var hotelAPIkey = "qwjnwktsp5td59nb8z3n3qeg";
    
//     var hotelURL = "http://hotwire.herokuapp.com/v1/search/car?" 
//         + "apikey=" + hotelAPIkey 
//         + "&format=" + "JSON" 
//         + "&dest=" + destination
//         + "&rooms=" + "1"
//         + "&adults=" + "1"
//         + "&children=" + "0"
//         + "&startdate=" + startdate
//         + "&enddate=" + enddate;

//     console.log("Hotwire Hotel URL:", hotelURL);

//     //AJAX for car rental
//     $.ajax({
//         url: hotelURL,
//         method: "GET",
//         dataTYpe: "json"
//     }).done(function(hotelResponse) {

//     var hotelResults = JSON.parse(JSON.stringify(hotelResponse));
//     console.log(hotelResults.Result);

//     });

// });

// function changeDisplay() {
//     console.log("You are in changeDisplay")
//     $("#price").text(totalprice);
//     $("#costLevel").text(priceLevel);
//     $(".question").toggleClass('hidden');

//     //display the question and options
//     $("#questionHD").html(questions[z].question);
//     $("#answer1").html(questions[z].answer1);
//     $("#answer2").html(questions[z].answer2);
//     $("#answer3").html(questions[z].answer3);
//     $("#answer4").html(questions[z].answer4);

//     // start the display timer & go to response page timer
//     timer = 10;
//     countDown(timer);
//     itertimer = setTimeout(NoResponse, 10000);

//     //pull out and save the ID and text of correct answer for comparison, enable answer click button
//     thisquestion = questions[z].question;
//     answerindex = questions[z].correct;
//     thisanswer = questions[z][answerindex];
// }

var car = [201];
var hotel = [80];
var airfare = [400];
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
                    backgroundColor: "rgba(166,123,134, 0.5)",
                    hoverBackgroundColor: "rgba(166,123,134, .7)",
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
                    backgroundColor: "rgba(123,166,145, 0.5)",
                    hoverBackgroundColor: "rgba(123,166,145, .7)",
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