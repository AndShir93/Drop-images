const filesWrapper = document.querySelector('.drop-wrapper');
const filesItem = document.querySelectorAll('.files-wrapper__item');
const button = document.querySelector('#drop');
const progressLine = document.querySelector('.progress__line');
const label = document.querySelector('.drop-wrapper__label');
let arr = [];
let weightFiles = 0;
let progressUpload = 0;
let progressLoaded = 0;

let insertImages = function(){
    for(let i = 0; i < arr.length; i++){
        filesItem[i].innerHTML = arr[i];
        if( arr.length >= 16 ){
            button.setAttribute('disabled', true);
            label.style.cursor = 'not-allowed';
        } else{
            button.removeAttribute('disabled');
            label.style.cursor = 'pointer';
        }
    };
}

let calculateWieght = function(files,step){ //вычисляем общий вес всех перемещенных файлов
    for(let i = 0; i < step; i++){
        weightFiles += files[i].size;
    }
    return weightFiles;
}

let checkCount = function(){    
    let files = button.files;
    let count;
    if(files.length + arr.length > 16){
        count = 16 - arr.length;
        return count;
    }else{
        count = files.length;
        return count;
    }
}

if(localStorage.getItem('images')){
    arr = JSON.parse(localStorage.getItem('images'));
    insertImages();    
}

let openFile = function(step) {
    progressLine.style.width = '0';
    let files = button.files;
    calculateWieght(files,step);
    for(let i = 0; i < step; i++){
        let reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = function(){
            let urlFiles = reader.result;
            let el = `<img class="files-wrapper__images" src=${urlFiles}>`;
            arr.unshift(el);
            localStorage.setItem('images', JSON.stringify(arr));
            insertImages(step);
        }
        reader.onprogress = function(){
            progressLoaded = progressLoaded + event.loaded;
            progressUpload = (progressLoaded / weightFiles )*100;
            progressLine.style.width = progressUpload + '%';
            console.log(progressUpload);
        }
    }
};

button.onchange = function(){
    let step = checkCount(); //количество шагов
    openFile(step);
};
filesWrapper.ondrop = function(event){
    button.change;
}
