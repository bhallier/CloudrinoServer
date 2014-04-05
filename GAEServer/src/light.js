// google.load('visualization', '1.0', {packages:['table']});
// google.load('visualization', '1', {packages: ['corechart']});
// google.load('visualization', '1', {packages: ['gauge']});

var LData = [['Time', 'Light', 'Min', 'Max']];
var lightChart;
var lightChartData;
var lightChartOptions;

var lightTable;

var lightGauge;
var lightGaugeData;
var lightGaugeOptions;

function drawLightTable() {
     lightChartData = google.visualization.arrayToDataTable(LData);
     
     lightTable = new google.visualization.Table(document.getElementById('lightTable'));
     
     cssClassNames = {
          'headerRow': 'headerRow',
          'tableCell': 'grayBorder',
          'oddTableRow': 'oddTableRow'
     };
     
     lightTableOptions = {
          'allowHtml': true,
          'cssClassNames': cssClassNames
     };
     
     lightTable.draw(lightChartData, lightTableOptions);
}

function updateLightTable(Time, LightValue, MinThreshold, MaxThreshold) {
     // Get the last row number
     var lastRow = lightChartData.getNumberOfRows();
     
     // Get the value of the last row
     var timeStamp = lightChartData.getValue(lastRow - 1, 0);
     
     //alert(timeStamp + ' ' + LightValue);
     if (timeStamp == 'Now') {
          lightChartData.removeRow(0);
     }
     
     if (Time != timeStamp) {
          lightChartData.addRow([Time, LightValue, MinThreshold, MaxThreshold]);
          lightTable.draw(lightChartData, lightTableOptions);
     }
     
}

function drawLightChart() {     
     lightChart = new google.visualization.LineChart(document.getElementById('lightChart'));
     lightChartOptions = {      
       animation: {duration: 1000, easing: 'out'},
       backgroundColor: { fill: "none" }
     };
     lightChart.draw(lightChartData, lightChartOptions);
}


function updateLightChart() {
     lightChart.draw(lightChartData, lightChartOptions);
}
     

///////////////////////////////////////////////////////////////////////////////////////
function drawLightGauge() {
     var lastRow = lightChartData.getNumberOfRows();
     var lastLight = lightChartData.getValue(lastRow - 1, 1);
     var minLight = lightChartData.getValue(lastRow - 1, 2);
     var maxLight = lightChartData.getValue(lastRow -1, 3);
     
     lightGaugeData = google.visualization.arrayToDataTable([
          ['Light'],
          [lastLight]
     ]);

     lightGauge = new google.visualization.Gauge(document.getElementById('lightGauge'));
     lightGaugeOptions = {          
          min: 0,
          max: 1000,          
          redFrom: 0, redTo: minLight,
          greenFrom: minLight, greenTo: maxLight,         
          yellowFrom: maxLight, yellowTo: 1000,              
          minorTicks: 5
     };
     lightGauge.draw(lightGaugeData, lightGaugeOptions);
}

function updateLightGauge(LightValue) {
     lightGaugeData.setValue(0, 0, LightValue);           
     lightGauge.draw(lightGaugeData, lightGaugeOptions);
     
}

///////////////////////////////////////////////////////////////////////////////////////
function drawOLightGauge() {
     var lastRow = lightChartData.getNumberOfRows();
     var lastLight = lightChartData.getValue(lastRow - 1, 1);
     var minLight = lightChartData.getValue(lastRow - 1, 2);
     var maxLight = lightChartData.getValue(lastRow -1, 3);
     
     olightGaugeData = google.visualization.arrayToDataTable([
          ['Light'],
          [lastLight]
     ]);

     olightGauge = new google.visualization.Gauge(document.getElementById('olightGauge'));
     olightGaugeOptions = {          
          min: 0,
          max: 1000,          
          redFrom: 0, redTo: minLight,
          greenFrom: minLight, greenTo: maxLight,         
          yellowFrom: maxLight, yellowTo: 1000,              
          minorTicks: 5
     };
     olightGauge.draw(olightGaugeData, olightGaugeOptions);
}

function updateOLightGauge(LightValue) {
     olightGaugeData.setValue(0, 0, LightValue);           
     olightGauge.draw(olightGaugeData, olightGaugeOptions);
     
}
