import { UI } from "./UIComponents.js";

/**
 * @author MG Shabalala
 * @description This class encapsulated actions that has to be performed on Audio element
 */
export class AudioElement{
    //private attributes
 
    #_UI = new UI();
    #_audio_element = this.UI.getDomElement('audio', 'audio-element');
    #current_song = {};
    constructor(current_song){
        this.#current_song = current_song;
    }
    //accessors
    get UI(){ return this.#_UI; }
    get audioElement(){ return this.#_audio_element; }
    get currentSong(){ return this.#current_song; }

    //mutators
    set currentSong(current_song){
        this.#current_song = current_song;
    }

    /**
     * 
     */
    updateSongElement = () => {
        const EMPTY_STRING = '';
        if(this.currentSong != undefined)
            this.audioElement.setAttribute('src', this.currentSong.src);
        else this.audioElement.setAttribute('src', EMPTY_STRING);
    }

}