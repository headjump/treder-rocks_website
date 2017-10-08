var ghpages = require('gh-pages');
var path = require('path');

console.log(
`
------------------
Publishing...`
);
ghpages.publish('build', {
  branch: 'gh-pages',
  repo: 'git@github.com:headjump/treder-rocks_website.git'
}, function(err) {
  if(err) {
    console.log("ERROR: " + err);
  } else {
    console.log("DONE :)");
  }
  console.log("------------------");
});