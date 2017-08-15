//$(document).ready(function() {

console.log("you are in chart.js")

var ctx = document.getElementById("myChart").getContext('2d');
var myChart;

var car;
var hotel;
var airfare;

function createVariables() {
	car = carPrice;
	hotel = hotelPrice;
	airfare = airlinePrice;	
}

function createChart(){

	myChart =  new Chart(ctx, {

    type: 'horizontalBar',
    data: {
        labels: ["Trip Costs"],
        datasets: [
            {
        		label: 'Car',
        		data: [car],
				backgroundColor: "rgba(153, 102, 255, 0.2)",
				hoverBackgroundColor: "rgba(153, 102, 255, .7)",
				hoverBorderWidth: 2,
				hoverBorderColor: 'lightgrey'
    		},
    		{
	            label: 'Hotel',
	            data: [hotel],
				backgroundColor: "rgba(54, 162, 235, 0.2)",
				hoverBackgroundColor: "rgba(54, 162, 235, .7)",
				hoverBorderWidth: 2,
				hoverBorderColor: 'lightgrey'
    		},
    		{
	            label: 'Plane',
	            data: [airfare],
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
        },
        legend: {
            display: false
         },
    }
});

}

document.getElementById("myChart").onclick = function(evt){
	console.log("in onclick");
	var activeElement = myChart.getElementAtEvent(evt);
    label = activeElement[0]._model.datasetLabel;
   	console.log(label); 
    if (label=="Car"){
	   	car = 0
		console.log(carPrice)
		//CLEAR OLD CHART;
		createChart();
    }
    else if (label == "Hotel"){
    	hotel = 0;
    	//CLEAR OLD CHART;
    	createChart();
    }
    else if (label == "Plane"){
    	airfare = 0;
    	//CLEAR OLD CHART;
		createChart();
	}	
   else{
   	console.log("error")
   };
}


//});