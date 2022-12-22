from http.server import BaseHTTPRequestHandler, HTTPServer

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        # Set the response status code to 200 (OK)
        self.send_response(200)

        # Set the content type to application/json
        self.send_header('Content-type', 'application/json')
        self.end_headers()

        # Write the response body as a JSON object
        self.wfile.write(b'{"message": "Hello, World!"}')