const Metalsmith      = require('metalsmith');
const layouts         = require('metalsmith-layouts');
const markdown        = require('metalsmith-markdown');
const permalinks      = require('metalsmith-permalinks');
const sass            = require('metalsmith-sass');
const noop            = require('./lib/noop');
const drafts          = require('metalsmith-drafts');
const inPlace         = require('./lib/inPlace');
const path            = require('path');

const
  preview_drafts = (process.argv.indexOf("--preview-drafts") !== -1);

console.log(`
--------------------------------------------------------------------
Preview drafts? -> ${preview_drafts ? "YES" : "NO"}
                   (use "yarn build" or "yarn build-preview-drafts")
--------------------------------------------------------------------
`);

Metalsmith(__dirname)
  .metadata({
    atRoot: function (target) { return path.join(__dirname, target); },
    icon: function(icon){ return "<i class='fa fa-" + icon + "'></i>"; },
    title: "",
  })
  .source('./src')
  .destination('./build')
  .clean(true)
  .use((preview_drafts ? noop : drafts)())
  .use(inPlace({
    pattern: ["*.html*", "*.ejs*", "*.md*"],
    engineOptions: {
      "cache": false
    }
  }))
  .use(markdown())
  .use(sass())
  .use(layouts({
    engine: 'ejs'
  }))
  .use(permalinks({
    relative: false
  }))
  .build(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("DONE :)")
    }
  });