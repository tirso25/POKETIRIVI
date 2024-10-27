for (const key in tareas) {
    let li = document.createElement('li');
    li.textContent = tareas[key].titulo;
    if (tareas[key].completada) {
        li.setAttribute('class', 't');
    } else {
        li.setAttribute('class', 'f');
    }
    ListaOrdenada.appendChild(li);
}
let img = document.createElement('img');
img.setAttribute('src', '/img/1.png');
frame.appendChild(img);



let img = document.createElement('img');
img.src = "./img/1.png";
frame.appendChild(img)
