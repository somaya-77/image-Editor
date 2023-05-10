// all buttons variable
let upload = document.getElementById("upload");
let download = document.getElementById("download");
let reset = document.getElementById("reset");

// all inputs variable
let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");

// variable image
let imgBox = document.querySelector(".imgBox");
let image = document.querySelector("img");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');


// update function
function update() {
    image.style.filter = 'none';
    saturate.value = '100';
    contrast.value = '100';
    brightness.value = '100';
    sepia.value = '0';
    grayscale.value = '0';
    blur.value = '0';
    hueRotate.value = '0';
}
// disable img box , button reset & download
window.onload = function () {
    imgBox.style.display = "none";
    reset.style.display = "none";
    download.style.display = "none";
}
upload.onchange = function() {
    update()
    imgBox.style.display = "block";
    reset.style.display = "block";
    download.style.display = "block";
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = function() {
        image.src = file.result;
    }
    image.onload = function() {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image,0,0,canvas.width,canvas.height);
        image.style.display = 'none';
    }
}

let filters = document.querySelectorAll("ul li input");
console.log(filters)
filters.forEach(filter => {
    filter.addEventListener("input", function() {
        ctx.filter =  `
            saturate(${saturate.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value}%)
            grayscale(${grayscale.value})
            blur(${blur.value}px)
            hue-rotate(${hueRotate.value}deg)
        `
        ctx.drawImage(image,0,0,canvas.width,canvas.height);
    })
});

// download
download.onclick = function(){
    this.href = canvas.toDataURL();
}