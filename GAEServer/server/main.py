#!/usr/bin/env python
#
# Copyright 2011 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

#Author: Fergal O' Grady
#Google App Engine/Python 2.5
#Arduino sends HTTP POST to /arduino_post
 
# notes: make refresh rate a user pref?
 
#from google.appengine.api import users
import webapp2
import json
import ast
from google.appengine.ext.webapp.util import run_wsgi_app
import datetime

from google.appengine.ext import db

databaseEnabled = False;
temp = 0;
movement = 0;
moves = 0;
list = [];

class ArduinoSensorData(db.Model):
	temp = db.IntegerProperty(default=0)
	list = db.StringListProperty()
	lastmovement = db.DateTimeProperty(auto_now_add=True)
	lastupdate = db.DateTimeProperty(auto_now_add=True)

class ArduinoPost(webapp2.RequestHandler):
	def post(self):
		if(databaseEnabled):
			sensordata = ArduinoSensorData.get_or_insert('1')
			try:
				temp = int(self.request.get('temp'))
				movement = int(self.request.get('movement'))
				moves = int(self.request.get('moves'))
				sensordata.temp = temp
				sensordata.lastupdate = datetime.datetime.now()
				if movement == 1:
					sensordata.lastmovement = datetime.datetime.now()
				sensordata.list.append(datetime.datetime.now().strftime("%Y,%m,%d,%H,%M,%S"))
				sensordata.list.append(str(temp))
				sensordata.list.append(str(moves))
				sensordata.put()
			except ValueError:
				pass
			return
		else:
			try:
				global temp
				temp = int(self.request.get('temp'))
				global movement
				movement = int(self.request.get('movement'))
				global moves
				moves = int(self.request.get('moves'))
				localList = []
				localList.append(datetime.datetime.now().strftime("%Y,%m,%d,%H,%M,%S"))
				localList.append(str(temp))
				localList.append(str(moves))
				global list
				list.append(localList)
			except ValueError:
				pass
			return
		

class ServeData(webapp2.RequestHandler):   
	def get(self):
		if(databaseEnabled):
			datadb = ArduinoSensorData.get_or_insert('1')
			timeSinceLastMovement = generateDHMString(datetime.datetime.now() - datadb.lastmovement)
			data = {'list':listToRowData(datadb.list),'temp':str(datadb.temp),'timeSinceLastMovement':timeSinceLastMovement}
			self.response.headers['Content-Type'] = 'application/json'
			self.response.out.write(json.dumps(data))
			return
		else:
			data = {'list':listToRowData(list),'temp':str(temp),'timeSinceLastMovement':generateDHMString(datetime.datetime.now()-datetime.datetime.now())}
			self.response.headers['Content-Type'] = 'application/json'
			self.response.out.write(json.dumps(data))
			return
		

class MainPage(webapp2.RequestHandler):
	def get(self):
		self.response.headers['Content-Type'] = 'text/html'
		self.response.out.write('''
		<html> 
			<head>
				<title>Arduino Logger</title>
				<style type="text/css">
					div#temp_div {
						float: left;
						width: 250px;
						height: 280px;
						margin-right: 0px;
					}
					div#chart_div {
						float: left;
						width: 1000px;
						height: 280px;
					}​
				</style>
				<script type='text/javascript' src='http://www.google.com/jsapi'></script>
				<script type='text/javascript'>
					google.load('visualization', '1', {'packages':['annotationchart','table','gauge']});
					google.setOnLoadCallback(drawChart);
					
					var chart, tempGauge, table, data, options, temp, jsonObj;
					
				function drawChart()
				{
					data = new google.visualization.DataTable();
					data.addColumn('datetime', 'Date/Time');
					data.addColumn('number', 'Temperature');
					data.addColumn('number', 'Movement');
					
					options = {
					  width: 250, height: 280,
					  redFrom: 400, redTo: 600,
					  yellowFrom: 300, yellowTo: 400,
					  greenFrom: 0, greenTo: 300,
					  minorTicks: 10, max: 600
					};
 
					chart = new google.visualization.AnnotationChart(document.getElementById('chart_div'));
					tempGauge = new google.visualization.Gauge(document.getElementById('temp_div'));					
					table = new google.visualization.Table(document.getElementById('table_div'));
					loadJSON();
					setInterval(loadJSON, 5000);
				}
				function updateUI()
					{
						data.removeRows(0, data.getNumberOfRows())
						data.addRows(dataArr);
						
						temp = google.visualization.arrayToDataTable([
							['Label', 'Value'],
							['Temp', eval(jsonObj.temp)]
						]);
						
						chart.draw(data, {displayAnnotations: true});
						tempGauge.draw(temp, options);
						table.draw(data, null);
					}
				function loadJSON()
				{
				   //var data_file = "http://cloudinologger.appspot.com/get_data";
				   var data_file = "http://192.168.0.102:8080/get_data";
				   var http_request = new XMLHttpRequest();
				   try{
					  // Opera 8.0+, Firefox, Chrome, Safari
					  http_request = new XMLHttpRequest();
				   }catch (e){
					  // Internet Explorer Browsers
					  try{
						 http_request = new ActiveXObject("Msxml2.XMLHTTP");
					  }catch (e) {
						 try{
							http_request = new ActiveXObject("Microsoft.XMLHTTP");
						 }catch (e){
							// Something went wrong
							alert("Your browser broke!");
							return false;
						 }
					  }
				   }
					http_request.onreadystatechange  = function(){
						  if (http_request.readyState == 4  )
						  {
							// Javascript function JSON.parse to parse JSON data
							jsonObj = JSON.parse(http_request.responseText);
							dataArr = jsonObj.list.split(" ,");
							 for(i=0; i < dataArr.length;i++)
								 {
									var str;
									str = dataArr[i].toString();
									str = str.replace("[ ","");
									str = str.replace("]","");
									dataArr[i] = str.split(", ");
									dataArr[i][0] = eval((dataArr[i][0]));
									dataArr[i][1] = eval(dataArr[i][1]);
									dataArr[i][2] = eval(dataArr[i][2]);
								 }
							dataArr.splice( dataArr.length-1, 1 );
							updateUI();
							// jsonObj variable now contains the data structure and can
							// be accessed as jsonObj.name and jsonObj.country.
						  }
					   }
					   http_request.open("GET", data_file, true);
					   http_request.send();
					}
				</script>
			</head>
			<body>
				<div id='temp_div' class="temp_div"></div>
				<div id='chart_div' class="chart_div"></div>
				<div id='table_div' style="float: left; width: 1250px; height: 240px; padding-top: 10px;"></div>
			</body>
		</html>
		''')

app = webapp2.WSGIApplication([('/', MainPage),('/arduino_post', ArduinoPost),('/get_data', ServeData)], debug=True)

########HelperFunction########

def listToRowData(list):
	#'[new Date(year, month, day, hours, minutes, seconds), Temperature, Moves],\n'
	str1 =''
	for i in range(0,len(list)-2,3):
		str1 = str1 + '[ new Date(' + list[i] + '), ' + list[i+1] + ', ' + list[i+2] + '] ,'
	return str1

def generateDHMString(difference):
	#60 seconds * 60 minutes * 24 hours
	hours = difference.seconds // 3600
	temp = difference.seconds - (hours * 3600)
	minutes = temp // 60
	seconds = temp - (minutes * 60)
	andVal = False
	ret = str(seconds) + (" second ago" if seconds == 1 else " seconds ago!")
	if minutes != 0:
		str1 = " minute " if minutes == 1 else " minutes "
		andVal = True
		ret = str(minutes) + str1 + "and " + ret
	if hours !=0:
		str1 = " hour" if hours == 1 else " hours"
		if andVal:
			ret = str(hours) + str1 + ", " + ret
		else:
			andVal=True
			ret = str(hours) + str1 + " and " + ret
	if difference.days !=0:
		str1 = " day" if difference.days == 1 else " days"
		if andVal:
			ret = str(difference.days) + str1 + ", " + ret
		else:
			ret = str(difference.days) + str1 + " and " + ret
	return ret

def main():
	run_wsgi_app(app)

if __name__ == '__main__':
	main()
