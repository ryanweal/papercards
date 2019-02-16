#!/bin/bash

# nvm installs this in .bashrc which doesn't run for non-interactive mode consoles
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

echo "This cron.sh file is provided as an example, I'm expecting the code to live in the /home/pi/code/pc2 folder."
echo "To set a cron job up, do: crontab -e"
echo "Here is an example that runs every 5min:"
echo "0,5,10,15,20,25,30,35,40,45,50,55 * * * * /home/pi/code/pc2/cron.sh"

cd /home/pi/code/pc2

/home/pi/code/pc2/do-it.sh
