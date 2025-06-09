import { List } from "./ListADT.JS";
import { ServerFetch } from "./ServerFetch.js";

/**
 * @author MG Shabalala
 * @description This class fetches genre based on provided extended URL and update the UI and the list ADT
 */
export class GenreList extends ServerFetch // inharitance
{
    //private attributes
    #_current_genre = '';
    #_current_genre_id = 'current-genre';
    #_genre_element_classname = 'genre';
    //list ADT
    #_genres = new List(); // composition
    //constructor
    constructor(extended_url, genre_list_id){
        //inherit from parent class
        super(extended_url);
        this.fetchGenres(this.extendedUrl, genre_list_id);
    }

    //accessors
    get currentGenre(){ return this.#_current_genre; }
    get genres(){ return this.#_genres; }
    get currentGenreId(){ return this.#_current_genre_id; }
    get genreClassName(){ return this.#_genre_element_classname; }
    //mutators
    set currentGenre(current_genre){ 
        this.#_current_genre = current_genre;
    }

    set genres(genres){
        this.#_genres = genres;
    }


     //Higher order procedure
     fetchGenres = async (extended_url, genre_list_id) => {
        this.isLoading = true;
        const textContent_part = 'genres!!';
        try{
            //upate fetch state in the UI
            this.updateFetchUIState(
                this.isLoading, 
                this.UI.getDomElement('ul', genre_list_id),
                '',
                textContent_part);
            //get the response object of genres
            let response = await this.FetchData(extended_url);
            let genres = await response.data; //extract genre data object
            //add genres to this classes genre list
            this.addGenresToGenreList(genres);
            // throw error if list is empty 
            const genreListEmptyErrorMessage = 'genreEmpty';
            if(this.genres.isEmpty()) throw new Error(genreListEmptyErrorMessage);
            //set current genre as the first one in the list
            this.genres.moveTo(0);
            this.currentGenre = this.genres.getElement();
            //update the genres list in the UI
            this.updateGenreUI(genre_list_id);
            this.selectGenre();
        }catch(error){
            this.isLoading = false;
            try{
                this.updateFetchUIState(
                    this.isLoading, 
                    this.UI.getDomElement('ul', genre_list_id),
                    'fail', textContent_part);
            }catch(error){
                console.log('UI Error: ', error)
            }
            
        }finally{
            this.isLoading = false;
            this.updateFetchUIState(
                this.isLoading, 
                this.UI.getDomElement('ul', genre_list_id),
                '', textContent_part);
        }
     }

     addGenresToGenreList = genres => {
        for(let i = 0; i < genres.length; i++){
            this.genres.append(genres[i]);
        }
     }



    updateGenreUI = genre_container_id => {
        //get genre html ul from ui
        const genreList = this.UI.getDomElement('ul', genre_container_id)
        const genreIllustration = this.UI.createHeader('h2', 'GENRES', 'genre-illustration');
        genreList.append(genreIllustration);
        //moves to the begining of the genre list
        this.genres.front();
        for(let i = 0; i < this.genres.length(); i++){
            let genreLi = this.UI.createLI(null, this.genreClassName);
            genreLi.textContent = this.genres.getElement();
            if(this.#isCurrentGenre(genreLi.textContent)){
                genreLi.id = this.currentGenreId;
            }
            genreLi.classList = `${this.genreClassName} ${i}`;
            genreList.append(genreLi);
            this.#nextGenre();
        }
     }

     selectGenre = () => {
        try{
         let allULElements = this.UI.getAllDomeElements(this.genreClassName);
         allULElements.forEach(genreLi => {
            genreLi.addEventListener('click', event => {
                event.preventDefault();
                allULElements.forEach(genreLi => {
                    if(!this.#isCurrentGenre(genreLi)){
                        genreLi.removeAttribute('id');
                    }
                 });
                /*  move to element specified by its second className in the class list
                    which is inserted through the index when the genreLi elements were first
                    mounted to the UI
                */
                this.genres.moveTo(parseInt(genreLi.classList[1]));
                this.currentGenre = this.genres.getElement(); 
                genreLi.id = this.currentGenreId;
            });
         });
        }catch(error){
            console.log(error);
        }
     }
     #nextGenre = () => { return this.genres.next();}
     #isCurrentGenre = (genreLi) => {return (genreLi == this.currentGenre)}

}