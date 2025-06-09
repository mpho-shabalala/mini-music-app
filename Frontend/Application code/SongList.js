import { List } from "./ListADT.JS";
import { ServerFetch } from "./ServerFetch.js";
import { AudioElement } from "./Audio.js";
/** 
 * @author MG Shabalala
 * @description This class fetches song objects based on provided extended URL and update the UI and the list ADT
 */
export class SongList extends ServerFetch  //inharitance
{
    //private attributes
    #_current_song = {};
    //list ADT
    #_songs = new List(); //composition
    #_song_class_name = 'song';
    #_current_song_id = 'current-song';
    #_current_audio = new AudioElement(this.#_current_song);
    //constructor
    constructor(extended_url, song_list_id){
        super(extended_url); //inherit from parent class
        this.fetchSongs(this.extendedUrl, song_list_id);
    }

    //accessors
    get currentSong(){ return this.#_current_song; }
    get songs(){ return this.#_songs; }
    get songClassName(){ return this.#_song_class_name; }
    get currentSongId(){ return this.#_current_song_id; }
    get currentAudio(){ return this.#_current_audio; }
    //mutators
    set currentSong(current_song){ 
        this.#_current_song = current_song;
    }
    set songs(songs){
        this.#_songs = songs;
    }

  

    /**
     * higher order procedure
     * fetch all songs from the server
     * @param {String} extended_url extended url to the specified route
     * @param {*} song_list_id identifies song list element in the 
     */
    fetchSongs = async (extended_url, song_list_id) => {
        this.isLoading = true;
        const textContent_part = 'songs!!';
        try{
            this.updateFetchUIState(
                this.isLoading, 
                this.UI.getDomElement('ul', song_list_id),
                '', textContent_part);
            let response = await this.FetchData(extended_url);
            let songs = await response.data;
            this.songs.clear();
            for(let i = 0; i < songs.length; i++){
                this.songs.append(songs[i]);
            }
            const emptySongListErrorMessage = 'Song list empty';
            if(this.songs.isEmpty()) throw new Error(emptySongListErrorMessage);
            this.updateSongsUI(song_list_id);
            //listen to events and update the application state
            this.selectSong();
            this.previousSongBtnClick();
            this.nextSongBtnClick();
            this.stopSong();
            this.songInforBtnClick();
            
        this.#styleSongInformationUI();
        }catch(error){
            console.log(error);
            this.isLoading = false;
            try{
                this.updateFetchUIState(
                    this.isLoading, 
                    this.UI.getDomElement('ul', song_list_id),
                    'fail', textContent_part);
            }catch{
                console.log(error)
            }
        }finally{
            this.isLoading = false;
            this.updateFetchUIState(
                this.isLoading, 
                this.UI.getDomElement('ul', song_list_id),
                '', textContent_part);
        }
       
    }

    /**
     * 
     */
    updateSongsUI = (song_list_id) => {
        const songList = this.UI.getDomElement('ul', song_list_id);
        this.songs.front(); //moves to the front of the list
        for(let i = 0; i < this.songs.length(); i++){
           let songLi = this.createSongLi(this.songs.getElement());
           songLi.classList = `song ${i}`; //add the index to the class list 
           songList.append(songLi);
           this.#nextSong();
        }
    }

    createSongLi = song => {
        let songIMG = this.UI.createImg(song.img);
        let div = this.UI.createDiv();
        let songTitle = this.UI.createParagraph(song.title);
        let artistsList = this.UI.createUL(null,'artist-list');
        let artistsArray = song.artists;
        for(let i = 0; i < artistsArray.length; i++){
            if(i !== (artistsArray.length - 1)){
                artistsList.append(`${artistsArray[i]},`);
            }else {
                artistsList.append(artistsArray[i]);
            }
        }
        div.append(songTitle, artistsList);
        let songLi = this.UI.createLI(null, this.songClassName);
        songLi.append(songIMG,div);
        return songLi;
    }

    selectSong = () => {
        try{
            let allSongs = this.UI.getAllDomeElements(this.songClassName);
            allSongs.forEach(songLi => {
                songLi.addEventListener('click', event => {
                    event.preventDefault();
                    allSongs.forEach(songLi => {
                        if(this.#isCurrentSong(songLi)){
                            songLi.removeAttribute('id');
                        }
                   });
                   /*  move to element specified by its second className in the class list
                       which is inserted through the index when the songLi elements were first
                       mounted to the UI
                   */
                    this.songs.moveTo(parseInt(songLi.classList[1]))
                    this.currentSong = this.songs.getElement();
                    songLi.id = this.currentSongId;
                    // update song element with new link of curent song
                    this.currentAudio.currentSong = this.currentSong;
                    this.currentAudio.updateSongElement();
                });
            });
        }catch(error){
            console.log(error);
        }
    }

    previousSongBtnClick = () => {
        const PREVIOUS_SONG_BTN_ID = 'prev-song';
        const previousSongBtn = document.getElementById(PREVIOUS_SONG_BTN_ID);
        const INITIAL_POSITION = 0;
        previousSongBtn.addEventListener('click', event => {
            event.preventDefault();
            if(this.songs.currPos() > INITIAL_POSITION){
                this.#previousSong();
                this.currentSong = this.songs.getElement();
                this.#updateSongListUIByCurrentAudio();
                // update song element with new link of curent song
                this.currentAudio.currentSong = this.currentSong;
                this.currentAudio.updateSongElement();
                this.#setInformationDisplayStatus(event, PREVIOUS_SONG_BTN_ID);
            }
        });
    }

    #setInformationDisplayStatus = (event, targetId) => {
        if(this.#isSongInformationDisplayed()){
            this.#removeSongInformationDisplay();
            this.#addSongInformationDisplay();
        }else{
            if(this.#isInformationDisplayerButtonEvent(event, targetId)){
                this.#addSongInformationDisplay();
            }else{
                this.#removeSongInformationDisplay();
            }
        }
    }

    #isInformationDisplayerButtonEvent = (event, targetId) => {
        console.log(event.target.id == targetId)
        return (event.target.id == targetId);
    }

    songInforBtnClick = () => {
        const SONG_INFO_BTN_ID = 'song-info';
        const songInforBtn = document.getElementById(SONG_INFO_BTN_ID);
        songInforBtn.addEventListener('click', event => {
            event.preventDefault();
            let songInfoBtnImg = document.getElementById('song-info-img');
            // songInfoBtnImg.style.cssText = `transform: rotate(180deg);`;
            console.log(songInforBtn);
            this.#setInformationDisplayStatus(event, SONG_INFO_BTN_ID);
        });
    }

    #addSongInformationDisplay = () => {
        const MUSIC_PLAYER_BODY_ID = 'music-player-app';
        const appBody = document.getElementById(MUSIC_PLAYER_BODY_ID)
        const songInfoContainer = this.#songInformationUI();
        appBody.append(songInfoContainer);
    }

    #songInformationUI = () => {
        const SONG_INFO_CONTAINER = 'song-info-container';
        const INNER_CONTAINER = 'inner-info';
        const TITLE_SONG_INFO = 'title-song-info';
        const IMG_SONG_INFO = 'img-song-info';
        const container = this.UI.createDiv(SONG_INFO_CONTAINER);
        const innerContainer = this.UI.createDiv(INNER_CONTAINER);
        this.#handleInvalidCurrentSong();
        const songTitle = this.UI.createHeader('h3', this.currentSong.title, TITLE_SONG_INFO);
        const songIMG = this.UI.createImg(this.currentSong.img, 'Current song image here', IMG_SONG_INFO);
        const songGenre = this.UI.createParagraph(`Genre : ${this.currentSong.genre}`);
        const artistsUL = this.UI.createUL('artists-list');
        for(let i = 0; i < this.currentSong.artists.length; i++){
            let artistLi = this.UI.createLI('artist');
            artistLi.textContent = `${this.currentSong.artists[i]},`;
            artistsUL.append(artistLi);
        }
        innerContainer.append(songTitle, songIMG, songGenre, artistsUL);
        container.append(innerContainer);
        return container;

    }

    #styleSongInformationUI = () => {
        const audioDiv = this.UI.getDomElement('div', 'audio-element-div');
        audioDiv.addEventListener('onload', event => {
            console.log('event', event);
        })
    }

    #handleInvalidCurrentSong = () => {
        if(this.currentSong == undefined) throw new Error('Current song is Not defined');
    }

    #isSongInformationDisplayed = () => {
        return (document.getElementById('music-player-app').lastChild.nodeName == 'DIV');
    }

    #removeSongInformationDisplay = () => {
        document.getElementById('song-info-container').remove();
    }

    nextSongBtnClick = () => {
        const NEXT_SONG_BTN_ID = 'next-song';
        const nextSongBtn = document.getElementById(NEXT_SONG_BTN_ID);
        nextSongBtn.addEventListener('click', event => {
            event.preventDefault();
            if(this.songs.currPos() < this.songs.length() - 1){
                this.#nextSong();
                this.currentSong = this.songs.getElement();
                this.#updateSongListUIByCurrentAudio();
                // update song element with new link of curent song
                this.currentAudio.currentSong = this.currentSong;
                this.currentAudio.updateSongElement();
                this.#setInformationDisplayStatus(event, NEXT_SONG_BTN_ID);
            }
        });
    }

    stopSong = () => {
        const NO_SONG_POSITION = -5;
        const stopSongBtn = document.getElementById('stop-song');
        stopSongBtn.addEventListener('click', event => {
            event.preventDefault();
            this.songs.moveTo(NO_SONG_POSITION);
            this.currentSong = this.songs.getElement();
            this.#updateSongListUIByCurrentAudio();
             // update song element with new link of curent song
             this.currentAudio.currentSong = this.currentSong;
             console.log(this.currentAudio.currentSong);
             this.currentAudio.updateSongElement();
             this.#setInformationDisplayStatus();
             this.#handleInvalidCurrentSong();
        });
    }

    //private procedures and functions
    #updateSongListUIByCurrentAudio = () => {
        const allSongs = this.UI.getAllDomeElements('song');
        allSongs.forEach(songLi => {
            if(songLi.classList[1] == this.songs.currPos()){
                songLi.id = this.currentSongId;
            }else {
                songLi.removeAttribute('id');
            }
        });
    }

    #isCurrentSong = songLi => {
        return (songLi.id == this.currentSongId);
    }

    #nextSong = () => {
        return this.songs.next();
    }

    #previousSong = () => {
        return this.songs.prev();
    }
}