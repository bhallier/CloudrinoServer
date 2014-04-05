// google.load('visualization', '1.0', {packages:['table']});
// google.load('visualization', '1', {packages: ['corechart']});
// google.load('visualization', '1', {packages: ['gauge']});

var RHData = [['Time', 'RH', 'Min', 'Max']];
var rhChart;
var rhChartData;
var rhChartOptions;

var rhTable;

var rhGauge;
var rhGaugeData;
var rhGaugeOptions;

function drawRHTable() {
     rhChartData = google.visualization.arrayToDataTable(RHData);
     
     rhTable = new google.visualization.Table(document.getElementById('rhTable'));
     
     cssClassNames = {
          'headerRow': 'headerRow',
          'tableCell': 'grayBorder',
          'oddTableRow': 'oddTableRow'
     };
     
     rhTableOptions = {
          'allowHtml': true,
          'cssClassNames': cssClassNames
     };
     
     rhTable.draw(rhChartData, rhTableOptions);
}

function updateRHTable(Time, RHValue, MinThreshold, MaxThreshold) {
     // Get the last row number
     var lastRow = rhChartData.getNumberOfRows();
     
     // Get the value of the last row
     var timeStamp = rhChartData.getValue(lastRow - 1, 0);
     
     //alert(timeStamp + ' ' + RHValue);
     if (timeStamp == 'Now') {
          rhChartData.removeRow(0);
     }
     
     if (Time != timeStamp) {
          rhChartData.addRow([Time, RHValue, MinThreshold, MaxThreshold]);
          rhTable.draw(rhChartData, rhTableOptions);
     }
     
}

/////////////////////////////////////////////////////////////////////////////////////////////////

function drawRHChart() {     
     rhChart = new google.visualization.LineChart(document.getElementById('rhChart'));
     rhChartOptions = {      
       animation: {duration: 1000, easing: 'out'},
       backgroundColor: { fill: "none" }
     };
     rhChart.draw(rhChartData, rhChartOptions);
}


function updateRHChart() {
     rhChart.draw(rhChartData, rhChartOptions);
}
     

///////////////////////////////////////////////////////////////////////////////////////
function drawRHGauge() {
     var lastRow = rhChartData.getNumberOfRows();
     var lastRH = rhChartData.getValue(lastRow - 1, 1);
     var minRH = rhChartData.getValue(lastRow - 1, 2);
     var maxRH = rhChartData.getValue(lastRow -1, 3);
     
     rhGaugeData = google.visualization.arrayToDataTable([
          ['RH'],
          [lastRH]
     ]);

     rhGauge = new google.visualization.Gauge(document.getElementById('rhGauge'));
     rhGaugeOptions = {          
          min: 0,
          max: 100,          
          redFrom: 0, redTo: minRH,
          greenFrom: minRH, greenTo: maxRH,         
          yellowFrom: maxRH, yellowTo: 100,              
          minorTicks: 5
     };
     rhGauge.draw(rhGaugeData, rhGaugeOptions);
}

function updateRHGauge(RHValue) {
     rhGaugeData.setValue(0, 0, RHValue);           
     rhGauge.draw(rhGaugeData, rhGaugeOptions);
     
}

///////////////////////////////////////////////////////////////////////////////////////
function drawORHGauge() {
     var lastRow = rhChartData.getNumberOfRows();
     var lastRH = rhChartData.getValue(lastRow - 1, 1);
     var minRH = rhChartData.getValue(lastRow - 1, 2);
     var maxRH = rhChartData.getValue(lastRow -1, 3);
     
     orhGaugeData = google.visualization.arrayToDataTable([
          ['RH'],
          [lastRH]
     ]);

     orhGauge = new google.visualization.Gauge(document.getElementById('orhGauge'));
     orhGaugeOptions = {          
          min: 0,
          max: 100,          
          redFrom: 0, redTo: minRH,
          greenFrom: minRH, greenTo: maxRH,         
          yellowFrom: maxRH, yellowTo: 100,              
          minorTicks: 5
     };
     orhGauge.draw(orhGaugeData, orhGaugeOptions);
}

function updateORHGauge(RHValue) {
     orhGaugeData.setValue(0, 0, RHValue);           
     orhGauge.draw(orhGaugeData, orhGaugeOptions);
     
}
