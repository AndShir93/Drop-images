const filesWrapper = document.querySelector('.drop-wrapper');
const filesItem = document.querySelectorAll('.files-wrapper__item');
const button = document.querySelector('#drop');
let arr = [];

let insertImages = function(t){
    for(let i = 0; i < arr.length; i++){
        filesItem[i].innerHTML = arr[i];
        let a = arr.length > t ? button.setAttribute('disabled', true) : button.removeAttribute('disabled');
    };
}

if(localStorage.getItem('images')){
    arr = JSON.parse(localStorage.getItem('images'));
    insertImages();    
}



let openFile = function(p) {
    let files = button.files;
    for(let i = 0; i < p; i++){
        let reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = function(){
            let urlFiles = reader.result;
            let el = `<img class="files-wrapper__images" src=${urlFiles}>`;
            arr.unshift(el);
            localStorage.setItem('images', JSON.stringify(arr));
            insertImages(p);
        }
    }
};

button.onchange = function(){
    let files = button.files;
    let count;
    if(files.length + arr.length > 16){
        count = 16 - arr.length;
    }else{
        count = files.length;
    }
    openFile(count);
};
filesWrapper.ondrop = function(event){
    button.change;
}
