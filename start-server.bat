@echo off
cd /d "D:\Full-Stack projects\Portfolio\portfolio-backend"
start "portfolio-server" /min node dist/main > server.log 2>&1
