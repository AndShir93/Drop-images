const filesWrapper = document.querySelector('.drop-wrapper');
const filesItem = document.querySelectorAll('.files-wrapper__item');
const button = document.querySelector('#drop');
let arr = [];

let insertImages = function(){
    for(let i = 0; i < arr.length; i++){
        filesItem[i].innerHTML = arr[i];
        let a = arr.length > 15 ? button.setAttribute('disabled', true) : button.removeAttribute('disabled');
    };
}


if(localStorage.getItem('images')){
    arr = JSON.parse(localStorage.getItem('images'));
    insertImages();    
}



let openFile = function() {
    let files = button.files;
    for(let i = 0; i < files.length; i++){
        let reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = function(){
            let urlFiles = reader.result;
            let el = `<img class="files-wrapper__images" src=${urlFiles}>`;
            arr.unshift(el);
            localStorage.setItem('images', JSON.stringify(arr));
            insertImages();
        }
    }
};

button.onchange = function(){
    openFile();
};
filesWrapper.ondrop = function(event){
    button.change;
}
