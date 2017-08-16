console.log("you are in chart.js")

var ctx = document.getElementById("myChart").getContext('2d');
var myChart;

var car;
var hotel;
var airfare;

var carAPI;
var hotelAPI;
var planeAPI;

var caron = true;
var hotelon = true;
var airfareon = true;

function createVariables() {
	car = carPrice;
	hotel = hotelPrice;
	airfare = airlinePrice;	
	
	carAPI = carPrice;
	hotelAPI = hotelPrice;
	airfareAPI = airlinePrice;
}

function createVariablestest() {
	car = 14;
	hotel = 51;
	airfare = 99;	

	carAPI = 14;
	hotelAPI = 51;
	airfareAPI = 99;
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
	            label: 'Airfare',
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
createVariablestest();
createChart();

document.getElementById("rmvCar").onclick = function(evt){
	console.log("in onclick");
	if(caron){
		car = 0;
		createChart(); 
		caron = false;
		$("#totalPrice").text("$" + (airfare + car + hotel));		
	}
	else{
		car = carAPI;
		createChart();
		caron=true;
		$("#totalPrice").text("$" + (airfare + car + hotel));		
	}
}

document.getElementById("rmvHotel").onclick = function(evt){
	console.log("in onclick");
	if(hotelon){
		hotel = 0;
		createChart(); 
		hotelon = false;
		$("#totalPrice").text("$" + (airfare + car + hotel));
	}
	else{
		hotel = hotelAPI;
		createChart();
		hotelon=true;
		$("#totalPrice").text("$" + (airfare + car + hotel));		
	}
}

document.getElementById("rmvPlane").onclick = function(evt){
	console.log("in onclick");
	if(airfareon){
		airfare = 0;
		createChart(); 
		airfareon = false;
		$("#totalPrice").text("$" + (airfare + car + hotel));		
	}
	else{
		airfare = airfareAPI;
		createChart();
		airfareon=true;
		$("#totalPrice").text("$" + (airfare + car + hotel));		
	}
}


