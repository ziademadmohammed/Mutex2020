import '../scss/app.scss';
require('waypoints/lib/noframework.waypoints.min');
import { CountUp } from 'countup.js'

let itemsToAnimate = [
    [
        ...document.querySelector('#aboutSection > div.underline-heading ').children,
    ],
    [
        ...document.querySelectorAll('#VMGContainer > div'),
    ],
    [
        ...document.querySelector('#LPNPSection > div.underline-heading').children,
    ],
    [
        ...document.querySelectorAll('#LPNPContainer > div'),
    ],
    [
        ...document.querySelector('#STATISTICS > div.underline-heading').children,
    ],
    [
        ...document.querySelector('#STATISTICS > div:nth-child(2) > div').children,
    ],
]

let speakersImages= {
    2017 : [
        'images/content/speakers/17/Amr Abulnaga(The Regional Technical Consultant at Oracle).jpg',
        'images/content/speakers/17/Ghada Bahig (Engineering Manager at Mentor Graphics).jpg',
        'images/content/speakers/17/Amr Ali (Big data and Analytics Technical Consultant at Oracle).jpg',
        'images/content/speakers/17/Omar Amer (Machine Learning Engineer at IBM).jpg',
    ],
    2018 : [
        'images/content/speakers/18/Ahmed Abd-Elfattah(Knowledge Management Manager at Valeo).jpg',
        'images/content/speakers/18/Ahmed Said (IBM).jpg',
        'images/content/speakers/18/Ayman Ragab(Consultant in The R_D Department at NTRA).jpg',
        'images/content/speakers/18/Mohamed Abd-Elmonem(Radio Optimization Senior Engineer at Vodafone).jpg',
        'images/content/speakers/18/Mostafa Helmy( Identity _ Access Management Advisor at RSA Security).jpg',
        'images/content/speakers/18/Nahel Mohamed (Innovation Support Manager at TIEC).jpg',
        'images/content/speakers/18/Oriette M. Nayel (University Relations Leader at IBM).jpg',
        'images/content/speakers/18/Peter George(Senior Analyst at RSA Security).jpg',

    ],
    2019 : [
        'images/content/speakers/19/Abdalla Amr ( TIEC Ambassador).jpg',
        'images/content/speakers/19/Ahmed Samir ( Enterprise Technical Services Advisor@Dell EMC).jpg',
        'images/content/speakers/19/Amir Elsenousy ( Research projects manager @ NTRA ).jpg',
        'images/content/speakers/19/Bassem Ibrahim(Network solutions architect @ Ericsson).jpg',
        'images/content/speakers/19/Ebeid Atef (Microsoft Education Technical).jpg',
        'images/content/speakers/19/Hesham Elzoghby (Cyber Talents).jpg',
        'images/content/speakers/19/Hesham Eraqi ( Deep learning Secnior expert @Valeo).jpg',
        'images/content/speakers/19/Mohamed Elgharably ( Networks chief technology officer@Ericsson).jpg',
    ]
}

// Your JS Code goes here

//On Scroll Functionality
window.addEventListener('scroll',() => {
    let windowTop = window.pageYOffset;
    windowTop > 100 ? document.querySelector('nav').classList.add('navShadow') :
                      document.querySelector('nav').classList.remove('navShadow');
});

let smoothScroll = document.querySelectorAll('a[href*="#"]')
for (let temp of smoothScroll){
    temp.addEventListener('click',anchorLinkHandler)
}


//Toggle Menu
let menuToggle = document.getElementById('menu-toggle')
let showMenu = document.getElementById('show-menu')
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('closeMenu');
    showMenu.classList.toggle('showMenu');

    for (let child of showMenu.children){
        child.addEventListener('click', () => {
            showMenu.removeClass('showMenu');
            menuToggle.removeClass('closeMenu');
        });
    }
});

let speakerDiv = document

let generateSpeakerHtml = function (speaker) {
    let container = document.createElement('div')
    let subContainer = document.createElement('div')
    let speakerName = document.createElement('p')
    let speakerJop = document.createElement('p')
    speakerName.appendChild( document.createTextNode(speaker.name ) );
    speakerJop.appendChild( document.createTextNode(speaker.jop ) )

    subContainer.appendChild(speakerName)
    subContainer.appendChild(speakerJop)
    container.appendChild(subContainer)
    container.style.backgroundImage = `url('${speaker.image}')`
    console.log(`url(${speaker.image})`)
    // container.style.backgroundColor = 'red'

    return container
}
let addToDom = function(selector,elemToAdd){
    let elem = document.querySelector(selector)
    elem.appendChild(elemToAdd)


}

let generateSpeakers = function () {
    for (let [key,arr] of Object.entries(speakersImages)){

        arr.forEach(function (item) {
            let [name , jop] = getNameAndJop(item)
            // console.log(item)
            let html = generateSpeakerHtml({name,jop,image:item})
            // console.log(html)
            addToDom('#speakers > div:nth-child(2)',html)

        })



    }
}

let getNameAndJop = function (text) {
    let s = text.split('/')
    s=s[s.length-1]

    return [s.substring( 0, s.indexOf("(") ).trim() , s.substring( s.indexOf("(")+1, s.indexOf(")")).trim()]
}

generateSpeakers()

function anchorLinkHandler(e) {
    const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);

    e.preventDefault();
    const targetID = this.getAttribute("href");
    const targetAnchor = document.querySelector(targetID);
    if (!targetAnchor) return;
    const originalTop = distanceToTop(targetAnchor);

    window.scrollBy({ top: originalTop-100, left: 0, behavior: "smooth" });

    const checkIfDone = setInterval(function() {
        const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
        if (distanceToTop(targetAnchor) === 0 || atBottom) {
            targetAnchor.tabIndex = "-1";
            targetAnchor.focus();
            window.history.pushState("", "", targetID);
            clearInterval(checkIfDone);
        }
    }, 100);
}

// Animation !!
let Animate = function(items) {

    if (items.length > 0) {
        items.forEach(function(item , index) {

            setTimeout(
                function() {
                    item.classList.add("fadeInUp");

                },
                index * 200,
                "easeInOutExpo"
            );
        });
    }
};
let WayPointGen = function(items) {

    if (items.length > 0) {
        items.forEach((item,index)=>{
            item.classList.add('animated')
            let a = new Waypoint({
                element: item,
                handler: (direction) => {

                    if (direction === "down" && item.classList.contains("animated")) {
                        setTimeout(Animate, 200,items);


                    }
                },
                offset: '95%'

            })
        })
    }
};

itemsToAnimate.forEach((items)=>{
    WayPointGen(items)
})


