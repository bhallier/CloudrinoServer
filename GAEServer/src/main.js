
window.onload = function() {
     oldViewport = window.innerWidth;
     
     var navButtons = document.getElementById('navigation').getElementsByTagName('a');
     for (var i=0; i < navButtons.length; i++) {
	  var currentButton = navButtons[i];
	  if (currentButton.id == 'main') {
	       currentButton.className = 'active';	       
	  }
     }            

     startChartTools();               
     setInterval(updateChart, 5000);
     setInterval(updateDisplay, 3000);
     
}

     

function updateDisplay() {
     currentViewport = window.innerWidth;

     if (currentViewport != oldViewport) {
	  // Draw charts again
	  drawCharts();
	  // Set old viewport to new viewport
	  oldViewport = currentViewport;	
	  
     }
}

function getRandom(min, max) {
     return (min + Math.floor(Math.random() * (max - min + 1)));
}

function startChartTools() {
     
     for (var i = 0; i <= 10; i++) {
          var dateValue = new Date();
          var dateString = dateValue.toDateString();
          var timeString = dateValue.toTimeString();
          var fullDate =  timeString + ', ' + dateString;
          var tempValue = getRandom(45, 100);
          var rhValue = getRandom(55, 100);          
          var lightValue = getRandom(450, 1000);
          
          var tRow = [[
               fullDate,                              
               tempValue,
               70,
               90
          ]];
          
          TData.push.apply(TData, tRow);
          
          var hRow = [[
               fullDate,
               rhValue,
               70,
               80
          ]];
          
          RHData.push.apply(RHData, hRow);
          
          var lRow = [[
               fullDate,
               lightValue,
               650,
               900
          ]];
          
          LData.push.apply(LData, lRow);
     }
     
     drawCharts();
     
}


function drawCharts() {     
     
     drawTempTable();
     drawTempChart();
     drawTempGauge();
     drawOTempGauge();
          
     drawRHTable();
     drawRHChart();
     drawRHGauge();
     drawORHGauge();
          
     drawLightTable();
     drawLightChart();
     drawLightGauge();
     drawOLightGauge();
}



function updateChart() {
     var dateValue = new Date();
     var dateString = dateValue.toDateString();
     var timeString = dateValue.toTimeString();
     var fullDate =  timeString + ', ' + dateString;
     var tempValue = getRandom(45, 100);
     var rhValue = getRandom(55, 100);          
     var lightValue = getRandom(450, 1000);
     
     var tRow = [[
          fullDate,                              
          tempValue,
          70,
          90
     ]];
     
     TData.push.apply(TData, tRow);
     
     var hRow = [[
          fullDate,
          rhValue,
          70,
          80
     ]];
     
     RHData.push.apply(RHData, hRow);
     
     var lRow = [[
          fullDate,
          lightValue,
          650,
          900
     ]];
     
     LData.push.apply(LData, lRow);
                                                       
     updateTempTable(fullDate, tempValue, 70, 90);                         
     updateTempChart();
     updateTempGauge(tempValue);
     updateOTempGauge(tempValue);
     
     updateRHTable(fullDate, rhValue, 70, 80);
     updateRHChart();
     updateRHGauge(rhValue);
     updateORHGauge(rhValue);
     
     updateLightTable(fullDate, lightValue, 650, 900);                         
     updateLightChart();
     updateLightGauge(lightValue);
     updateOLightGauge(lightValue);
                         
}

     

