///////////////////////////////
////Variaveis
///////////////////////////////
var button = document.querySelector("#button")
var Text = document.querySelectorAll(".Texti");
var conteudoCSV = document.querySelector("#input");
var audioSelect = document.querySelector("#audio-play");
var modulo = document.querySelector('#Modulo');
var Main = document.querySelector("#Main");
var textArray = [];
var AudioArray = [];
var AudioTexto = [];
///////////////////////////////

///////////////////////////////
////Leitura do CSV
///////////////////////////////
function read_CSV(file, callback) {
  const reader = new FileReader();
  reader.onload = function(event) {
    const content = event.target.result;
    callback(content);
  };
  reader.readAsText(file);
}
///////////////////////////////
///////////////////////////////
////Juntar AUDIO + TEXTO 
///////////////////////////////
function AudioTextoArray() {
  
}
///////////////////////////////
////Popular array de audios
///////////////////////////////
function audio_arrays_populate(event){
    for (const file of event.target.files) {
      let text = String(file.webkitRelativePath);
      AudioArray.push(text);
    }
    
}
///////////////////////////////
function Convert_CSV(conteudoCSV) {
  const lines = conteudoCSV.split('\n');
  const arrayCSV = [];

  lines.forEach(function (line) {
    const values = line.split(',');
    arrayCSV.push(values);
  });

  return arrayCSV;
}
///////////////////////////////

///////////////////////////////
////Criar DIV
///////////////////////////////
function CriarDIV(texto, number) {
  let variable = document.createElement('div');
  variable.innerHTML = '<div class="Texti" onclick="TextoAction()"></div>';
  
  Main.appendChild(variable);
}
///////////////////////////////
function alterarDIV(texto, number) {
  let divs = document.querySelectorAll(".Texti")[number];
  divs.id = "texto" + number;
  divs.innerHTML = texto;
  
}
///////////////////////////////
////Iniciar audio
///////////////////////////////
function play_audio(Path){
  audioSelect.setAttribute('src', Path);
  audioSelect.play();
}
///////////////////////////////
document.getElementById("filepicker").addEventListener(
  "change",
  (event) => {
    for (const file of event.target.files) {
      let text = String(file.webkitRelativePath);
      AudioArray.push(text);
    }
  },
  false,
);

input.addEventListener('change', function (event) {
  const arquive = event.target.files[0];
  read_CSV(arquive, function (content) {
    textArray = Convert_CSV(content);
  })
});
///////////////////////////////
////Texto Action
///////////////////////////////
function TextoAction() {
  let Path = (modulo.options[modulo.selectedIndex].value + AudioArray[0]);
  console.log(Path);
  play_audio(Path)
}
///////////////////////////////
///////////////////////////////
////Comparar Arrays
///////////////////////////////

///////////////////////////////
function iniciar() {
  for (var i = 0; i < textArray.length -1; i++) {
    CriarDIV(textArray[i][0], i);
  }
  for (var i = 0; i < textArray.length -1; i++) {
    alterarDIV(textArray[i][1], i);
    
  }
}

button.addEventListener("click", () => {
  iniciar();
});





