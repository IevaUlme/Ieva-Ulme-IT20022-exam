import { reactive } from 'vue'

export const player = reactive({
    playlist   : [],
    now_playing: {}, // SONG OBJECT
    setPlaylist(songs) {
        this.playlist = songs.slice();
    },
    setNowPlaying(song) {
        this.now_playing = song;
    },
    getNowPlayingSongId() {
        return this.now_playing?.id;
    },
    getNowPlaying() {
        return this.now_playing;
    },
    getNowPlayingAlbumID() {
        return this.now_playing?.album?.id ?? null;
    },
    getNowPlayingSongName() {
        return this.now_playing?.name ?? '';
    },
    getNowPlayingSongImage() {
        return this.now_playing?.album?.images[1].url ?? '';
    },
    getNowPlayingArtists() {
        return this.now_playing?.artists?.map(artist => artist.name).join(', ');
    },
    getNowPlayingSongPreview() {
        return this.now_playing?.preview_url;
    },
    getNextSong(){
       const index = this.playlist.map(song => song.id).indexOf(getNowPlayingSongId());

       if(this.playlist[index+1] == -1){
            return false;
       }
       return this.playlist[index+1];
    },
    getPreviousSong() {
        const index = this.playlist.map(song => song.id).indexOf(getNowPlayingSongId());

        if(this.playlist[index] == 0){
            return false;
       }
       return this.playlist[index-1];
    },
    resetNowPlaying() {
        this.now_playing = {};
    }
})