import axios from "axios";
import { Notify } from "notiflix";
const API_KEY = '28352970-95939234ba7a7257c292bac13';
const URL = `https://pixabay.com/api/`;
export default class FetchAPI{
    constructor(){
        this.q = '';
        this.page = 1;
        this.per_page = 40;
        this.totalHits = 0;
    }
    async fetchImg(){
        console.log(this);
        const options =new URLSearchParams ({
            key: API_KEY,
            q: this.q,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            per_page: this.per_page,
            page: this.page,
        });
        const url  = `${URL}?${options}`;
        console.log(axios.get(url));
        const responce = await axios.get(url);
        if(responce.data.totalHits === 0){
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
        this.incrementPage();
        this.totalHits = responce.data.totalHits;
        return responce.data.hits;
    };
    incrementPage(){
        this.page +=1;
    };
    resetPage(){
        this.page =1;
    };
    get q(){
        return this._q;
    };
    set q(newQ){
        this._q =newQ;
    };
}   
