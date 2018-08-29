// .env
require("dotenv").config();

//Import keys.js and store it inside of a variable
var keys = require("./keys");
var fs = require("fs");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");

var movieName = process.argv[3];
var liriAnswer = process.argv[2];
var Spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//Commands for Liri
switch (liriAnswer) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

};

//Command (my-tweets)
function myTweets() {
    var tweet = { screen_name: "Jackie94573448" };
    client.get("statuses/user_timeline", tweet, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
            };
        } else {
            console.log("error: " + err);
            return;
        };

    });
};


//Command (spotify-this-song)
function spotifyThisSong(trackName) {

    var trackName = process.argv[3];

    if (!trackName) {
        trackName = "The Sign";
    }

    songRequest = trackName;
    Spotify.search({ type: "track", query: songRequest }, function (err, data) {
        // console.log(data.tracks.items[0].album.name)


        if (!err) {
            var trackResponse = data.tracks.items;



            for (var i = 0; i < 5; i++) {
                if (trackResponse[i] != undefined) {



                    var spotifyOutput = 
                        "Artist: " + trackResponse[i].album.artists[0].name + "\n" + 
                        "Song: " + trackResponse[i].name + "\n" +
                        "Preview Link: " + trackResponse[i].preview_url + "\n" +
                        "Album: " + trackResponse[i].album.name + "\n"
                    console.log(spotifyOutput);



                } else {
                    console.log("error: " + err);
                    return;
                }
            };
        };

        //Command (movie-this)
        function movieThis() {
            var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=6547b013";

            request(queryUrl, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    var movieData = JSON.parse(body);
                    var queryUrlResults =
                        "Title: " + movieData.Title + "\n" +
                        "Year: " + movieData.Year + "\n" +
                        "IMDB Rating: " + movieData.Ratings[0].Value + "\n" +
                        "Rotten Tomatoes Rating: " + movieData.Ratings[1].Value + "\n" +
                        "Origin Country: " + movieData.Country + "\n" +
                        "Language: " + movieData.Language + "\n" +
                        "Plot: " + movieData.Plot + "\n" +
                        "Actors: " + movieData.Actors + "\n"

                    console.log(queryUrlResults);

                } else {
                    console.log()
                }
            });
        }
    }
    )
}
