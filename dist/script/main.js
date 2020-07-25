const filesWrapper = document.querySelector('.drop-wrapper');
const input = document.querySelector('#drop');
const progressLine = document.querySelector('.progress__line');
const label = document.querySelector('.drop-wrapper__label');
const imagesWrapper = document.querySelector('.files-wrapper');
let nameImage = document.querySelector('.image-name');
let arr = [];
let weightFiles = 0;
let progressUpload = 0;
let progressLoaded = 0;
let filesItem;

imagesWrapper.ondragstart = function() {
    return false;
  };

let insertImages = function(step){  //цикл для вставки изображений  
    filesItem = document.querySelectorAll('.files-wrapper__item');
    for(let i = 0; i < arr.length; i++){
        filesItem[i].innerHTML = arr[i];
        if( arr.length >= 16 ){
            input.setAttribute('disabled', true);
            label.style.cursor = 'not-allowed';
        } else{
            input.removeAttribute('disabled');
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

let stepCount = function(){    
    let files = input.files;
    let count;
    if(files.length + arr.length > 16){
        count = 16 - arr.length;
        return count;
    }else{
        count = files.length;
        return count;
    }
}

let completionExchange = function(){ //завершнаем события onmousemove и onmouseup, скрываем иконку изображения
    document.onmousemove = null;
    document.onmouseup = null;
    nameImage.classList.remove('image-name_show');
    nameImage.classList.add('image-name_hidden');
    nameImage.innerHTML = '';    
    let grabbItems = document.querySelectorAll('.grabbing');
    grabbItems.forEach((item,i,grabbItems) => {
        grabbItems[i].classList.remove('grabbing');
    });

}

let move = function(event){ //движение иконки изображения
    nameImage.style.left = event.pageX - nameImage.offsetWidth / 2  + 'px';
    nameImage.style.top = event.pageY - 1.2 * nameImage.offsetHeight + 'px';
}

if(localStorage.getItem('images')){
    arr = JSON.parse(localStorage.getItem('images'));
    insertImages(arr.length);    
}



imagesWrapper.onmousedown = function(){
    let filesArr = Array.prototype.slice.call(filesItem);//проебразуем в массив   
    let numFirstEl =   filesArr.indexOf(event.target.parentNode); //индекс элемента на который нажали
    let elem ;
    let numSecondEl = 0;
    if(event.target.tagName === 'IMG'){
        let target = event.target;
        nameImage.innerHTML +='<img class="image-name__icon" src="" alt="">';
        nameImage.innerHTML += event.target.getAttribute('name');
        nameImage.classList.add('image-name_show');
        nameImage.classList.remove('image-name_hidden');
        nameImage.firstChild.src = target.src;
        move(event);
        document.onmousemove = function(event){
            event.target.classList.add('grabbing');
            numSecondEl = filesArr.indexOf(event.target.parentNode);//индекс элемента на котором находится курсор
            move(event);
            document.onmouseup = function(){
                if(numSecondEl != -1){
                    elem = filesArr[numSecondEl];
                    arr[numSecondEl] = arr[numFirstEl];
                    arr[numFirstEl] = elem.innerHTML;
                    insertImages();
                    localStorage.setItem('images', JSON.stringify(arr));
                    completionExchange();
                }else{
                    completionExchange();
                }
            }
        };
    }
    imagesWrapper.onmouseup = function(){
        document.onmousemove = null;
        nameImage.style.left = event.pageX + 'px';
        nameImage.style.top = event.pageY + 'px';
        nameImage.classList.remove('image-name_show');
        nameImage.classList.add('image-name_hidden');
        nameImage.innerHTML = '';
    }
}

let openFile = function(step) {
    progressLine.style.width = '0';
    let files = input.files;
    calculateWieght(files,step);
    for(let i = 0; i < step; i++){
        let reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = function(){
            let urlFiles = reader.result;
            let el = `<img class="files-wrapper__images" name="${files[i].name}" src=${urlFiles}>`;
            arr.unshift(el);
            localStorage.setItem('images', JSON.stringify(arr));
            insertImages(step);
        }
        reader.onprogress = function(){
            progressLoaded = progressLoaded + event.loaded;
            progressUpload = (progressLoaded / weightFiles )*100;
            progressLine.style.width = progressUpload + '%';
        }
    }
};

input.onchange = function(){
    let step = stepCount(); //количество шагов
    openFile(step);
};
filesWrapper.ondrop = function(event){
    input.change;
}
