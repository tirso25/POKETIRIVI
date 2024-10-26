function verCartas() {
    let main = document.querySelector('main');
    for (let i in pokemon) {
        let fieldset = document.createElement('fieldset');
        fieldset.setAttribute('id', 'frame');
        let legend = document.createElement('legend');
        let h1 = document.createElement('h1');
        h1.textContent = pokemon[i].nombre;
        legend.appendChild(h1);
        fieldset.appendChild(legend);
        main.appendChild(fieldset);
    }
}
verCartas();