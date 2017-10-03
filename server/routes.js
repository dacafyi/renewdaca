const path = require('path')
const fs = require('fs');

const express = require('express');
const router = express.Router();

let configJson = {};
try {
  configJson = require('./config.json');
} catch (err) {
}
const packageJson = require('./../package.json');
const states = require('./../public/models/states.js');

const defaultColor = '#000';
const defaultLocale = 'en';
const defaultLocaleFull = 'en-US';
const defaultVersion = '0.0.0';

let manifest = {
  default_locale: configJson.default_locale || packageJson.default_locale || configJson.defaultLocale || packageJson.defaultLocale || defaultLocale,
  default_locale_full: configJson.default_locale_full || packageJson.default_locale_full || configJson.defaultLocaleFull || packageJson.defaultLocaleFull || defaultLocaleFull,
  name: configJson.product_name || packageJson.product_name || configJson.productName || packageJson.productName || configJson.name || packageJson.name,
  short_name: configJson.short_name || configJson.shortName || packageJson.short_name || packageJson.shortName,
  description: configJson.description || packageJson.description,
  theme_color: configJson.theme_color || packageJson.theme_color || configJson.themeColor || package.json.themeColor || defaultColor,
  background_color: configJson.background_color || packageJson.background_color || configJson.backgroundColor || package.json.backgroundColor,
  tile_color: configJson.tile_color || packageJson.tile_color || configJson.tileColor || packageJson.tileColor || defaultColor,
  homepage: configJson.homepage || packageJson.homepage,
  twitter_account: configJson.twitter_account || packageJson.twitter_account || configJson.twitterAccount || packageJson.twitterAccount,
  version: configJson.version || packageJson.version || defaultVersion
};
if (!manifest.short_name) {
  manifest.short_name = manifest.name;
}
if (!manifest.background_color) {
  manifest.background_color = manifest.theme_color;
}
if (!manifest.tile_color) {
  manifest.tile_color = manifest.background_color;
}

const indexPage = stateActive => (req, res) => {
  let ctx = {};
  Object.assign(ctx, manifest, {
    stateActive: stateActive,
    states: states.getList(),
    statesMapData: states.getMapData()
  });
  res.render('index', ctx);
};

/* GET home page. */
router.get('/', (req, res) => {
  let stateActive = 'California';
  return indexPage(stateActive)(req, res);
});

// router.get('/', (req, res) => {
//   return indexPage(state)(req, res);
// });

/* GET Service Worker. */
router.get('/sw.js', (req, res) => {
  let fileContents = fs.readFileSync(path.join(__dirname, 'service-worker.js'), 'utf-8');

  fileContents = fileContents.replace('{{stylesPath}}', req.app.locals.getVersionedPath('/style.css'));
  fileContents = fileContents.replace('{{scriptsPath}}', req.app.locals.getVersionedPath('/main-compiled.js'));

  res.set('Content-Type', 'application/javascript; charset=utf-8');
  res.send(fileContents);
});

/* GET manifest. */
router.get('/manifest.webmanifest', (req, res) => {
  let fileContents = fs.readFileSync(path.join(__dirname, 'manifest.webmanifest'), 'utf-8');

  Object.keys(manifest).forEach(key => {
    fileContents = fileContents.replace('{{' + key + '}}', manifest[key]);
  });

  let fileJson = null;
  let fileJsonPretty = fileContents;
  try {
    fileJson = JSON.parse(fileContents);
  } catch (err) {
  }

  if (fileJson && fileJson.icons) {
    Object.keys(fileJson).forEach(key => {
      const item = fileJson[key];
      if (typeof item === 'object') {
        item.forEach((child, idx) => {
          if (!child || !child.src) {
            return;
          }
          fileJson[key][idx].src = req.app.locals.getVersionedPath(child.src);
        });
      }
    });
  }

  if (fileJson) {
    fileJsonPretty = JSON.stringify(fileJson, null, 2);
  }

  res.set('Content-Type', 'application/manifest+json; charset=utf-8');
  res.send(fileJsonPretty);
});

/* GET manifest. */
router.get('/browserconfig.xml', (req, res) => {
  let fileContents = fs.readFileSync(path.join(__dirname, 'browserconfig.xml'), 'utf-8');

  fileContents = fileContents.replace('{{tile_color}}', manifest.tile_color);

  fileContents = fileContents.replace('src="/icons/mstile-150x150.png"',
    `src="${req.app.locals.getVersionedPath('/icons/mstile-150x150.png')}"`);

  res.set('Content-Type', 'application/xml; charset=utf-8');
  res.send(fileContents);
});

module.exports = router;
