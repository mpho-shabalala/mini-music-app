import { UI } from "./UIComponents.js";
/************************************************************************************************************* */
export class ServerFetch{

    // Private attributes
    #_base_url = 'http://localhost:5000/api/v1';
    #_extended_url = undefined;
    #_UI = new UI(); //composition
    #_isLoading = false;
    // Constructor
    constructor(extended_url){
        this.#_extended_url = extended_url;
    }

    //accessors
    get baseUrl(){ return this.#_base_url; }
    get extendedUrl(){ return this.#_extended_url; }
    get UI(){ return this.#_UI; }
    get isLoading(){return this.#_isLoading; }
    //Mutators
    set extendedUrl(extended_url){ 
        this.#_extended_url = extended_url; 
    }
    set isLoading(is_loading){ this.#_isLoading = is_loading; }

    FetchData = async extended_url => {
       const res = await fetch(`${this.baseUrl}/${extended_url}`);
       if(!res.ok) throw new Error(`Failed to fetch from this URL: ${this.baseUrl}${extended_url}`)
       const data = await res.json();
       return data;
    }

    updateFetchUIState = (isLoading, container, server_state, fetched_content_name) => {
        const text_element_id = 'text-state'
        const text = this.UI.createParagraph('', text_element_id);
        if(isLoading){
            text.textContent = 'Loading...'
            container.append(text);
        }else {
            if(server_state == 'fail'){
                text.textContent = `Failed to fetch ${fetched_content_name}`;
                container.append(text);
            }else {
                this.UI.getDomElement('p', text_element_id).remove();
            }
        }
     }


}