#!/bin/bash

echo "Make sure nginx or another server is running on port 80 and serving the static cards/dist folder"

node render/weather.js
convert output/weather.png -depth 1  ppm:- | pnmdepth 1 | ppmtobmp >output/weather.bmp

# I copied the epd-library-python example main.py and reduced it to just the
# code to display one image, called weather.bmp. I have a symlink there
# pointing to output/weather.bmp

FILE=/home/pi/code/epd-library-python/2.13inch_e-paper/raspberrypi/python
if [ ! -f $FILE ]; then
   cd $FILE
   python new2.py
else
   echo "Could not find epd-python-library at $FILE. Flash the display yourself somehow."
fi