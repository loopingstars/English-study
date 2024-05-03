///////////////////////////////
////Variaveis
///////////////////////////////
var button = document.querySelector("#button")
var Text = document.querySelectorAll(".Texti");
var conteudoCSV = document.querySelector("#input");
var audioSelect = document.querySelector("#audio-play");
var Main = document.querySelector("#Main");
var globalArray = [];
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
////Converter CSV
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
function ouvirVARS() {
  Text = addEventListener("click", play_audio());
}
///////////////////////////////
////Criar DIV
///////////////////////////////
function CriarDIV(texto, number) {
  let div = document.querySelector(".Texti");
  Main.appendChild(div.cloneNode(true));
  
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
function play_audio(){
  console.log("foi");
  audioSelect.play();
}
///////////////////////////////


input.addEventListener('change', function (event) {
  const arquive = event.target.files[0];
  read_CSV(arquive, function (content) {
    globalArray = Convert_CSV(content);
  })
});

function iniciar() {
  for (var i = 0; i < globalArray.length; i++) {
    CriarDIV(globalArray[i][0], i);
  }
  for (var i = 0; i < globalArray.length; i++) {
    alterarDIV(globalArray[i][0], i);
  }
}

//document.querySelector(".div-text").addEventListener("click", () => {play_audio()});
button.addEventListener("click", () => {
  iniciar();
});






