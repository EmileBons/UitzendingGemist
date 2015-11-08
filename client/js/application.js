var resourceLoader;

npoplayer = {};

App.onLaunch = function(options) {
  var javascriptFiles = [
    `${options.BASEURL}js/ResourceLoader.js`,
    `${options.BASEURL}js/Presenter.js`,
    `${options.BASEURL}js/uitzendinggemist.js`,
    `${options.BASEURL}js/Series.js`,
    `${options.BASEURL}js/Episode.js`,
    'http://ida.omroep.nl/npoplayer/i.js'
  ];

  evaluateScripts(javascriptFiles, function(success) {
    if (success) {
      resourceLoader = new ResourceLoader(options.BASEURL);

      resourceLoader.loadResource(
        `${options.BASEURL}templates/MenuBar.xml.js`,
        null,
        function(resource) {
          var doc = Presenter.makeDocument(resource);
          doc.addEventListener("select", Presenter.load.bind(Presenter));
          navigationDocument.pushDocument(doc);
        }
      )
    } else {
      throw ("Unable to evaluate scripts.");
    }
  });
}
