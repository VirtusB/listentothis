window.redditData = null;

window.youtubePosts = [];
window.genres = [];

window.addEventListener('load', () => {
    initData();
});

document.addEventListener('youtubeDataFetched', () => {
    hideLoader();
    $('#content').slideDown();

    insertGenres();
    genreSelectListener();

    setVideoIframeSrc(generatePlaylistLink(window.youtubePosts));
});

function setVideoIframeSrc(src) {
    let videoIframe = document.getElementById('video-iframe');
    videoIframe.src = src;
}

function insertGenres() {
    let genreSelect = document.getElementById('genre-select');

    window.genres.forEach(genre => {
        let option = document.createElement('option');
        option.value = genre;
        option.innerHTML = genre;
        genreSelect.insertAdjacentElement('beforeend', option);
    });
}

function genreSelectListener() {
    let genreSelect = document.getElementById('genre-select');

    genreSelect.addEventListener('change', function (e) {
        let selectedGenre = genreSelect.selectedOptions[0].value;

        if (selectedGenre === 'ALL_GENRES') {
            setVideoIframeSrc(generatePlaylistLink(window.youtubePosts));
        } else {
            let filteredPosts = window.youtubePosts.filter(p => p.data.genre.toLowerCase() === selectedGenre.toLowerCase());
            setVideoIframeSrc(generatePlaylistLink(filteredPosts));
        }
    });
}

function generatePlaylistLink(posts) {
    let link = 'https://www.youtube.com/embed/';
    let postCount = posts.length;

    posts.forEach((post, index) => {
        let id = '';
        let url = new URL(post.data.url);

        if (url.host === 'www.youtube.com' || url.host === 'youtube.com') {
            // let subId = url.search.substring(
            //     url.search.lastIndexOf("?v=") + 3,
            //     url.search.lastIndexOf("&")
            // );

            let subId = url.search.substring(
                url.search.lastIndexOf("?v=") + 3,
                url.search.indexOf("&")
            );

            if (subId === '?v=' || subId === '') {
                id = url.search.split('?v=')[1];
            } else {
                id = subId;
            }
        } else if (url.host === 'youtu.be' || url.host === 'www.youtu.be') {
            let subId = url.pathname.substring(
                url.pathname.lastIndexOf("/") + 1,
                url.pathname.lastIndexOf("&")
            );

            if (subId === '/' || subId === '') {
                id = url.pathname.split('/')[1];
            } else {
                id = subId;
            }
        }

        if (id.length !== 11) {
            return;
        }

        if (id !== '') {
            if (index === 0) {
                link += id + '?playlist=';
            } else {
                if ((index + 1) === postCount) {
                    link += id;
                } else {
                    link += id + ',';
                }
            }
        } else {
            console.log('id was false for: ' + post.data.url);
        }
    });

    return link;
}

function initData() {
    return fetch('https://listentothis.virtusb.com/cache.php')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let cacheTime = data.time;

            let nowTime = Math.round(Date.now() / 1000);

            if (nowTime - cacheTime <= 7200) {
                // less than two hours have passed, therefore return cache
                window.redditData = JSON.parse(data.redditData);
                afterInit();
            } else {
                getNewData();
            }
        });
}

function getNewData() {
    fetch('https://www.reddit.com/r/listentothis/hot/.json?limit=50')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            window.redditData = data;

            // create cache
            var formData = new FormData();
            formData.append('redditData', JSON.stringify(data));

            fetch('https://listentothis.virtusb.com/createcache.php', { method: 'POST', body: formData });

            afterInit();
        });
}

function afterInit() {
    let posts = window.redditData.data.children;
    let genresArr = [];

    posts.forEach(post => {
        if (isYouTubeVideoPost(post)) {
            let genre = getPostGenre(post);
            if (genre !== '' && genresArr.includes(genre) === false) {
                genresArr.push(genre);
            }

            post.data.genre = genre;
            window.youtubePosts.push(post);
        }
    });

    window.genres = genresArr;
    document.dispatchEvent(new Event('youtubeDataFetched'));
}

function getPostTitle(post) {
    return post.data.title;
}

function getPostGenre(post) {
    let title = getPostTitle(post);

    return title.substring(
        title.lastIndexOf("[") + 1,
        title.lastIndexOf("]")
    );
}

function hideLoader() {
    document.getElementById('loader-icon').style.display = 'none';
}

function isYouTubeVideoPost(post) {
    let firstTest = (post && post.data && post.data.media && post.data.media.type && post.data.media.type === 'youtube.com');
    let secondTest = (post && post.data && post.data.url && post.data.url.includes('youtu.be'));
    let thirdTest = (post && post.data && post.data.url && post.data.url.includes('youtube.com'));

    return firstTest === true || secondTest === true || thirdTest === true;
}