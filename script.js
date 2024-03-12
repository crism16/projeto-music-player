const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previus = document.getElementById('previus');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');

const euSouAMareViva = {
    songName : 'Eu sou a maré viva',
    artist : 'Fresno',
    file : 'eu sou a maré viva',
    music : 'Eu sou A Maré Viva'
};
const Manifesto = {
    songName : 'Manifesto feat Lenine e Emicida',
    artist : 'Fresno',
    file : 'capa manifesto',
    music : 'Manifesto (feat. Lenine e Emicida)'
};
const OUnicoAPerder = {
    songName : 'O Único a perder',
    artist : 'Fresno',
    file : 'o unico a perder',
    music : 'O Único A Perder'
};
let isPlaying = false;
const playlist = [euSouAMareViva,Manifesto,OUnicoAPerder];
let index = 0;

function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong(){
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
}

function playPauseDecider(){
    if(isPlaying === true){
        pauseSong();
    }
    else{
        playSong();
    }
}

function initializesong(){
    cover.src = `imagens/${playlist[index].file}.jpg`;
    song.src = `songs/${playlist[index].music}.mp3`;
    songName.innerText = playlist [index].songName;
    bandName.innerText = playlist [index].artist;
    
}
function previusSong(){
    if (index ===0){
        index = playlist.length - 1;
    }
    else {
        index -= 1;
    }
    initializesong();
    playSong();
}

function nextSong(){
    if (index === playlist.length - 1){
        index = 0;
    }
    else {
        index += 1;
    }
    initializesong();
    playSong();
}

function updateProgressBar(){
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
}

function jumpTo(event){
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)* song.duration;
    song.currentTime = jumpToTime;
}

initializesong();

play.addEventListener('click', playPauseDecider);
previus.addEventListener('click',previusSong);
next.addEventListener('click',nextSong);
song.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click',jumpTo);

