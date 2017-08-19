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

// function createVariablestest() {
// 	car = 14;
// 	hotel = 51;
// 	airfare = 99;	

// 	carAPI = 14;
// 	hotelAPI = 51;
// 	airfareAPI = 99;
// }
// createVariablestest();


function createChart(){

	myChart =  new Chart(ctx, {

    type: 'horizontalBar',
    data: {
        labels: ["Trip Costs"],
        datasets: [
            {
        		label: 'Car',
        		data: [car],
				backgroundColor: "rgba(214, 123, 120, 0.4)",
				hoverBackgroundColor: "rgba(214, 123, 120, .6)",
				hoverBorderWidth: 2,
				hoverBorderColor: 'lightgrey'
    		},
    		{
	            label: 'Hotel',
	            data: [hotel],
				backgroundColor: "rgba(214, 147, 120, 0.4)",
				hoverBackgroundColor: "rgba(214, 147, 120, .6)",
				hoverBorderWidth: 2,
				hoverBorderColor: 'lightgrey'
    		},
    		{
	            label: 'Airfare',
	            data: [airfare],
				backgroundColor: "rgba(214, 120, 161, 0.4)",
				hoverBackgroundColor: "rgba(214, 120, 161, .6)",
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
createChart();

function update(){
	myChart.update()
	$("#totalPrice").text("$" + (airfare + car + hotel));
}

document.getElementById("rmvCar").onclick = function(evt){
	console.log("in onclick car");
	if(caron){
		car = 0;
		myChart.data.datasets[0].data = [car];
		caron = false;
		update();
	}
	else{
		car = carAPI;
		myChart.data.datasets[0].data = [car];
		caron=true;
		update();
	}
}

document.getElementById("rmvHotel").onclick = function(evt){
	console.log("in onclick hotel");
	if(hotelon){
		hotel = 0;
		myChart.data.datasets[1].data = [hotel];
		hotelon = false;
		update();
	}
	else{
		hotel = hotelAPI;
		myChart.data.datasets[1].data = [hotel];
		hotelon=true;
		update();
	}
}

document.getElementById("rmvPlane").onclick = function(evt){
	console.log("in onclick plane");
	if(airfareon){
		airfare = 0;
		myChart.data.datasets[2].data = [airfare];
		airfareon = false;
		update();
	}
	else{
		airfare = airfareAPI;
		myChart.data.datasets[2].data = [airfareAPI];
		airfareon=true;
		update();
	}
}


