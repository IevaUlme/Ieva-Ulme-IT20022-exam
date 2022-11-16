
<script>
import { auth } from '../stores/auth.js'
import songData from '../data/songs.js'
import { player } from '../stores/player.js'
import IconCaretUp from '../components/icons/IconCaretUp.vue'
import IconHeart from '../components/icons/IconHeart.vue'
import IconPlay from '../components/icons/IconPlay.vue'
export default {
    data() {
        return {
            search : '',
            show_favorites: false,
            sortByTtle: false,
            sortByLength: false,
            sortState: 0,
            songs: songData
        }
    },
    components: {
        IconCaretUp, 
        IconHeart,
        IconPlay
    },
    methods: {
        handleScroll(event) {
            this.$refs.header.classList.value = event.target.scrollTop > 100 ? 'scrolled' : '';
        },
        toggleFavorite(songID) {
            auth.toggleFavorite(songID)
        },
        showFavorites() {
            this.show_favorites = !this.show_favorites
            let favorites = [];
            if (this.show_favorites) {
                for (let i = 0; i < this.songs.length; i++) {
                    if (auth.favorite_songs.includes(this.songs[i].id)) {
                        favorites.push(this.songs[i]);
                    }
                }
                this.songs = favorites;
            } else {
                this.songs = songData
            }
        },
        sortBy(){

        },
        getArtists(artists) {
            var list = '';
            artists.forEach(element => {
                list = list.concat(element.name).concat(", ")
            })
            list = list.slice(0, -2)
            return list;
        },
        selectSong(song) {  
            player.setNowPlaying(song);
        },
        isFavorite(songID){
            if (auth.favorite_songs.includes(songID)) {
                return true;
            } else {
                return false;
            }
        },  
        getTime(millis) {
            let min = Math.floor(millis / 60000);
            let sec = ((millis % 60000) / 1000).toFixed(0);
            return sec == 60 ? (min+1) + ":00" : min + ":" + (sec < 10 ? "0" : "") + sec;
        }
    }
}
</script>


<template>
    <div id="songs-view" @scroll="handleScroll">
    <div class="wrapper-header">
        <h1>SONGS</h1>
        <div class="wrapper-search">
            <input v-model="search" id="input-search" placeholder="Search by title..." />
        </div>
        <div class="wrapper-settings">
            <button v-bind:class="[{ active: show_favorites }]" id="btn-show-favorites" v-on:click="showFavorites()">Show Favorites</button>
        </div>
    </div>
    <div class="wrapper-songs">
        <table cellspacing="0" cellpadding="0">
            <tr ref="header">
                <th id="th-id" >#</th>
                <th v-bind:class="[{ active: sortByTtle }]" id="th-title" v-on:click="sortBy(1)">
                    Title
                    <IconCaretUp v-if="sortByTtle == true" v-bind:class="{ 'flip-vertical': sortState === 2 }" />
                </th>
                <th id="th-artist">Artist</th>
                <th id="th-album">Album</th>
                <th v-bind:class="[{ active: sortByLength}]" id="th-duration" v-on:click="sortBy(2)">
                    Duration
                    <IconCaretUp v-if="sortByLength == true" v-bind:class="{ 'flip-vertical': sortState === 2 }"/>
                </th>
            </tr>
            <!-- Loop goes on this <tr> element -->
            <tr class="song" v-for="(song, index) in songs" :key="index" v-on:dblclick="selectSong(song)">
                <td id="td-index">
                    <IconPlay />
                    <span id="txt-index" v-text="index+1"></span>
                </td>
                <td id="td-title">
                    <img :src="song.album.images[0].url" />
                    {{song.name}}
                </td>
                <td id="td-artist" v-text="getArtists(song.artists)"></td>
                <td id="td-album">{{song.album.name}}</td>
                <td id="td-duration">
                    {{getTime(song.duration_ms)}}
                    <IconHeart v-on:click="toggleFavorite(song.id), $forceUpdate()" v-bind:class="[{ active : isFavorite(song.id)}]" :key="index"/>
                </td>
            </tr>
        </table>
    </div>
</div>
</template>