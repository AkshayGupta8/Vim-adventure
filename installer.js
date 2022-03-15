const os = require('os');
const { exec } = require('pkg');

const fs = require('fs');

require('dotenv').config();

const appDir = process.env.APP_DIR || `${os.homedir()}/vim-adventures`;
const appName = process.env.APP_NAME || 'vim-adventures';

try {
  // Install the package into the directory. Using the host system and the node version installed on the machine.
  exec(['.', '--target', 'host', '--output', `${appDir}/${appName}`])
    .then(() => {
      console.log('Vim adventures successfully installed!');

      // Make save directory.
      fs.mkdirSync(`${appDir}/saved`);
      fs.copyFileSync(`${__dirname}/.env`, `${appDir}/.env`);
    })
    .catch(error => {
      console.error('An error occurred while installing vim adventures.');
    });
} catch (error) {
  console.error(`Error unable to install Vim! ${error}`);
}
