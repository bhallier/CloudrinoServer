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

"""This handles the about page for the app."""

from google.appengine.ext import webapp

from irrduinoserver.utils import web as webutils
from irrduinoserver.utils import ui as uiutils


class AboutHandler(webapp.RequestHandler):
  def get(self):
    template_params = {}
    template_params["tabs"] = uiutils.generate_tabs("about")
    webutils.render_to_response(self, "about.html", template_params)