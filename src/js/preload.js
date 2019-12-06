import { tns } from "../../node_modules/tiny-slider/src/tiny-slider"

let carouselItems = [
    {elem:document.getElementsByClassName("carousel-item1")[0] , src:'images/content/MUTEX.jpg' , backImg : "linear-gradient(0deg, rgba(0, 0, 0, 0.85) 0%, rgba(255, 255, 255, 0) 25%) ,url('images/content/MUTEX.jpg')"} ,
    {elem:document.getElementsByClassName("carousel-item2")[0] , src:'images/content/Copy of DSC_0175 copy.jpg' ,backImg : "linear-gradient(0deg, rgba(0, 0, 0, 0.85) 0%, rgba(255, 255, 255, 0) 25%)  ,url('images/content/Copy of DSC_0175 copy.jpg') "} ,
    {elem:document.getElementsByClassName("carousel-item3")[0] , src:'images/content/WhatsApp Image 2019-11-22 at 6.56.20 PM.jpeg' , backImg : "linear-gradient(0deg, rgba(0, 0, 0, 0.85) 0%, rgba(255, 255, 255, 0) 25%)  , url('images/content/WhatsApp Image 2019-11-22 at 6.56.20 PM.jpeg') "} ,

]
let itemsFetched=0

function OnImageLoaded (item,img) {
    console.log ("The image has been loaded: " + item.src);
    item.elem.style.backgroundImage = item.backImg;
    item.elem.style.backgroundPosition = 'center';
    item.elem.style.backgroundRepeat = 'no-repeat ';
    hideLoadingAnimation()
}

function PreloadImage (item) {
    // here we preload the images to the memory
    let img = new Image ();
    img.onload = function () {OnImageLoaded (item,img)};
    img.src = item.src;
}

for (let [index,item] of carouselItems.entries() ){
    PreloadImage (item);
}

function hideLoadingAnimation() {
    itemsFetched += 1
    console.log(itemsFetched)
    if (itemsFetched === 3){
        let item = document.getElementsByClassName("loader-hide-elements-below")
        item[0].style.display = 'none';
    }
}

let slider = tns({
    "container": "#carousel",
    "items": 1,
    "mouseDrag": true,
    "controlsContainer": ".customize-controls",
    "navContainer": "#customize-dots",
    "autoplay": true,
    "autoplayTimeout": 2500,
    "autoplayButton": "#customize-toggle",
    "swipeAngle": false,
    "speed": 400,
    "lazyload": true,

});