var gotApp = function() {
  var fs = require('fs');

  function fileActions(err, file) {
    if (err) {
      throw err;
    }

    var episodes = JSON.parse(file);

    episodes.forEach(function(episode) {
      var numberOfStars = Math.floor(episode.rating);
      var stars = ' *';
      while(numberOfStars > 0) {
        stars += '*';
        numberOfStars--;
      }

      console.log(
        'Title: ' + episode.title + ' - Episode #' + episode.episode_number + "\r\n"
        + episode.description + "\r\n"
        + 'Rating: ' + episode.rating + stars + "\r\n"
      );
    });
  }
  fs.readFile("./GoTEpisodes.json", 'utf8', fileActions);
}

gotApp();
