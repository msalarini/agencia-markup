@echo off
set "PATH=%PATH%;C:\Program Files\Git\bin;C:\Program Files\Git\cmd"
git add .
git commit -m "refactor: clean code and remove extras"
echo Done!
pause
