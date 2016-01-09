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
    searchFor('Jon Snow', episodes);
  }

  function searchFor(name, array) {
    array.forEach(function(episode) {
      var str = episode.description;
      var idx = str.indexOf(name);
      if(idx !== -1){
        console.log(name + ' appears on episode ' + episode.episode_number);
      }else{
        console.log(name + ' is not there!');
      }
    })

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
