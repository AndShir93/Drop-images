let files = document.querySelectorAll('.files-wrapper__item');
const button = document.querySelector('#drop');

let arr = []
let openFile = function(event) {
let input = event.target;

let reader = new FileReader();
reader.onload = function(){
    console.log();
    let dataURL = reader.result;
    let map = dataURL;
    let el = `<img class="files-wrapper__images" src=${map}>`;
    arr.unshift(el);
    arr.forEach(function(item, i, arr){
        files[i].innerHTML = arr[i];
    });
    let a = arr.length === 12 ? button.setAttribute('disabled', true) : button.removeAttribute('disabled');
};
reader.readAsDataURL(input.files[0]);
};
button.onchange = function(){openFile(event);}