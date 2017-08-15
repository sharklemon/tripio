
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

// function createChartTest() {

//     var ctx = document.getElementById("income").getContext('2d');
//     var myChart = new Chart(ctx, {
//         type: 'horizontalBar',
//         data: {
//             labels: ["Trip Costs"],
//             datasets: [
//                 {
//                     label: 'Car',
//                     data: [carPrice],
//                     backgroundColor: "rgba(153, 102, 255, 0.2)",
//                     hoverBackgroundColor: "rgba(153, 102, 255, .7)",
//                     hoverBorderWidth: 2,
//                     hoverBorderColor: 'lightgrey'
//                 },
//                 {
//                     label: 'Hotel',
//                     data: [hotelPrice],
//                     backgroundColor: "rgba(54, 162, 235, 0.2)",
//                     hoverBackgroundColor: "rgba(54, 162, 235, .7)",
//                     hoverBorderWidth: 2,
//                     hoverBorderColor: 'lightgrey'
//                 },
//                 {
//                     label: 'Plane',
//                     data: [airlinePrice],
//                     backgroundColor: "rgba(75, 192, 192, 0.2)",
//                     hoverBackgroundColor: "rgba(75, 192, 192, .7)",
//                     hoverBorderWidth: 2,
//                     hoverBorderColor: 'lightgrey'
//                 },
//             ]
//         },
//         options: {
//             scales: {
//                 xAxes: [{
//                     stacked: true,
//                     gridLines: {
//                     color: "rgba(0, 0, 0, 0)",
//                 }
//                 }],
//                 yAxes: [{
//                     stacked: true,
//                     gridLines: {
//                     color: "rgba(0, 0, 0, 0)",
//                 }
//                 }]
//             }
//         }
//     }) //closes newChart
// } //closes createChartType()

});



