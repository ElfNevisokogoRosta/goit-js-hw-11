export default function markupCreator (arr){
   return  arr.map(({largeImageURL,webformatURL, tags, likes, views, comments, downloads})=> { return `<li class='gallery__item'>
   <a class="gallery__link" href=${largeImageURL}>
       <img class='gallery__image'
           src = ${webformatURL}
           alt = ${tags}
       />
   </a>
   <ul class="item__discription">
       <li>${likes} </li>
       <li>${views} </li>
       <li>${comments}</li>
       <li>${downloads}</li>
   </ul>
</li>`}).join('');
}
   
