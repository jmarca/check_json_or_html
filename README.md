# check for html or json

this is a super tiny module, but hey, it has a stupid test

anywat, the purpose of this module is to allow me to decide on the fly
whether I should send back JSON (the preferred option) or HTML.  If a
client can accept JSON, then I send JSON.  If not, then I sent HTML.
This of course requires a template and an express app that can
render.  So if you don't have that, bad idea to use this module.

The test shows how it is used.

I needed it twice so far, so I made it a module.
