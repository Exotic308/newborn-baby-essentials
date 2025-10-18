#!/bin/bash

echo "🚀 Starting web server for Baby Shopping List..."
echo "📂 Server running at: http://localhost:8000"
echo "🌐 Open this URL in your browser: http://localhost:8000/index.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start Python HTTP server
python3 -m http.server 8000

