var gotApp = function() {
  var fs = require('fs');

  function fileActions(err, file) {
    if (err) {
      throw err;
    }

    var episodes = JSON.parse(file);
    var newEpisodes = episodes.sort(function(a, b){
      return a.episode_number-b.episode_number
    });

    var worstEpisodes = newEpisodes.filter(function (episode) {
      return episode.rating < 8.5
    });

    showEpisodes(worstEpisodes);
  }

  function showEpisodes(episodes) {
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
