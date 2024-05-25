///////////////////////////////
////Variaveis
///////////////////////////////
var button = document.querySelector('#button')
var Text = document.querySelectorAll('Texti');
var conteudoCSV = document.querySelector('#input');
var audioSelect = document.querySelector("#audio-play");
var modulo = document.querySelector('#Modulo');
var Main = document.querySelector('#Main');
var faixaAtual = document.querySelector('#faixaAtual');
var texCompleto = document.querySelector('#TextoCompleto')
var textArray = [];
var AudioArray = [];
var AudioTexto = [];
var audioIndexAudios = 0;
var faixaAudio = 0;
var listenerAudioEnd = false;
///////////////////////////////

///////////////////////////////
////Leitura do CSV
///////////////////////////////
function read_CSV(file, callback) {
  const reader = new FileReader();
  reader.onload = function (event) {
    const content = event.target.result;
    callback(content);
  };
  reader.readAsText(file);
}
///////////////////////////////

///////////////////////////////
////Popular array de audios
///////////////////////////////

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
  let TextoDiv = document.createElement('div');
  let textoIngles = document.createElement('span');
  let textoTraduzido = document.createElement('span');
  TextoDiv.innerHTML = '<div class="Texti" onclick="TextoAction(' + number + ')"></div>';
  textoIngles.innerHTML = '<span class="TextoIngles" id="teste" onclick="TextoAction(' + number + ')"></span>';
  textoTraduzido.innerHTML = '<span class="TextoTraduzido" onclick="TextoAction(' + number + ')"></span';
  Main.appendChild(TextoDiv);
  TextoDiv.appendChild(textoIngles);
  TextoDiv.appendChild(textoTraduzido);

}
///////////////////////////////
///////////////////////////////
////Alterar valoes da div
///////////////////////////////
function alterarDIV(textoInglesParam, textoTraduzidoParam, number) {
  let div = document.querySelectorAll(".Texti")[number];
  let textoIngles = document.querySelectorAll(".TextoIngles")[number];
  let textoTraduzido = document.querySelectorAll(".TextoTraduzido")[number];
  div.id = "texto" + number;
  textoIngles.id = "texto" + number;
  textoTraduzido.id = "texto" + number;
  textoIngles.innerHTML = textoInglesParam.replace(";", ",");
  textoTraduzido.innerHTML = textoTraduzidoParam.replace(";", ",");
  div.classList.toggle('TextiJS');
  textoIngles.classList.toggle('TextoInglesJS');
  textoTraduzido.classList.toggle('TextoTraduzidoJS');
  textoTraduzido.classList.toggle('TextoTraduzidoBLUR');
}
///////////////////////////////

///////////////////////////////
////Iniciar audio
///////////////////////////////
function play_audio(Path) {
  audioSelect.setAttribute('src', Path);
  audioSelect.play();
}


///////////////////////////////
////Popular array de audios
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
////Popular arrayDeTexto
input.addEventListener('change', function (event) {
  const arquive = event.target.files[0];
  read_CSV(arquive, function (content) {
    textArray = Convert_CSV(content);
  })
});
///////////////////////////////
////Texto Action
///////////////////////////////
function TextoAction(number) {
  let Path = (modulo.options[modulo.selectedIndex].value + AudioArray[number]);
  play_audio(Path)
}
///////////////////////////////
///////////////////////////////
////Animação das setas
///////////////////////////////
document.querySelector("#setaCurva").addEventListener('click', () => {

});
///////////////////////////////
///////////////////////////////
////Alterar tema do site
///////////////////////////////
document.querySelector('#diaEnoite').addEventListener('click', () => {

});
///////////////////////////////
function executarAudios() {
  if (audioIndexAudios == textArray.length) {
    listenerAudioEnd = false;
  }
  if (audioIndexAudios <= textArray.length && listenerAudioEnd == true) {
    play_audio(modulo.options[modulo.selectedIndex].value + AudioArray[audioIndexAudios]);
    audioIndexAudios++;
  }
}
///////////////////////////////
////Verificar tecla digitada 
////e executar o audio.
///////////////////////////////
document.addEventListener("keydown", function (event) {

  if (event.key == 'a' && faixaAudio >= 1) {
    faixaAudio--;
    faixaAtual.innerHTML = (faixaAudio) + " - " + textArray[faixaAudio][0].replace(";", ",");
  }
  if (event.key == 's') {
    play_audio(modulo.options[modulo.selectedIndex].value + AudioArray[faixaAudio]);
  }
  if (event.key == 'd' && faixaAudio <= textArray.length - 2) {
    faixaAudio++;
    faixaAtual.innerHTML = (faixaAudio) + " - " + textArray[faixaAudio][0].replace(";", ",");
  }
  if (event.key == 'e') {
    document.querySelector('.square2').classList.toggle('menuAnimation');
  }

  if (event.key == 'r') {
    listenerAudioEnd = true;
    executarAudios();
  }
  if (event.key == 'p') {
    audioSelect.pause();
    audioIndexAudios = 0;
    listenerAudioEnd = false;
    

  }

  if (event.key == 'b') {
    console.log("32");
    var cssRuleList = [...document.styleSheets[0].cssRules].filter(rule => rule.selectorText == ".TextoTraduzidoBLUR");
    for (let cssRule of cssRuleList) {
      cssRule.style.filter = "blur(5px)";
    }
  }
  if (event.key == 'v') {
    var cssRuleList = [...document.styleSheets[0].cssRules].filter(rule => rule.selectorText == ".TextoTraduzidoBLUR");
    for (let cssRule of cssRuleList) {
      cssRule.style.filter = "blur(0px)";
    }
  }

});

audioSelect.addEventListener('ended', () => {
  if (audioIndexAudios == textArray.length) {
    listenerAudioEnd = false;
  }
  if (audioIndexAudios < textArray.length && listenerAudioEnd == true) {
    executarAudios();
  }

});
///////////////////////////////
function texto_completo() {
  var textoNovo = [];
    textArray.forEach((item)=>{
      textoNovo.push(item[0]);
    });
  texCompleto.innerHTML = textoNovo.join(" ").replace(";", ",");
}




///////////////////////////////
function iniciar() {

  for (var i = 0; i < textArray.length ; i++) {
    CriarDIV(textArray[i][0], i);
  }
  for (var i = 0; i < textArray.length ; i++) {
    alterarDIV(textArray[i][0], textArray[i][1], i);
  }
}
button.addEventListener("click", () => {
  texto_completo();
  iniciar();
});
///////////////////////////////


