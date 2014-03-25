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

"""This module contains helpers related to user interface rendering."""

from datetime import timedelta

def generate_tabs(tab_name="watering"):
  """Take a parameter for a selected tab and generate a tab list."""
  tabs = []
  for (name, url) in (
    ("Irrigate", "/"),
    ("Log", "/log"),
    ("Reports", "/reports"),
    ("About", "/about")
  ):
    """
    ,("LawnVille", "javascript:window.open('/lawnville', 'lawnville', 'width=800, height=600, status=no, toolbar=no, menubar=no, location=no, resizable=no, scrollbars=no')")
    """
    selected = ""
    if tab_name.lower() == name.lower():
      selected = " class=selected"
    tabs.append('<li%s><a href="%s">%s</a></li>' % (selected, url, name))

  return "".join(tabs)


def localize_date(date):
  """ a quick and dirty hack for displaying time in PST
  This solution breaks as soon as we hit daylight savings.
   """
  return date + timedelta(hours=-8);