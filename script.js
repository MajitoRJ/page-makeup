// select start
const optionMenu = document.querySelector(".select-menu"),
        selectBtn = optionMenu.querySelector(".select-btn"),
        options = optionMenu.querySelectorAll(".option"),
        sBtn_text = optionMenu.querySelector(".sBtn-Text");

selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active")); //esta linea hace tal y tal

 options.forEach(option => {

    option.addEventListener("click", () =>{
        let selectedOption =  option.querySelector(".option-text").innerText;
        sBtn_text.innerText = selectedOption;
        
        optionMenu.classList.remove("active");
    })


 })
 // select send


//  Slider 1 Start
const carousel = document.querySelector(".carousel"),  // accede al contenido de la clase carousel
firstImg = carousel.querySelectorAll(".card-2")[0]; //accedio a la etiqueta img y se posiciona en la img 1 
arrowIcons = document.querySelectorAll(".wrapper .icon-tools"); // accede a la clase wrapper y a todas las etiquetas i que hay en html

console.log(firstImg);

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff; // info sobre eventos de arrastre y desplazamiento

const showHideIcons = () =>{
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" :"block"; // esto es una condicion ternaria al igual que la siguiete, funciona como el if y else
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" :"block";

}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14;
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    })
})

const autoSlide = ()  => {
    if(carousel.scrollLeft== (carousel.scrollWidth - carousel.clientWidth)) return;
    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) { // if user is scolling to the right 
    //    return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;0
    }
    // if user is scrolling to the left
    // carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;

}


const dragStart = (e) =>{
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // scrolling image/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () =>{
    isDragStart = false;
    carousel.classList.remove("dragging");
    // if(!isDragging) false;
    autoSlide();

}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);


carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);


//  Slider 1 End