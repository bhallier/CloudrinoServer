google.load('visualization', '1.0', {packages:['table']});
google.load('visualization', '1', {packages: ['corechart']});
google.load('visualization', '1', {packages: ['gauge']});

// Shared Aspects
var TData = [['Time', 'Temp', 'Min', 'Max']];       // Data for all temp visualizations
var tempChartData;

// Main Table
var tempTable;

// Chart
var tempChart;
var tempChartOptions;

// Gauge
var tempGauge;
var tempGaugeData;
var tempGaugeOptions;



function drawTempTable() {
     // Chart data
     tempChartData = google.visualization.arrayToDataTable(TData);
     
     // Assign new visualization to DOM element
     tempTable = new google.visualization.Table(document.getElementById('tempTable'));
     
     cssClassNames = {
          'headerRow': 'headerRow',
          'tableCell': 'grayBorder',
          'oddTableRow': 'oddTableRow'
     };
     
     tempTableOptions = {
          'allowHtml': true,
          'cssClassNames': cssClassNames
     };
     
     // Draw Table
     tempTable.draw(tempChartData, tempTableOptions);
}     

function updateTempTable(Time, TempValue, MinTemp, MaxTemp) {
     // Get the last row number
     var lastRow = tempChartData.getNumberOfRows();
     
     // Get the value of the last row
     var timeStamp = tempChartData.getValue(lastRow - 1, 0);
     
     //alert(timeStamp + ' ' + TempValue);
     if (timeStamp == 'Now') {
          tempChartData.removeRow(0);
     }
     
     
     tempChartData.addRow([Time, TempValue, MinTemp, MaxTemp]);
     tempTable.draw(tempChartData, tempTableOptions);
     
     
}

function redrawTable() {
     dataTable = new google.visualization.Table(document.getElementById('tempTable'));
     dataTable.draw(dataData, tempTableOptions);
}

/////////////////////////////////////////////////////////////////////////////////////////////////

function drawTempChart() {
     tempChart = new google.visualization.LineChart(document.getElementById('tempChart'));
     tempChartOptions = {         
       animation: {duration: 1000, easing: 'out'},
       backgroundColor: { fill: "none" }
     };
     tempChart.draw(tempChartData, tempChartOptions);          
}


function updateTempChart() {
     tempChart.draw(tempChartData, tempChartOptions);
}



///////////////////////////////////////////////////////////////////////////////////////////////
/* Draws Temperature Gauge Using Temperature Chart Data */
function drawTempGauge() {    
     var lastRow = tempChartData.getNumberOfRows();
     var lastTemp = tempChartData.getValue(lastRow - 1, 1);
     var minTemp = tempChartData.getValue(lastRow - 1, 2);
     var maxTemp = tempChartData.getValue(lastRow - 1, 3);
     
     //alert('MinTemp: ' + String(minTemp) + ' ' + 'MaxTemp: ' + String(maxTemp));
     
     
     tempGaugeData = google.visualization.arrayToDataTable([
       ['Temp'],
       [lastTemp]
     ]);
     
     tempGauge = new google.visualization.Gauge(document.getElementById('tempGauge'));
     tempGaugeOptions = {          
       min: 0,
       max: 100,
       redFrom: 0, redTo: minTemp,
       greenFrom: minTemp, greenTo: maxTemp,
       yellowFrom: maxTemp, yellowTo: 100,        
       minorTicks: 5       
     };
     tempGauge.draw(tempGaugeData, tempGaugeOptions);
}

function updateTempGauge(TempValue, Threshold) {
     tempGaugeData.setValue(0, 0, TempValue, Threshold);           
     tempGauge.draw(tempGaugeData, tempGaugeOptions);
     
}

///////////////////////////////////////////////////////////////////////////////////////////////
/* Draws Overview Temperature Gauge Using Temperature Chart Data */
function drawOTempGauge() {    
     var lastRow = tempChartData.getNumberOfRows();
     var lastTemp = tempChartData.getValue(lastRow - 1, 1);
     var minTemp = tempChartData.getValue(lastRow - 1, 2);
     var maxTemp = tempChartData.getValue(lastRow - 1, 3);
     
     //alert('MinTemp: ' + String(minTemp) + ' ' + 'MaxTemp: ' + String(maxTemp));
     
     
     otempGaugeData = google.visualization.arrayToDataTable([
       ['Temp'],
       [lastTemp]
     ]);
     
     otempGauge = new google.visualization.Gauge(document.getElementById('otempGauge'));
     otempGaugeOptions = {          
       min: 0,
       max: 100,
       redFrom: 0, redTo: minTemp,
       greenFrom: minTemp, greenTo: maxTemp,
       yellowFrom: maxTemp, yellowTo: 100,        
       minorTicks: 5       
     };
     otempGauge.draw(otempGaugeData, otempGaugeOptions);
}

function updateOTempGauge(TempValue, Threshold) {
     otempGaugeData.setValue(0, 0, TempValue, Threshold);           
     otempGauge.draw(otempGaugeData, otempGaugeOptions);
     
}
