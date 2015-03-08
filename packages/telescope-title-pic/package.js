Package.describe({
  summary: "Title Picture Module",
  version: '0.1.0',
  name: "telescope-title-pic"
});

Package.onUse(function (api) {
  console.log('Title pic initiated');

  api.versionsFrom("METEOR@0.9.0");

  api.use([
    'telescope-lib', 
    'telescope-base',
    'aldeed:autoform',
    'tap:i18n',
    'fourseven:scss',
    'templating',
    'http'
  ]);

  api.add_files([
    'package-tap.i18n',
    'lib/embedly.js'
  ], ['client', 'server']);

  api.add_files([
    'lib/server/get_embedly_data.js'
  ], ['server']);

  api.add_files([
    'lib/client/autoform-postthumbnail.html', 
    'lib/client/autoform-postthumbnail.js', 
    'lib/client/post_thumbnail.html', 
    'lib/client/post_thumbnail.js', 
    'lib/client/post_thumbnail.scss',
    'lib/client/post_video.html',
    'lib/client/post_video.js'
  ], ['client']);

  api.add_files([
    "i18n/en.i18n.json"
  ], ["client", "server"]);
});