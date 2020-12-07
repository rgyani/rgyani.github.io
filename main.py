# Copyright 2012 Digital Inspiration
# http://www.labnol.org/

import os
import logging

from google.appengine.ext import webapp
from google.appengine.ext.webapp import util
from google.appengine.ext.webapp import template
from google.appengine.api import mail

class MainHandler(webapp.RequestHandler):
  def get (self, q):
    if q is None:
      q = 'index.html'

    path = os.path.join (os.path.dirname (__file__), q)
    self.response.headers ['Content-Type'] = 'text/html'
    self.response.out.write (template.render (path, {}))
         
class ContactFormHandler(webapp.RequestHandler):
  def post(self):
    name = self.request.get("name")
    email = self.request.get("email")
    msg= self.request.get("message")
    
    err = None
    if not mail.is_email_valid(email):
      err = "Please enter valid e-mail."
    if not msg:
      err = "Please enter your message."
    if not name:
      err = "Please enter your name."
      
    if not err:
      mail.send_mail(sender="ravigyani@gmail.com", to = "ravigyani@gmail.com", subject="Message From Website " + email, body=msg)
      self.response.write('SEND')
    else:
      self.response.write(err)
	         

application = webapp.WSGIApplication ([('/(.*html)?', MainHandler), ('/ContactForm', ContactFormHandler)], debug=True)
def main ():
  util.run_wsgi_app (application)

if __name__ == '__main__':
  main ()