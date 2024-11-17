//*TODOAS LAS VARIABLES GLOBALES QUE SE REUTILIZAN EN DISTINTAS CALASES
let main = document.querySelector('main');
let divMain = document.createElement('div');
let header = document.querySelector('header');
let divHeader = document.createElement('div');
let divBoton = document.createElement('div');
divBoton.setAttribute('class', 'header_boton');
//*ESTRUCTURAS DE DATOS
let pokemonsCopy = [...pokemon];
let pokemonEliminado = [];
let pokemonFavorito = {};
let jsoneliminadas = JSON.parse(window.localStorage.getItem('jsonOcultos'));
let jsonFavorito = JSON.parse(window.localStorage.getItem('jsonFavoritos')) || {};
let jsonAgregarPokemon = JSON.parse(window.localStorage.getItem('jsonAgregar')) || [];
let pokemonTodos = pokemonsCopy.concat(jsonAgregarPokemon);
let idPokemon = pokemonTodos.length;
window.localStorage.setItem('idPokemon', JSON.stringify(idPokemon));
//*BOTON VER OCULTOS
let buttonOcultos = document.createElement('button');
let pOculto = document.createElement('p');
buttonOcultos.addEventListener('click', function () {
    divMain.innerHTML = "";
    mostrarOcultos();
});
pOculto.textContent = 'OCULTOS';
divBoton.appendChild(buttonOcultos);
buttonOcultos.appendChild(pOculto);
//*BOTON VER FAVORITOS
let buttonFavoritos = document.createElement('button');
let pFavorito = document.createElement('p');
buttonFavoritos.addEventListener('click', function () {
    divMain.innerHTML = "";
    mostrarFavoritos();
});
pFavorito.textContent = 'FAVORITOS';
divBoton.appendChild(buttonFavoritos);
buttonFavoritos.appendChild(pFavorito);
//*BOTON VER CARTAR
let buttonCartas = document.createElement('button');
let pCartas = document.createElement('p');
buttonCartas.addEventListener('click', function () {
    divMain.innerHTML = "";
    verCartas();
});
pCartas.textContent = 'VER CARTAS';
divBoton.appendChild(buttonCartas);
buttonCartas.appendChild(pCartas);
//*BOTON INSERTAR POKEMON
let buttonAgregar = document.createElement('button');
let pAgregar = document.createElement('p');
let aAgregar = document.createElement('a');
aAgregar.setAttribute('href', './agregar.html');
pAgregar.textContent = "AGREGAR POKEMON";
divBoton.appendChild(aAgregar);
aAgregar.appendChild(buttonAgregar);
buttonAgregar.appendChild(pAgregar);
header.appendChild(divBoton);
/**
 * Esta funcion añade las caracteristicas de la pantalla,tanto la altura como la anchura de esta,no devuelve ningun valor
 */
function Bom() {
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

    for (let poke in pokemonTodos) {
        tipos.add(pokemonTodos[poke].tipos[0]);
        tipos.add(pokemonTodos[poke].tipos[1]);
    }
    for (let value of tipos) {
        let option = document.createElement('option');

        if (value == undefined) {
            value = " ";
        }
        option.setAttribute('value', value);
        option.textContent = value;
        select.appendChild(option);

    }
    for (let value of tipos) {
        let option = document.createElement('option');

        option.setAttribute('value', value);
        if (value == undefined) {
            value = " ";
        }
        option.setAttribute('value', value);
        option.textContent = value;
        select2.appendChild(option);

    }
    select.addEventListener('click', function () {
        valorBuscadorTipo(select.value, select2.value);
    })
    select2.addEventListener('click', function () {
        valorBuscadorTipo(select.value, select2.value);
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

    letra.setAttribute('type', 'text');
    letra.setAttribute('placeholder', 'Escribe aqui lo que quieras buscar');
    letra.addEventListener('keyup', function () {

        valorBuscador(letra);
    })
    header.appendChild(divHeader);

    divHeader.appendChild(letra);
}
/**
 * 
 * @param {*} letra  - Recoge la/s letra/s recibidas en la funcion buscador, las pone en mayúsculas y las envía a la funcion verCartasConValor()
 */
function valorBuscador(letra) {
    let valorDelInput = letra.value.toUpperCase();

    divMain.innerHTML = "";
    verCartasConValor(valorDelInput);
}
/**
 * El funcionamiento es muy similar a la anterior,recoge los dos valores de los selects (de tipos) y se los envia a la funcion verCartasConTipos()
 * @param {*} input - opcion seleccionada del primer select
 * @param {*} input2  - opcion seleccionada del segundo select 
 */
function valorBuscadorTipo(input, input2) {
    divMain.innerHTML = "";
    verCartasConTipos(input, input2);
}
/**
 * Esta funcion es practicamente la base de toda la Página Web,
 * recibe un pokemon entero,con su tipo,nombre,..., y devuelve la carta con los parametros adecuados y la muestra. 
 * @param {*} numeroPokemon 
 */
function Cartas(numeroPokemon) {
    let divCard = document.createElement('div');
    divCard.setAttribute('class', 'card');
    comprobarTipo(divCard, pokemonTodos[numeroPokemon]);
    for (let j in jsoneliminadas) {
        if (pokemonTodos[numeroPokemon].id == jsoneliminadas[j]) {
            divCard.setAttribute('class', 'ocultos');
        }
    }

    let divIcons = document.createElement('div');
    divIcons.setAttribute('class', 'card-icons');

    let spanDel = document.createElement('span');
    spanDel.setAttribute('class', 'material-symbols-outlined delete');
    spanDel.textContent = 'delete';

    let spanFav = document.createElement('span');
    spanFav.setAttribute('class', 'material-symbols-outlined fav');
    spanFav.textContent = 'favorite';
    for (let x in jsonFavorito) {
        if (pokemonTodos[numeroPokemon].id == jsonFavorito[x]) {
            spanFav.style.color = "#f00";
        }
    }
    let divImg = document.createElement('div');
    divImg.setAttribute('class', 'card-image');

    let imgPok = document.createElement('img');
    if (pokemonTodos[numeroPokemon].id > pokemonsCopy.length) {
        imgPok.src = "./img/insertados.gif";
    } else {
        imgPok.src = "./img/" + pokemonTodos[numeroPokemon].id + ".png";
    }

    let divCont = document.createElement('div');
    divCont.setAttribute('class', 'card-content');

    let h2Nom = document.createElement('h2');
    h2Nom.textContent = pokemonTodos[numeroPokemon].nombre;

    let pId = document.createElement('p');
    pId.innerHTML = '<b>ID : </b>' + pokemonTodos[numeroPokemon].id;

    let pTip = document.createElement('p');
    pTip.innerHTML = '<b>TIPOS : </b>' + pokemonTodos[numeroPokemon].tipos;

    let ul = document.createElement('ul');
    let bUl = document.createElement('b');
    bUl.textContent = 'ESTADÍSTICAS : ';
    ul.setAttribute('class', 'custom-list');

    let est = pokemonTodos[numeroPokemon].estadisticas_base;
    for (let j in est) {
        li = document.createElement('li');
        li.textContent = `${j} : ${est[j]}`;
        ul.appendChild(li);
    }

    ocultar(spanDel, divCard, pokemonTodos[numeroPokemon].id);
    favorito(spanFav, pokemonTodos[numeroPokemon].id);
    desFavorito(spanFav, pokemonTodos[numeroPokemon].id);

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
    if (pokemonTodos[numeroPokemon].id < pokemonsCopy.length) {
        divCont.appendChild(bUl);
    }
    divCont.appendChild(ul);
    main.appendChild(divMain);
}
/**
 * Recibe el valor del buscador y con ello compara(.includes) con el nombre del pokemon dentro de un for.
 * @param {*} valorDelInput 
 */
function verCartasConValor(valorDelInput) {
    divMain.setAttribute('class', 'divMain');

    for (let i in pokemonTodos) {
        if (pokemonTodos[i]['nombre'].toUpperCase().includes(valorDelInput)) {
            Cartas(i);
        }

    }
    main.appendChild(divMain);
}
/**
 * Recibe el valor de los selects y con ello compara los tipos de los pokemons con los valores recibidos
 * @param {*} valorDelInput 
 */
function verCartasConTipos(valorDelInput, valorDelInput2) {
    divMain.setAttribute('class', 'divMain');
    //No se me ha ocurrido como hacerlo con una funcion auxliar asique lo he hecho haciendo mucho codigo.
    for (let i in pokemonTodos) {
        if ((pokemonTodos[i]['tipos'][0] == (valorDelInput) || pokemonTodos[i]['tipos'][1] == (valorDelInput)) && (pokemonTodos[i]['tipos'][0] == (valorDelInput2) || pokemonTodos[i]['tipos'][1] == (valorDelInput2))) {
            Cartas(i)
        }
        else if (valorDelInput == " " && valorDelInput2 != " ") {
            if ((pokemonTodos[i]['tipos'][0] == (valorDelInput2) || pokemonTodos[i]['tipos'][1] == (valorDelInput2))) {
                Cartas(i)
            }
        }
        else if (valorDelInput2 == " " && valorDelInput != " ") {
            if ((pokemonTodos[i]['tipos'][0] == (valorDelInput) || pokemonTodos[i]['tipos'][1] == (valorDelInput))) {
                Cartas(i)
            }

        } else if (valorDelInput2 == " " && valorDelInput == " ") {
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
    for (let i in pokemonTodos) {
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
    spanStr.style.color = '#c5c530';

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
    spanStri.style.color = '#c5c530';

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
    } else if (pokemonActual.tipos[0].includes('Normal') || pokemonActual.tipos[0].includes('Volador') || pokemonActual.tipos[0].includes('Acero')) {
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
/**
 * La funcion ocultar agrega una funcion a los iconos de basura( para borrar pokemons) haciendolos ocultos y enviandolos a localstarage
 * @param {*} spanDel - El icono de eliminar
 * @param {*} divCard  - La carta entera
 * @param {*} pokemonActualId - Es la id actual del pokemon
 */
function ocultar(spanDel, divCard, pokemonActualId) {
    spanDel.addEventListener('click', function () {
        divCard.setAttribute('class', 'ocultos');
        pokemonEliminado.push(pokemonActualId);
        window.localStorage.setItem('jsonOcultos', JSON.stringify(pokemonEliminado));
        jsoneliminadas = JSON.parse(window.localStorage.getItem('jsonOcultos'));
    })
}
/**
 * El mismo funcionamiento que ocultar excepto el display
 * @param {*} spanDel - El icono de eliminar
 * @param {*} divCard  - La carta entera
 * @param {*} pokemonActualId - Es la id actual del pokemon
 */
function favorito(spanFav, pokemonActual) {
    spanFav.addEventListener('click', function () {
        spanFav.style.color = "#f00";
        pokemonFavorito[pokemonActual.id] = pokemonActual;
        window.localStorage.setItem('jsonFavoritos', JSON.stringify(pokemonFavorito));
        jsonFavorito = JSON.parse(window.localStorage.getItem('jsonFavoritos'));
    })
}
/**
 * Esta funcion muestra todos los pokemons ocultos
 */
function mostrarOcultos() {
    let mostrar = false;
    divMain.setAttribute('class', 'divMain');
    for (let i in pokemonTodos) {
        for (let j in jsoneliminadas) {
            let divCard = document.createElement('div');
            divCard.setAttribute('class', 'card');

            if (pokemonTodos[i].id == jsoneliminadas[j]) {
                mostrar = true;
                divCard.style.display = 'flex';
            } else {
                mostrar = false;
            }

            if (mostrar) {
                comprobarTipo(divCard, pokemonTodos[i]);

                let divIcons = document.createElement('div');
                divIcons.setAttribute('class', 'card-icons');

                let spanDel = document.createElement('span');
                spanDel.setAttribute('class', 'material-symbols-outlined delete');
                spanDel.textContent = 'delete';
                spanDel.style.color = 'blue';

                let spanFav = document.createElement('span');
                spanFav.setAttribute('class', 'material-symbols-outlined fav');
                spanFav.textContent = 'favorite';

                let divImg = document.createElement('div');
                divImg.setAttribute('class', 'card-image');

                let imgPok = document.createElement('img');
                if (pokemonTodos[i].id > pokemonsCopy.length) {
                    imgPok.src = "./img/insertados.gif";
                } else {
                    imgPok.src = "./img/" + pokemonTodos[i].id + ".png";
                }
                let divCont = document.createElement('div');
                divCont.setAttribute('class', 'card-content');

                let h2Nom = document.createElement('h2');
                h2Nom.textContent = pokemonTodos[i].nombre;

                let pId = document.createElement('p');
                pId.innerHTML = '<b>ID : </b>' + pokemonTodos[i].id;

                let pTip = document.createElement('p');
                pTip.innerHTML = '<b>TIPOS : </b>' + pokemonTodos[i].tipos;

                let ul = document.createElement('ul');
                let bUl = document.createElement('b');
                bUl.textContent = 'ESTADÍSTICAS : ';
                ul.setAttribute('class', 'custom-list');

                let est = pokemonTodos[i].estadisticas_base;
                for (let j in est) {
                    li = document.createElement('li');
                    li.textContent = `${j} : ${est[j]}`;
                    ul.appendChild(li);
                }

                desocultar(spanDel, divCard, pokemonTodos[i].id);

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
/**
 * El mismo funcionamiento que mostrarOcultos 
 */
function mostrarFavoritos() {
    let mostrar = false;
    divMain.setAttribute('class', 'divMain');
    for (let i in pokemonTodos) {
        for (let j in jsonFavorito) {
            let divCard = document.createElement('div');
            divCard.setAttribute('class', 'card');

            if (pokemonTodos[i].id == jsonFavorito[j]) {
                mostrar = true;
            } else {
                mostrar = false;
            }

            if (mostrar) {
                comprobarTipo(divCard, pokemonTodos[i]);

                let divIcons = document.createElement('div');
                divIcons.setAttribute('class', 'card-icons');

                let spanDel = document.createElement('span');
                spanDel.setAttribute('class', 'material-symbols-outlined delete');
                spanDel.textContent = 'delete';

                let spanFav = document.createElement('span');
                spanFav.setAttribute('class', 'material-symbols-outlined fav');
                spanFav.textContent = 'favorite';
                spanFav.style.color = "#f00";

                let divImg = document.createElement('div');
                divImg.setAttribute('class', 'card-image');

                let imgPok = document.createElement('img');
                if (pokemonTodos[i].id > pokemonsCopy.length) {
                    imgPok.src = "./img/insertados.gif";
                } else {
                    imgPok.src = "./img/" + pokemonTodos[i].id + ".png";
                }
                let divCont = document.createElement('div');
                divCont.setAttribute('class', 'card-content');

                let h2Nom = document.createElement('h2');
                h2Nom.textContent = pokemonTodos[i].nombre;

                let pId = document.createElement('p');
                pId.innerHTML = '<b>ID : </b>' + pokemonTodos[i].id;

                let pTip = document.createElement('p');
                pTip.innerHTML = '<b>TIPOS : </b>' + pokemonTodos[i].tipos;

                let ul = document.createElement('ul');
                let bUl = document.createElement('b');
                bUl.textContent = 'ESTADÍSTICAS : ';
                ul.setAttribute('class', 'custom-list');

                let est = pokemonTodos[i].estadisticas_base;
                for (let j in est) {
                    li = document.createElement('li');
                    li.textContent = `${j} : ${est[j]}`;
                    ul.appendChild(li);
                }

                desocultar(spanDel, divCard, pokemonTodos[i].id);
                desFavorito(spanFav, pokemonTodos[i].id);

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
/**
 *  Basicamente es lo mismo que la funcion ocultar pero al reves, cuando vayamos al apartado ocultos y le demos al icono de ocultar se desocultaran
 * @param {*} spanDel - El icono de eliminar
 * @param {*} divCard  - La carta entera
 * @param {*} pokemonActualId - Es la id actual del pokemon
 */
function desocultar(spanDel, divCard, pokemonActualId) {
    spanDel.addEventListener('click', function () {
        $id = pokemonActualId;
        let index = "";
        let index2 = "";

        for (let i = 0; i < jsoneliminadas.length; i++) {
            index = jsoneliminadas.indexOf($id);
        }
        for (let j = 0; j < pokemonEliminado.length; j++) {
            index2 = pokemonEliminado.indexOf($id);
        }

        jsoneliminadas.splice(index, 1);
        pokemonEliminado.splice(index2, 1);

        window.localStorage.clear();
        window.localStorage.setItem('jsonOcultos', JSON.stringify(jsoneliminadas));
        divCard.style.display = 'none';
    })
}
/**
 * El mismo funcionamiento que desocultar 
 */
function desFavorito(spanFav, pokemonActual) {
    spanFav.addEventListener('dblclick', function () {
        spanFav.style.color = "";
        delete pokemonFavorito[pokemonActual.id];
        window.localStorage.setItem('jsonFavoritos', JSON.stringify(pokemonFavorito));
        jsonFavorito = JSON.parse(window.localStorage.getItem('jsonFavoritos'));
    });
}
/**
 * Esta funcion extrae el pokemon creado del localstorage y lo agrega a la funcion vercartas para que se muestre junto a las demas
 */
function agregarPokemon() {
    console.log(jsonAgregarPokemon);

    divMain.setAttribute('class', 'divMain');
    for (let i in jsonAgregarPokemon) {
        let divCard = document.createElement('div');
        divCard.setAttribute('class', 'card');
        let divIcons = document.createElement('div');
        divIcons.setAttribute('class', 'card-icons');

        let spanDel = document.createElement('span');
        spanDel.setAttribute('class', 'material-symbols-outlined delete');
        spanDel.textContent = 'delete';

        let spanFav = document.createElement('span');
        spanFav.setAttribute('class', 'material-symbols-outlined fav');
        spanFav.textContent = 'favorite';

        let divImg = document.createElement('div');
        divImg.setAttribute('class', 'card-image');

        let imgPok = document.createElement('img');
        imgPok.src = "./img/insertados.gif";

        let divCont = document.createElement('div');
        divCont.setAttribute('class', 'card-content');

        let h2Nom = document.createElement('h2');
        h2Nom.textContent = jsonAgregarPokemon[i].nombre;

        let pId = document.createElement('p');
        pId.innerHTML = '<b>ID : </b>' + jsonAgregarPokemon[i].id;

        desocultar(spanDel, divCard, pokemonsCopy[i].id);

        let pTip = document.createElement('p');
        pTip.innerHTML = '<b>TIPOS : </b>' + jsonAgregarPokemon[i].tipos;

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
    }
}
//*LLAMADAS A LAS FUNCIONES
puntero();
buscarPorTipo();
buscador()
Bom();
verCartas();