# Vim Adventures
A reverse engineered Node.js version of the Vim Adventures game.

This is not my property and is not to be used for commercial purposes this is just an experiment into how to better design commercial online games to protect creator IP.

This is a great game and if you do use it, please head to the [vim adventures](https://vim-adventures.com) page and pay the creator if you enjoy the game.

## Install Vim Adventures
To play this game you need to have NodeJS version 12 or higher installed. Behavior with older versions of NodeJS cannot be guaranteed.

### Options

There are environment variable you can use to change the default application directory and name, and the port which the application runs.

Before the install, from the project root directory, you can modify the .env the following:

* ```APP_DIR``` - the directory the application must be installed. Default - <your user directory>/vim-adventures
* ```APP_NAME``` - name you would like to export for the application. Default - vim-adventures
* ``PORT``` - the port that you want the application to run on localhost. - Default - 80

This .env file will be copied to the install install directory i.e. APP_DIR and can be updated from there after installation.

### Setup
Run ```npm install``` to get the dependencies and create the required directories and produce the executable. This project used [pkg](https://github.com/zeit/pkg) to create a binary for your system. It builds the version based on your node version, OS and OS bit version.

## Running Vim Adventures

If you changed the default directories navigate there instead of the directories explained below.

* On Windows you can navigate to your user directory and right click on the vim-adventures.exe and run as administrator if you want to access the default port 80.
* On Unix systems cd to the same location and run ```./vim-adventure``` from the terminal. You may have to sudo the command to elevate the port access. Unix systems restrict access to lower ports under 1024.

If you don't want to run the application as sudo. [Dotenv](https://github.com/motdotla/dotenv#readme) package is included you can create a .env file in the install directory and add a port for example: PORT=8080 will set the port to 8080 and you can access the application server at http://localhost:8080.

Have fun!
