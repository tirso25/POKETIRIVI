let id = JSON.parse(window.localStorage.getItem('idPokemon'));
console.log(id);
let tiposPokemon = new Set();
let main = document.querySelector('main');
//!NOS DA FALLOS
/* pVolver.addEventListener('dclick', function () {
    history.back();
}); */

let buttonVolver = document.createElement('button');
let pVolver = document.createElement('p');
let aVolver = document.createElement('a');
aVolver.setAttribute('href', './index.html');
pVolver.textContent = "VOLVER";
main.appendChild(aVolver);
aVolver.appendChild(buttonVolver);
buttonVolver.appendChild(pVolver);

/**
 * Creamos el formulario con document y llamamos a insertarTipos pasando los datos de los tipos
 */
function crearFormulario() {
    let div = document.createElement('div');
    let form = document.createElement('form');
    let inputNombre = document.createElement('input');
    let select1 = document.createElement('select');
    let select2 = document.createElement('select');
    let inputEnviar = document.createElement('input');
    let titulo = document.createElement('h2');

    titulo.textContent = "Agregar Pokémon";
    div.setAttribute('class', 'form');
    inputNombre.setAttribute('type', 'text');
    inputNombre.setAttribute('name', 'nombre_pokemon');
    inputNombre.setAttribute('placeholder', 'Nombre : ');
    inputNombre.setAttribute('required', '');

    select1.setAttribute('name', 'tipo_pokemon1');
    select1.setAttribute('required', '');

    select2.setAttribute('name', 'tipo_pokemon2');

    inputEnviar.setAttribute('class', 'enviar');
    inputEnviar.setAttribute('type', 'submit');
    inputEnviar.setAttribute('name', 'enviar_pokemon');

    main.appendChild(div);
    div.appendChild(titulo);
    div.appendChild(form);
    form.appendChild(inputNombre);
    form.appendChild(select1);
    form.appendChild(select2);
    form.appendChild(inputEnviar);

    insertarTipos([select1, select2]);
}
/**
 * Traemos los tipos del array de los pokemons para ponerlos en los selects, estos los almacenamos en un set para no repetir los tipos
 * @param {*} selectElements -  array de los tipos
 */
function insertarTipos(selectElements) {
    for (let i in pokemon) {
        let tipo = pokemon[i].tipos[0];
        let tipo2 = pokemon[i].tipos[1];

        tiposPokemon.add(tipo);
        tiposPokemon.add(tipo2);
    }

    for (let i = 0; i < selectElements.length; i++) {
        for (let j of tiposPokemon) {
            if (j == undefined) {
                j = "";
            }
            let option = document.createElement('option');
            option.setAttribute('value', j);
            option.textContent = j;
            selectElements[i].appendChild(option);
        }
    }
}
/**
 * Esta funcion crea un array con la infprmacion almacenada, la cual la extraemos con split del location.seacrh, una vez separada he introducida el el array se mete en el localstorage para utilizarla en la otra página
 */
function almacenarPokemonInsert() {
    let datosPokemonInsertar = JSON.parse(window.localStorage.getItem('jsonAgregar')) || [];

    let info = location.search;
    if (!info) {
        console.warn('No hay datos en la URL para procesar.');
        return;
    }

    let atributos = info.split("&");
    let nombre = decodeURIComponent(atributos[0].split("=")[1]);
    let tipo1 = decodeURIComponent(atributos[1].split("=")[1]);
    let tipo2 = decodeURIComponent(atributos[2].split("=")[1]);

    let nuevoPokemon = {
        id: id + 1,
        nombre: nombre,
        tipos: [tipo1, tipo2]
    };
    datosPokemonInsertar.push(nuevoPokemon);
    window.localStorage.setItem('jsonAgregar', JSON.stringify(datosPokemonInsertar));
    alert('Datos enviados correctamente');
}
crearFormulario();
almacenarPokemonInsert();