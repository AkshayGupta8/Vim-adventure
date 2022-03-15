const express = require('express');
const moment = require('moment');

const router = express.Router();
const fs = require('fs');
const path = require('path');
const os = require('os');

// The user could have an appDir and not appName so we have to make sure we get the full path.
const appDir = process.env.APP_DIR || os.homedir();
const appName = process.env.APP_NAME || '/vim-adventures';
const appPath = `${appDir}/${appName}`;
const snapshotDir = path.resolve(`${__dirname}/..`);

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Vim Adventures'
  });
});

router.get('/levels/:level', (req, res) => {
  try {
    const levelData = fs.readFileSync(`${snapshotDir}/levels/new/${req.params.level}.json`, 'utf8');

    return res.send(levelData);
  } catch (error) {
    console.error('An error occurred while trying to load level', req.params.level, error);

    if (error.code === 'ENOENT') return res.status(401).send('The level you chose is invalid!');

    return res.status(500).send(error.message);
  }
});

router.get('/levels/load/:level', (req, res) => {
  try {
    const savedData = fs.readFileSync(
      `${snapshotDir}/levels/load/${req.params.level}.json`,
      'utf8'
    );

    return res.send(savedData);
  } catch (error) {
    console.error(
      `An error occurred while trying to retrieve level: ${req.params.level}.json`,
      error
    );

    if (error.code === 'ENOENT') return res.status(401).send('The level you chose is invalid!');

    return res.status(500).send(error.message);
  }
});

router.get('/saved/:name', (req, res) => {
  try {
    const savedData = fs.readFileSync(`${appPath}/saved/${req.params.name}.json`, 'utf8');

    return res.send(savedData);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return res
        .status(401)
        .send('Unable to find the save provided. Please check your saves and try again.');
    }

    return res.status(500).send(error.message);
  }
});

router.post('/saved/:name', (req, res) => {
  try {
    fs.writeFileSync(`${appPath}/saved/${req.params.name}.json`, req.body.state_string, 'utf8');

    res.sendStatus(201);
  } catch (error) {
    console.error('An error occurred while trying to save.', error);

    res.status(500).send(error.message);
  }
});

router.get('/saves', (req, res) => {
  try {
    const saveFiles = fs.readdirSync(`${appPath}/saved`, 'utf8', true);
    let template = fs.readFileSync(`${snapshotDir}/templates/saved-games.txt`, 'utf8');

    template += `${'NAME'.padEnd(20)}DATE\n\r`;
    // Sort saved data by newest to oldest
    saveFiles.sort(
      (a, b) =>
        fs.statSync(`${appPath}/saved/${b}`).birthtimeMs -
        fs.statSync(`${appPath}/saved/${a}`).birthtimeMs
    );

    if (saveFiles !== undefined) {
      saveFiles.forEach(fileName => {
        const fileData = fs.statSync(`${appPath}/saved/${fileName}`, 'utf8');
        // Remove the .json and concat the date created for each file.
        template += `\r\n${fileName.slice(0, fileName.indexOf('.')).padEnd(20)} ${moment(
          fileData.birthtimeMs
        ).format('LLLL')}`;
      });
    }

    return res.send(template);
  } catch (error) {
    console.error(`An error occurred while trying to get saved game list: `, error);
    // If there is no save file we need to tell the user what happened.
    if (error.code === 'ENOENT')
      return res.send('No saves available! Please make a save to use this option.');

    return res.send(error.message);
  }
});

router.delete('/saved/:name', (req, res) => {
  try {
    fs.unlinkSync(`${appPath}/saved/${req.params.name}.json`, 'utf8');

    return res.status(200).send(`${req.params.name} save deleted successfully!`);
  } catch (error) {
    console.error(`An error occurred while trying to delete saved game: ${req.params.name}`, error);

    if (error.code === 'ENOENT') {
      return res
        .status(401)
        .send('Unable to find the save provided. Please check your saves and try again.');
    }

    return res.send(`An error occurred deleting save. Check logs for more information`);
  }
});

module.exports = router;
