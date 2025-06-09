import { UI } from "./UIComponents.js";
import { GenreList } from "./GenreList.js";
import { SongList } from "./SongList.js";

/**
 * @author MG Shabalala
 * @description This class is the main music player class(Facade) enabling actions between 
 * unrelated classes, particularly GenreList, SongList
 */
class MusicPlayerApp{
    #_UI = new UI();
    #_current_genre = '';
    #_CONST_TIMEOUT = 500;
    /**
     * instantiate genre class
     */
    constructor(){
        new GenreList('genres', 'genres_list');
        setTimeout(() => {
            this.selectGenreFromUI();
        }, this.#_CONST_TIMEOUT);
    }
   

    // get genreList(){ return this.#_genre_list };
    get UI(){ return this.#_UI; }
    get currentGenre(){ return this.#_current_genre; }

    set currentGenre(current_genre){
        this.#_current_genre = current_genre;
    }

    /**
     * @description select genre from the UI using genre selectors, and update song UI with the songs of the selected genre
     */
    selectGenreFromUI = async () => {
        try{
            let genres = this.UI.getAllDomeElements('genre');
            genres.forEach(genre => {
                this.#updateSongUI(genre);
            })
        }catch(error){
            console.log(error);
        }
       
    }

    /**
     * @description get the song list based on the selected genre
     * @param {string} genre is used to fetch songs
     * @returns list of songs
     */
    #updateSongUI = (genre) => {
        let song_list_id = 'song-list';
        let song_list = null;
        // new SongList(`songs/`, song_list_id);
        genre.addEventListener('click', event => {
           event.preventDefault();
           const songs = this.UI.getAllDomeElements('song');
           this.#removeAllSongsFromUI(songs);
           //select song based on the text content of the clicked genre element
            switch(event.target.textContent){
                case 'All' : 
                    song_list = new SongList(`songs/`, song_list_id);
                    break;
                case 'House' : 
                    song_list = new SongList(`songs/house`, song_list_id);
                    break;
                case 'Hiphop' : 
                    song_list = new SongList(`songs/hiphop`, song_list_id);
                    break;
                case 'Amapiano' : 
                    song_list = new SongList(`songs/amapiano`, song_list_id);
                    break;
                default:
                    // song_list = new SongList(`songs/`, song_list_id);
                    break;
            }
        });
        return song_list;
    }

    /**
     * 
     * @param {List} songs list of songs
     */
    #removeAllSongsFromUI = (songs) => {
        songs.forEach(song => song.remove());
    }
}

let musicApp = new MusicPlayerApp();



