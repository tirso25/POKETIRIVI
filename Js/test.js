// let main = document.querySelector('main');
// let divMain = document.createElement('div');
// divMain.setAttribute('class', 'divMain');

for (let i in pokemon) {
    let estadisticas = pokemon[i].estadisticas_base;
    for (let key in estadisticas) {
        console.log(`${key}: ${estadisticas[key]}`);
    }
}