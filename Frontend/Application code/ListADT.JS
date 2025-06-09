/**
 * GENERIC LIST DATA STRUCTURE
 */
 export class List{
    _listSize = 0;
    _pos = 0;
    _dataStore = []; // main data storage initialized as empty array


    /**
     * returns the length of this list
     */
    length(){
        return this._listSize;
    }


    /**
     * This function append an element to the existing list, and increment the size by one
     * @param {listElement} element 
     */
    append(element){
        this._dataStore[this._listSize++] = element;
    }

    /**
     * use linearSearch algorithm to find a specified element in the datastorage
     * @param {listElement} element 
     * @returns true if element exists , false if not
     */
    remove(element){
        const foundAt = this.find(element);  // returns the location of the element
        if(foundAt > -1){
            this._dataStore.splice(foundAt, 1);
            --this._listSize;
            return true; 
        }
        return false;
    }


    /**
     * 
     * @param {listElement} element 
     * @param {listElement} after position indicator element, the element will be inserted after the 'after' element
     * @returns 
     */
    insert(element,after){
        const insertPos = this.find(after);
        if(insertPos > -1){
            this._dataStore.splice(insertPos + 1, 0, element);
            ++this._listSize;
            return true;
        }
        return false;
    }

    /**
     * clears the list by removing all the elements in the dataStorage and updating length and position to zero
     */
    clear(){
        delete this._dataStore;
        this._dataStore = [];
        this._pos = this._listSize = 0;
    }

    /**
     * 
     * @param {listElement} element 
     * @returns true if element has been found, and false if not (linear search)
     */
    constains(element){
        for(let i = 0; i < this._dataStore.length; i++){
            if(this._dataStore[i] == element) return true;
        }
        return false;
    }

    /**
     * 
     * @returns a array representation of items stored in this list data structure
     */
    toString(){
        return this._dataStore;
    }

    // traversing the list

    /**
     * @description is a list traversing element, moves to the start of the list
     */
    front(){
        this._pos = 0;
    }

    
    /**
     * @description is a list traversing element, moves to the end of the list
     */
    end(){
        this._pos = this._listSize - 1;
    }
     /**
     * @description is a list traversing element, moves one step back
     */
    prev(){
        if(this._pos > 0){
            --this._pos;
        }
    }

    /**
     * @description is a list traversing element, moves one step forward
     */
    next(){
        if(this._pos < this._listSize - 1) {
            ++this._pos;
        }
    }

    /**
     * 
     * @returns current position
     */
    currPos(){
        return this._pos;
    }

    /**
     * @description moves to the location provided by the integer parameter
     * @param {integer} position 
     */
    moveTo(position){
        this._pos = position;
    }

    /**
     * 
     * @returns element in the current position
     */
    getElement(){
        return this._dataStore[this._pos];
    }

    isEmpty(){
        return (this._listSize == 0)
    }



    //UTILITIES

    /**
     * Linear search algorithm to find the index of a given element in the existing dataStorage
     * @param {listElement} element 
     * @returns index or -1(if no element matches the one you are looking for)
     */
    find(element){
        for(let i = 0; i < this._dataStore.length; i++){
            if(this._dataStore[i] == element) return i;
        }
        return -1
    }
}