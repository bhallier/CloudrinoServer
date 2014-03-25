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

"""This module contains the routing for the application."""

from irrduinoserver.handlers.abouthandler import AboutHandler
from irrduinoserver.handlers.lawnvillehandler import LawnVilleHandler
from irrduinoserver.handlers.reportshandler import ReportsHandler
from irrduinoserver.handlers.irrigatehandler import IrrigateHandler
from irrduinoserver.handlers.loghandler import LogHandler

ROUTES = [
  ('/', IrrigateHandler),
  ('/reports', ReportsHandler),
  ('/log', LogHandler),
  ('/about', AboutHandler),
  ('/lawnville', LawnVilleHandler),
]