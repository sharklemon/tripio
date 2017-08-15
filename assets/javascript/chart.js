function createChartTest() {

	var car = [carPrice];
	var hotel = [hotelPrice];
	var airfare = [airlinePrice];
	var labels = ["Trip Costs"];

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
	});
}
// window.onload = function() {
//    createChartTest();
// }
