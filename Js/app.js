let main = document.querySelector('main');
let divMain = document.createElement('div');
let header = document.querySelector('header');
let divHeader =  document.createElement('div');
/**
 * Esta funcion añade las caracteristicas de la pantalla,tanto la altura como la anchura de esta,no devuelve ningun valor
 */
function Bom(){
    let divTamaño = document.createElement("div")
    let anchura = document.createElement("b");

    anchura.textContent = (screen.width + " X ");
    let altura = document.createElement("b");
    altura.textContent = (screen.height + " Y ");

    divTamaño.style.float = "right"
    header.appendChild(divHeader);
    divHeader.appendChild(divTamaño)
    divTamaño.appendChild(anchura)
    divTamaño.appendChild(altura)

}
/**
 * Esta funcion crea los dos selects de los "tipos" de pokemons y crea un conjunto de tipos para introducirlos en las opciones de estos. También, crea un evento en cada uno de ellos con una funcion para enviar el valor seleccionado a la funcion "valorBuscador()"
 */
function buscarPorTipo() {

    let select = document.createElement('select');
    let select2 = document.createElement('select');

    let tipos = new Set();
    
    for (let poke in pokemon) {
        tipos.add(pokemon[poke].tipos[0]);
        tipos.add(pokemon[poke].tipos[1]);
       
    }
    for (let value of tipos) {
        let option = document.createElement('option');

        
        
        
        if(value == undefined){
            value = " ";
        }
        option.setAttribute('value', value);
        option.textContent = value;
        select.appendChild(option);

    }
    for (let value of tipos) {
        let option = document.createElement('option');

        option.setAttribute('value', value);
        if(value == undefined){
            value = " ";
        }
        option.setAttribute('value', value);
        option.textContent = value;
        select2.appendChild(option);

    }
    select.addEventListener('click',function(){
        valorBuscadorTipo(select.value,select2.value);
    })
    select2.addEventListener('click',function(){
        valorBuscadorTipo(select.value,select2.value);
    })
    header.appendChild(divHeader);
    divHeader.appendChild(select);
    divHeader.appendChild(select2);
}
/**
 * Buscador() no devuelve ningun valor,su funcionalidad es agregar un botón de vercartas, para, como su propio nombre indica ver todas las cartas, ya que con otros funciones o con los selects comentados anteriormente quitarán alguna carta del conjunto.Esta funcion tambien agrega un buscador, para que cuando pongas una letra,varias o un nombre de pokemon aparezca todos aquellos pokemons con ese nombre o que contengan esa/s letra/s .
 */
function buscador() {

    let letra = document.createElement('input');
    let input2 = document.createElement('input');
    input2.setAttribute('type','button');
    input2.setAttribute('value','verCartas');
    input2.addEventListener('click',function(){
        divMain.innerHTML = "";
        verCartas();
    })
    letra.setAttribute('type' , 'text');
    letra.setAttribute('placeholder' , 'Escribe aqui lo que quieras buscar');
    letra.addEventListener('keyup',function(){

        valorBuscador(letra);
    })
    header.appendChild(divHeader);
    divHeader.appendChild(input2);
    divHeader.appendChild(letra);
}
/**
 * 
 * @param {*} letra  - Recoge la/s letra/s recibidas en la funcion buscador, las pone en mayúsculas y las envía a la funcion verCartasConValor()
 */
function valorBuscador(letra){
    let valorDelInput = letra.value.toUpperCase();

    divMain.innerHTML = "";
    verCartasConValor(valorDelInput);
}
/**
 * El funcionamiento es muy similar a la anterior,recoge los dos valores de los selects (de tipos) y se los envia a la funcion verCartasConTipos()
 * @param {*} input - opcion seleccionada del primer select
 * @param {*} input2  - opcion seleccionada del segundo select 
 */
function valorBuscadorTipo(input,input2){

    divMain.innerHTML = "";
    verCartasConTipos(input,input2);
}
/**
 * Esta funcion es practicamente la base de toda la Página Web,
 * recibe un pokemon entero,con su tipo,nombre,..., y devuelve la carta con los parametros adecuados y la muestra. 
 * @param {*} numeroPokemon 
 */
function Cartas(numeroPokemon) {
     
    let divCard = document.createElement('div');
    divCard.setAttribute('class', 'card');
    comprobarTipo(divCard, pokemon[numeroPokemon]);

    let divIcons = document.createElement('div');
    divIcons.setAttribute('class', 'card-icons');

    let spanDel = document.createElement('span');
    spanDel.setAttribute('class', 'material-symbols-outlined');
    spanDel.textContent = 'delete';
    let spanFav = document.createElement('span');
    spanFav.setAttribute('class', 'material-symbols-outlined');
    spanFav.textContent = 'favorite';
    

    let divImg = document.createElement('div');
    divImg.setAttribute('class', 'card-image');

    let imgPok = document.createElement('img');
    imgPok.src = "./img/" + pokemon[numeroPokemon].id + ".png";

    let divCont = document.createElement('div');
    divCont.setAttribute('class', 'card-content');

    let h2Nom = document.createElement('h2');
    h2Nom.textContent = pokemon[numeroPokemon].nombre;

    let pId = document.createElement('p');
    pId.innerHTML = '<b>ID : </b>' + pokemon[numeroPokemon].id;

    let pTip = document.createElement('p');
    pTip.innerHTML = '<b>TIPOS : </b>' + pokemon[numeroPokemon].tipos;

    let ul = document.createElement('ul');
    let bUl = document.createElement('b');
    bUl.textContent = 'ESTADÍSTICAS : ';
    ul.setAttribute('class', 'custom-list');

    let est = pokemon[numeroPokemon].estadisticas_base;
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
    


main.appendChild(divMain);


}
/**
 * Recibe el valor del buscador y con ello compara(.includes) con el nombre del pokemon dentro de un for.
 * @param {*} valorDelInput 
 */
function verCartasConValor(valorDelInput) {

    
    divMain.setAttribute('class', 'divMain');

    for (let i in pokemon) {
        if(pokemon[i]['nombre'].toUpperCase().includes(valorDelInput)){
            Cartas(i);
        } 

    }
    main.appendChild(divMain);

    
}
/**
 * Recibe el valor de los selects y con ello compara los tipos de los pokemons con los valores recibidos
 * @param {*} valorDelInput 
 */
function verCartasConTipos(valorDelInput,valorDelInput2) {
    

    
    divMain.setAttribute('class', 'divMain');
    //No se me ha ocurrido como hacerlo con una funcion auxliar asique lo he hecho haciendo mucho codigo.
    for (let i in pokemon) {
        
        if((pokemon[i]['tipos'][0] == (valorDelInput) || pokemon[i]['tipos'][1] == (valorDelInput)) && (pokemon[i]['tipos'][0] == (valorDelInput2) || pokemon[i]['tipos'][1] == (valorDelInput2))){
            Cartas(i)
        } 
        else if(valorDelInput == " " && valorDelInput2 != " "){
            if((pokemon[i]['tipos'][0] == (valorDelInput2) || pokemon[i]['tipos'][1] == (valorDelInput2))){
                Cartas(i)
            } 
        }
        else if(valorDelInput2 == " " && valorDelInput != " "){
            if((pokemon[i]['tipos'][0] == (valorDelInput) || pokemon[i]['tipos'][1] == (valorDelInput))){
                Cartas(i)
            }

        }else if(valorDelInput2 == " " && valorDelInput == " "){
            Cartas(i)
        }
         
    
    }
    main.appendChild(divMain);

    
}
/**
 * Esta funcion es similar a las anteriores pero no recibe ningun parametro ni compara valores con los pokemons,solo muestra todas las cartas sin excepciones
 */
function verCartas() {

    
    divMain.setAttribute('class', 'divMain');
    agregarOwners(divMain);
    for (let i in pokemon) {
        Cartas(i);
    }

}
/**
 * Funcion implementada para añadir a los creadores de este proyecto como cartas Pokemon desde un principio
 * @param {*} divMain - Recibe el div del main
 */
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
/**
 * Funcion creada para dar color a los bordes de las cartas dependiendo del tipo de estas, recibe la carta como tal y el pokemon actual para saber su tipo.
 * @param {*} divCard 
 * @param {*} pokemonActual 
 */
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
/**
 * Funcion utilizada para que el icono del puntero sea un pokemon aleatorio cada vez que se recargue la página.
 */
function puntero() {
    let puntero = Math.floor(Math.random() * pokemon.length) + 1;
    document.body.style.cursor = `url('./img/${puntero}.png'), auto`;
}
buscador()
Bom();
verCartas();
buscarPorTipo();