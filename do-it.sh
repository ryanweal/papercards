#!/bin/bash

echo "Make sure server on port 3082 and that cards/dist exists"
echo "not sure how? try this: npx http-server -p 3082 ./cards/dist"

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