let files = document.querySelectorAll('.files-wrapper__item');
const button = document.querySelector('#drop');
let arr = [];

if(localStorage.getItem('images')){
    arr = JSON.parse(localStorage.getItem('images'));
    arr.forEach(function(item, i, arr){
        files[i].innerHTML = arr[i];
    });
}

let openFile = function(event) {
let input = event.target;
let reader = new FileReader();

    reader.onload = function(){
        console.log();
        let dataURL = reader.result;
        let map = dataURL;
        let el = `<img class="files-wrapper__images" src=${map}>`;
        arr.unshift(el);
        localStorage.setItem('images', JSON.stringify(arr));
        arr.forEach(function(item, i, arr){
            files[i].innerHTML = arr[i];
        });
        let a = arr.length === 16 ? button.setAttribute('disabled', true) : button.removeAttribute('disabled');
    };    
reader.readAsDataURL(input.files[0]);
};
button.onchange = function(){openFile(event);}