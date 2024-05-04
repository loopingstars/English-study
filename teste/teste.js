var main = document.querySelector("#main");
var my = document.createElement('button');
var input = document.querySelector("#input");
var modulo = document.querySelector('#Modulo');
var aula = document.querySelector('#Aula');
var audio = document.querySelector('#audio');

var arrays = [];
var clicar = document.querySelector("#clicar").addEventListener('click', () => {
    my.innerHTML = '<button id="clicar2" class="minhaclasse">clicar2</button>';
    main.appendChild(my);
});

document.getElementById("filepicker").addEventListener(
    "change",
    (event) => {
      for (const file of event.target.files) {
        let text = String(file.webkitRelativePath);
        arrays.push(text);
      }
    },
    false,
  );

document.querySelector('#clicar').addEventListener('click', () => {
    modulo = modulo.options[modulo.selectedIndex].value;
    console.log(modulo);
    console.log(arrays);
    let Path = (modulo + arrays[1]);
    audio.setAttribute('src', Path);
    audio.play();
} );
