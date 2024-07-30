const input = document.getElementById('input');
const button = document.getElementById('button');
const iframe = document.getElementById('iframe');
const dwnldButton = document.getElementById('download');
const url = 'https://spotify-downloader9.p.rapidapi.com/downloadSong?songId=https://open.spotify.com/track/';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '4c0dea7e65msh295be624988baf8p154aa6jsneb05dc3e991c',
        'x-rapidapi-host': 'spotify-downloader9.p.rapidapi.com'
    }
};

function extractSpotifyTrackId(url) {
    const regex = /\/track\/([a-zA-Z0-9]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function searchSong() {
    let song = extractSpotifyTrackId(input.value);
    iframe.src = `https://open.spotify.com/embed/track/${song}?utm_source=generator`;
    iframe.style.display = 'block';

    fetch(`${url}${song}`, options)
        .then(res => res.json())
        .then(res => {
            downloadSong(res);
        })
}

function downloadSong(res) {
    dwnldButton.href = res.data.downloadLink;
    document.querySelector('.download').style.display = 'flex';
}

button.addEventListener('click', searchSong);
input.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        searchSong();
    }
});