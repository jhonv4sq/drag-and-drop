let puzzle = document.getElementById('puzzle');
let piece = document.getElementById('piece');


showPiece(piece);
showContent(puzzle);

function showPiece(piece){
    for(let img of randomList()){
        const div = document.createElement('div');
        div.style.backgroundImage = "url(./img/piece-"+ img +".jpg)";
        div.className = 'img-piece';
        div.draggable = true;
        div.id = 'piece-'+ img;
        div.dataset.id = 'piece';
        piece.appendChild(div);
    }
    console.log('Piezas colocadas aleatoriamente '); 
}
function showContent(puzzle){
    let number = 0
    while(number <= randomList().length-1){
        let div = document.createElement('div');
        div.className = 'puzzle-content';
        div.id = "content"
        div.dataset.id = number;
        puzzle.appendChild(div);
        number++;
    }
    console.log('Contenedores creados ');
}
function randomList(){
    let image = [];
    let img = 0;
    while(img <= 8){
        let index = Math.floor(Math.random() * (10 - 1)) + 1;
        if(image.includes(index) == false){
                image.push(index);
                img++;
        }
    }
    return image;
}

function styleContentDrop(){
    let contents = document.querySelectorAll('#content');
    for(let content of contents){
        console.log(content.childNodes.length);
        switch(content.childNodes.length){
            case 1:
                content.classList.add('puzzle-content-img');
                break;

            case 0:
                content.classList.remove('puzzle-content-img');
                break;
        }
    }
}



piece.addEventListener('dragstart', e => {
    e.dataTransfer.setData('id', e.target.id)
});
puzzle.addEventListener('dragstart', e => {
    e.dataTransfer.setData('id', e.target.id)
});


puzzle.addEventListener('dragover', e => {
    e.preventDefault();
});
puzzle.addEventListener('drop', e => {
    let idPiece = e.dataTransfer.getData('id');
    let idContent = e.target.dataset.id;

    let img = document.getElementById(idPiece);
    
    let lastContetId = img.dataset.id;

    const allContent = {
        'piece': document.getElementById(lastContetId),
    }
    const defaultContent = document.querySelectorAll('#content')[lastContetId];

    let lastContent = allContent[lastContetId] || defaultContent;

    console.log(idPiece + ' dentro del contenedor '+ idContent);
    let div = document.querySelectorAll('#content')[idContent];

    switch(div.childNodes.length){
        case 1:
            let lastImg = document.getElementById(div.childNodes[0]['id']);
            lastImg.dataset.id = lastContetId;

            lastContent.appendChild(lastImg);
            img.dataset.id = idContent;
            div.appendChild(img);
            break;

        default:
            img.dataset.id = idContent;
            e.target.appendChild(img);
            break;
    }
    styleContentDrop();
});


piece.addEventListener('dragover', e => {
    e.preventDefault();
});

piece.addEventListener('drop', e => {
    let idPiece = e.dataTransfer.getData('id');
    let idContent = e.target.dataset.id;
    let img = document.getElementById(idPiece);

    img.dataset.id = idContent;
    piece.appendChild(img);
    styleContentDrop();
});

