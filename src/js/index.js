import ImgAPI from "./componetns/fetch";
import { Notify } from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import galleryComponents from "./componetns/galeryComponents";

const galleryEl = document.querySelector(".gallery");

const lightbox = new SimpleLightbox('.gallery a', {
    docClose: true,    
    captions: true, 
    captionSelector: 'img',
    captionsData: 'alt', 
    captionDelay: 250,
    enableKeyboard: true,
    });

const formEl = document.querySelector('#search-form');

const testBtn = document.querySelector('.test-btn')
testBtn.style.display = 'none';

formEl.addEventListener('submit', onSearchForm);
const imgAPI = new ImgAPI;
async function onSearchForm(e){
    e.preventDefault();
    testBtn.style.display = 'none';
    clearPage();
        if(e.currentTarget.elements.searchQuery.value.trim() === ""){
            e.currentTarget.reset();
            return Notify.warning('Enter valid data');
        }
        imgAPI.q = e.currentTarget.elements.searchQuery.value.trim();
        const elements = await imgAPI.fetchImg();
        addingMarkup(elements);
        if(imgAPI.totalHits !== 0){
            Notify.success(`We found ${imgAPI.totalHits} result`);
            testBtn.style.display = 'block';
        }
       
};
async function loadMore(){
    try {
        const elements = await imgAPI.fetchImg();
        addingMarkup(elements); 
        if((imgAPI.totalHits - imgAPI.page*imgAPI.per_page)<-1 ){
            Notify.warning("We're sorry, but you've reached the end of search results");
            return testBtn.style.display = 'none';
        }
    } catch (error) {
        console.log(error);
    }
  
}
function addingMarkup(elements){
    galleryEl.insertAdjacentHTML('beforeend', galleryComponents(elements));
    lightbox.refresh();
  
};
testBtn.addEventListener('click', loadMore);
function clearPage (){
    galleryEl.innerHTML ="";
}