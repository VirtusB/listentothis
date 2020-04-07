<?php
require_once 'functions.php';
logVisit();
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
    <link rel="manifest" href="site.webmanifest">

    <meta name="description" content="Listen to playlists of the top songs posted on r/listentothis">

    <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="materialize/css/materialize.min.css">
    <link rel="stylesheet" href="css/style.css">
    <title>Listen To This</title>
</head>
<body>
<nav id="nav" class="light-blue lighten-1" role="navigation">
    <div class="nav-wrapper container">

        <a id="logo-container" href="/" class="brand-logo center">
            <span id="logo-title">Listen To This</span>
<!--            <i class="material-icons">album</i>-->
            <i class="material-icons">🎧</i>
        </a>

    </div>
</nav>



<main id="main">

    <div class="container">
        <div class="row">
            <div class="col s10 offset-s1" style="text-align: center">
                <img id="loader-icon" alt="Loader..." src="img/loader.gif" style="max-height: 52px; vertical-align: middle;">

                <div id="content" style="display: none;">
                    <p>🎶 Play the song and the rest will automatically play afterwards 🎶</p>

                    <div class="row">
                        <div class="input-field col s6 offset-s3">
                            <div class="select-wrapper">
                                <select id="genre-select" class="browser-default">
                                    <option value="ALL_GENRES" selected>All Genres</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <iframe id="video-iframe" width="800" height="500"
                            allow="autoplay; encrypted-media; fullscreen"
                            src="">
                    </iframe>
                    <p>🎶 Songs are loaded from “Hot” on r/listentothis 🎶</p>
                </div>
            </div>
        </div>
    </div>

</main>


<footer id="footer" class="page-footer orange">
    <div class="container" style="text-align: center">
        <div class="row">
            <div class="col l6 s12">
                <h5 class="white-text">Listen To This</h5>
                <p class="grey-text text-lighten-4">Find music you haven't heard before</p>

            </div>
            <div class="col l6 s12">
                <h5 class="white-text">Subreddit</h5>
                <ul>
                    <li><a class="white-text" target="_blank" href="//reddit.com/r/listentothis">r/listentothis</a></li>
                </ul>
            </div>
        </div>
    </div>
</footer>

    <script src="js/jquery.min.js"></script>
    <script src="materialize/js/materialize.min.js"></script>
    <script src="js/main.js"></script>
</body>
</html>