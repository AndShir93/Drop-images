const filesWrapper = document.querySelector('.drop-wrapper');
const files = document.querySelectorAll('.files-wrapper__item');
const button = document.querySelector('#drop');
let arr = [];

// filesWrapper.addEventListener('drag',function(event){event.preventDefault()});
// filesWrapper.addEventListener('dragstart',function(event){event.preventDefault()});
// filesWrapper.addEventListener('dragend',function(event){event.preventDefault()});
// filesWrapper.addEventListener('dragover',function(event){event.preventDefault()});
// filesWrapper.addEventListener('dragenter',function(event){event.preventDefault()});
// filesWrapper.addEventListener('dragleave',function(event){event.preventDefault()});
// filesWrapper.addEventListener('drop',function(event){event.preventDefault()});


if(localStorage.getItem('images')){
    arr = JSON.parse(localStorage.getItem('images'));
    arr.forEach(function(item, i, arr){
        files[i].innerHTML = arr[i];
    });
}

let openFile = function(event) {
let input = event.target;
let reader = new FileReader();
console.log(reader);
    reader.onload = function(){
        let dataURL = reader.result;
        let el = `<img class="files-wrapper__images" src=${dataURL}>`;
        arr.unshift(el);
        localStorage.setItem('images', JSON.stringify(arr));
        arr.forEach(function(item, i, arr){
            files[i].innerHTML = arr[i];
        });
        reader = '';
        let a = arr.length === 16 ? button.setAttribute('disabled', true) : button.removeAttribute('disabled');
    };    
reader.readAsDataURL(input.files[0]);
};
button.onchange = function(){openFile(event)};
filesWrapper.ondrop = function(){
    button.change;
}