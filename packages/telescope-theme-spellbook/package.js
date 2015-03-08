Package.describe({
  summary: "Telescope spellbook theme",
  version: '0.1.0',
  name: "telescope-theme-spellbook"
});

Package.onUse(function (api) {

  api.use(['fourseven:scss', 'telescope-theme-hubble'], ['client']);

  api.addFiles([
    'lib/client/stylesheets/screen.scss',
    ], ['client']);

});
