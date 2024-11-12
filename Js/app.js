// idFavoritos = new Array(window.localStorage.removeItem('favoritos'));
// idFavoritos = window.localStorage.setItem('favoritos', '')
let main = document.querySelector('main');
let divMain = document.createElement('div');
let idFavoritos = []
if(window.localStorage.getItem('favoritos') == ''){
    idFavoritos = []
} else {
    idFavoritos = JSON.parse(window.localStorage.getItem('favoritos'));
}
function buscador() {
    let header = document.querySelector('header');
    let input = document.createElement('input');
    input.setAttribute('type' , 'text');
    input.setAttribute('placeholder' , 'Escribe aqui lo que quieras buscar');
    input.addEventListener('keyup',function(){

        valorBuscador(input);
    })
    header.appendChild(input);
}

function valorBuscador(input){
    let valorDelInput = input.value;

    divMain.innerHTML = "";
    verCartas(valorDelInput);
}
buscador()
function verCartas(valorDelInput) {
    let verFavs = document.createElement('button');
    verFavs.textContent = 'Favoritos';
    verFavs.style.color = 'red';
    verFavs.setAttribute('onclick','verFavoritos()')
    
    divMain.setAttribute('class', 'divMain');
    agregarOwners(divMain);
    for (let i in pokemon) {
        if(pokemon[i]['nombre'].includes(valorDelInput)){
        let divCard = document.createElement('div');
        divCard.setAttribute('class', 'card');
        comprobarTipo(divCard, pokemon[i]);

        let divIcons = document.createElement('div');
        divIcons.setAttribute('class', 'card-icons');

        let spanDel = document.createElement('span');
        spanDel.setAttribute('class', 'material-symbols-outlined');
        spanDel.textContent = 'delete';
        let spanFav = document.createElement('span');
        spanFav.setAttribute('class', 'material-symbols-outlined');
        spanFav.textContent = 'favorite';
        for (const j in idFavoritos) {
            
            if(idFavoritos[j] == (pokemon[i].id)){

                spanFav.style.color = 'red';
            } 
                
        }
        spanFav.addEventListener('click',function(){
            if(spanFav.style.color == 'red'){
                spanFav.style.color = 'black';
                let lugar = idFavoritos.indexOf(pokemon[i].id);
                idFavoritos.splice(lugar,1);
                
                window.localStorage.setItem('favoritos', JSON.stringify(idFavoritos)); 
            } else {
                spanFav.style.color = 'red';
                idFavoritos.push(pokemon[i].id); 
                window.localStorage.setItem('favoritos', JSON.stringify(idFavoritos)); 

            }
            
        })
        

        let divImg = document.createElement('div');
        divImg.setAttribute('class', 'card-image');

        let imgPok = document.createElement('img');
        imgPok.src = "./img/" + pokemon[i].id + ".png";

        let divCont = document.createElement('div');
        divCont.setAttribute('class', 'card-content');

        let h2Nom = document.createElement('h2');
        h2Nom.textContent = pokemon[i].nombre;

        let pId = document.createElement('p');
        pId.innerHTML = '<b>ID : </b>' + pokemon[i].id;

        let pTip = document.createElement('p');
        pTip.innerHTML = '<b>TIPOS : </b>' + pokemon[i].tipos;

        let ul = document.createElement('ul');
        let bUl = document.createElement('b');
        bUl.textContent = 'ESTADÍSTICAS : ';
        ul.setAttribute('class', 'custom-list');

        let est = pokemon[i].estadisticas_base;
        for (let j in est) {
            li = document.createElement('li');
            li.textContent = `${j} : ${est[j]}`;
            ul.appendChild(li);
        }
        

        main.appendChild(divMain);
        
        divMain.appendChild(divCard);
        divCard.appendChild(divIcons);
        divCard.appendChild(divImg);
        divCard.appendChild(divCont);
        divIcons.appendChild(spanDel);
        divIcons.appendChild(spanFav);
        divImg.appendChild(imgPok);
        divCont.appendChild(h2Nom);
        divCont.appendChild(pId);
        divCont.appendChild(pTip);
        divCont.appendChild(bUl);
        divCont.appendChild(ul);
        
    }  
    }
    main.appendChild(divMain);
    divMain.appendChild(verFavs);
    
}


function agregarOwners(divMain) {
    //TIRSO
    let divCardT = document.createElement('div');
    divCardT.setAttribute('class', 'card');
    divCardT.style.border = '3px solid rgb(182, 182, 182)';

    let divIcons = document.createElement('div');
    divIcons.setAttribute('class', 'card-icons');
    let spanStr = document.createElement('span');
    spanStr.setAttribute('class', 'material-symbols-outlined');
    spanStr.textContent = 'star';

    let divImgT = document.createElement('div');
    divImgT.setAttribute('class', 'card-image');

    let imgT = document.createElement('img');
    imgT.src = "./img/153.png";

    let divContT = document.createElement('div');
    divContT.setAttribute('class', 'card-content');

    let h2NomT = document.createElement('h2');
    h2NomT.textContent = "TIRSO";

    let h3Tip = document.createElement('h3');
    h3Tip.textContent = "CREADOR";

    //IVAN
    let divCardI = document.createElement('div');
    divCardI.setAttribute('class', 'card');
    divCardI.style.border = '3px solid rgb(182, 182, 182)';

    let divIconsi = document.createElement('div');
    divIconsi.setAttribute('class', 'card-icons');
    let spanStri = document.createElement('span');
    spanStri.setAttribute('class', 'material-symbols-outlined');
    spanStri.textContent = 'star';

    let divImgI = document.createElement('div');
    divImgI.setAttribute('class', 'card-image');

    let imgI = document.createElement('img');
    imgI.src = "./img/152.png";

    let divContI = document.createElement('div');
    divContI.setAttribute('class', 'card-content');

    let h2NomI = document.createElement('h2');
    h2NomI.textContent = "IVAN";

    let h3TipI = document.createElement('h3');
    h3TipI.textContent = "CREADOR";

    divMain.appendChild(divCardT);
    divCardT.appendChild(divIcons);
    divCardT.appendChild(divImgT);
    divCardT.appendChild(divContT);
    divIcons.appendChild(spanStr);
    divImgT.appendChild(imgT);
    divContT.appendChild(h2NomT);
    divContT.appendChild(h3Tip);

    divMain.appendChild(divCardI);
    divCardI.appendChild(divIconsi);
    divCardI.appendChild(divImgI);
    divCardI.appendChild(divContI);
    divIconsi.appendChild(spanStri)
    divImgI.appendChild(imgI);
    divContI.appendChild(h2NomI);
    divContI.appendChild(h3TipI);

}

function comprobarTipo(divCard, pokemonActual) {
    if (pokemonActual.tipos[0].includes('Fuego') || pokemonActual.tipos[0].includes('Dragón') || pokemonActual.tipos[0].includes('Lucha')) {
        divCard.style.border = '3px solid rgb(124, 11, 11)';
    } else if (pokemonActual.tipos[0].includes('Agua') || pokemonActual.tipos[0].includes('Hielo')) {
        divCard.style.border = '3px solid rgb(5, 102, 144)';
    } else if (pokemonActual.tipos[0].includes('Bicho') || pokemonActual.tipos[0].includes('Planta')) {
        divCard.style.border = '3px solid rgb(58, 144, 5)';
    } else if (pokemonActual.tipos[0].includes('Veneno') || pokemonActual.tipos[0].includes('Hada') || pokemonActual.tipos[0].includes('Psíquico') || pokemonActual.tipos[0].includes('Fantasma')) {
        divCard.style.border = '3px solid rgb(98, 5, 144)';
    } else if (pokemonActual.tipos[0].includes('Tierra') || pokemonActual.tipos[0].includes('Roca')) {
        divCard.style.border = '3px solid rgb(96, 82, 24)';
    } else if (pokemonActual.tipos[0].includes('Eléctrico')) {
        divCard.style.border = '3px solid rgb(255, 204, 1)';
    } else if (pokemonActual.tipos[0].includes('Normal')) {
        divCard.style.border = '3px solid rgb(75, 75, 75)';
    }

        
    
}

function puntero() {
    let puntero = Math.floor(Math.random() * pokemon.length) + 1;
    document.body.style.cursor = `url('./img/${puntero}.png'), auto`;
}

function verFavoritos() {
    
    
    let main = document.querySelector('main');
    let divMain = document.createElement('div');
    divMain.setAttribute('class', 'divMain');
    for (let i in pokemon) {
        for (const j in idFavoritos) {
            
            if(idFavoritos[j] == (pokemon[i].id)){

                
                let divCard = document.createElement('div');
                        
                divCard.setAttribute('class', 'card');
                comprobarTipo(divCard, pokemon[i]);

                let divIcons = document.createElement('div');
                divIcons.setAttribute('class', 'card-icons');

                let spanDel = document.createElement('span');
                spanDel.setAttribute('class', 'material-symbols-outlined');
                spanDel.textContent = 'delete';
                let spanFav = document.createElement('span');
                spanFav.setAttribute('class', 'material-symbols-outlined');
                spanFav.textContent = 'favorite';
                for (const j in idFavoritos) {
                    
                    if(idFavoritos[j] == (pokemon[i].id)){

                        spanFav.style.color = 'red';
                    } 
                        
                }
                spanFav.addEventListener('click',function(){
                    if(spanFav.style.color == 'red'){
                        spanFav.style.color = 'black';
                        let lugar = idFavoritos.indexOf(pokemon[i].id);
                        idFavoritos.splice(lugar,1);
                        
                        window.localStorage.setItem('favoritos', JSON.stringify(idFavoritos)); 
                    } else {
                        spanFav.style.color = 'red';
                        idFavoritos.push(pokemon[i].id); 
                        window.localStorage.setItem('favoritos', JSON.stringify(idFavoritos)); 

                    }
                    
                })
                

                let divImg = document.createElement('div');
                divImg.setAttribute('class', 'card-image');

                let imgPok = document.createElement('img');
                imgPok.src = "./img/" + pokemon[i].id + ".png";

                let divCont = document.createElement('div');
                divCont.setAttribute('class', 'card-content');

                let h2Nom = document.createElement('h2');
                h2Nom.textContent = pokemon[i].nombre;

                let pId = document.createElement('p');
                pId.innerHTML = '<b>ID : </b>' + pokemon[i].id;

                let pTip = document.createElement('p');
                pTip.innerHTML = '<b>TIPOS : </b>' + pokemon[i].tipos;

                let ul = document.createElement('ul');
                let bUl = document.createElement('b');
                bUl.textContent = 'ESTADÍSTICAS : ';
                ul.setAttribute('class', 'custom-list');

                let est = pokemon[i].estadisticas_base;
                for (let j in est) {
                    li = document.createElement('li');
                    li.textContent = `${j} : ${est[j]}`;
                    ul.appendChild(li);
                }
                

                main.appendChild(divMain);
                
                divMain.appendChild(divCard);
                divCard.appendChild(divIcons);
                divCard.appendChild(divImg);
                divCard.appendChild(divCont);
                divIcons.appendChild(spanDel);
                divIcons.appendChild(spanFav);
                divImg.appendChild(imgPok);
                divCont.appendChild(h2Nom);
                divCont.appendChild(pId);
                divCont.appendChild(pTip);
                divCont.appendChild(bUl);
                divCont.appendChild(ul);
        
            } 
                    
        }
    }
    main.appendChild(divMain);
    
}