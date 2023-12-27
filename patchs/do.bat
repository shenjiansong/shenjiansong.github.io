@echo off
rem set BP=%~dp0build
cd %~dp0
echo .
echo ¿ªÊ¼£º
set /p sn=
echo ½áÊø£º
set /p en=

for /l %%v in (%sn%,1,%en%) do (echo %%v >>p%%v.ptc)
echo done;
pause