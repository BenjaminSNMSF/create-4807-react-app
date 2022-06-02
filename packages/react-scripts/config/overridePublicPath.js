'use strict';

const fs = require('fs');
const path = require('path');

// duplication de path.js
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

function overridePublicPath(publicUrlOrPath) {
  if (process.env.NODE_ENV === 'development') {
    return publicUrlOrPath;
  }

  const configPath = resolveApp('ci-config.json');
  if (!fs.existsSync(configPath)) {
    throw new Error(
      `Il manque le fichier ci-config.json à créer à la racine (${configPath})`
    );
  }

  const json = JSON.parse(fs.readFileSync(configPath));
  if (!json.publicUrl) {
    throw new Error(
      `Le fichier ci-config.json ne contient pas la clée publicUrl`
    );
  }
  return json.publicUrl;
}

module.exports = overridePublicPath;
