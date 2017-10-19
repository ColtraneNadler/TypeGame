import SimpleHTTPServer
import SocketServer
import time

PORT = 3000

Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
Handler.extensions_map.update({
    '.webapp': 'application/x-web-app-manifest+json',
});

httpd = SocketServer.TCPServer(("", PORT), Handler)

print "Hi!"
time.sleep(2)
print "My name is Coltrane Nadler"
time.sleep(2)
print "I will be demoing my project, 'TypeGame'"
time.sleep(3)
print "It tests how fast you can type!"
time.sleep(3)
print ""
print ""
print "I also wrote the background music"
time.sleep(3)
print "<3"
time.sleep(2)
print ""
print ""
print "Serving at port", PORT
httpd.serve_forever()
