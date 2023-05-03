//****** GAME LOOP ********//

var time = new Date();
var deltaTime = 0;

if(document.readyState === "complete" || document.readyState === "interactive"){
    setTimeout(Init, 1);
}else{
    document.addEventListener("DOMContentLoaded", Init); 
}

function Init() {
    time = new Date();
    Start();
    Loop();
}

function Loop() {
    deltaTime = (new Date() - time) / 1000;
    time = new Date();
    Update();
    requestAnimationFrame(Loop);
}

//****** GAME LOGIC ********//

var nivelDelMar = 100;
var nivelDelMarCubriendo = 60;
var velY = 0;
var impulso = 900;
var impulsoEnAgua = 500;
var gravedad = 2500;
var densidad = 0.00035;
var coeficienteRozamiento = 0.01;

var dinoPosX = 42;
var dinoPosY = nivelDelMar; 

var sueloX = 0;
var velEscenario = 1280/3;
var gameVel = 1;
var score = 0;

var parado = false;
var saltando = false;

var tiempoHastaMoneda = 2;
var tiempoMonedaMin = 0.3;
var tiempoMonedaMax = 1.8;
var monedaMinY = 5;
var monedaMaxY = 320;

var tiempoHastaObstaculo = 2;
var tiempoObstaculoMin = 0.7;
var tiempoObstaculoMax = 1.8;

var interactuables = [];

var tiempoHastaNube = 0.5;
var tiempoNubeMin = 0.7;
var tiempoNubeMax = 2.7;
var maxNubeY = 320;
var minNubeY = 160;
var nubes = [];
var velNube = 0.5;

var contenedor;
var dino;
var textoScore;
var suelo;
var gameOver;
var audioMoneda;
var audioSalto;
var audioGameOver;

function Start() {
    gameOver = document.querySelector(".game-over");
    suelo = document.querySelector(".suelo");
    contenedor = document.querySelector(".contenedor");
    textoScore = document.querySelector(".score");
    dino = document.querySelector(".dino");
    audioMoneda = document.querySelector(".audio-moneda");
    audioSalto = document.querySelector(".audio-salto");
    audioGameOver = document.querySelector(".audio-gameOver");
    document.addEventListener("keydown", HandleKeyDown);
}

function Update() {
    if(parado) return;
    
    MoverDinosaurio();
    MoverSuelo();
    DecidirCrearMonedas();
    DecidirCrearObstaculos();
    DecidirCrearNubes();
    MoverInteractuables();
    MoverNubes();
    DetectarColision();

    if(dinoPosY >= nivelDelMar) { //fuera del agua

        velY -= gravedad * deltaTime;
    }else{
        var empuje = VolumenSumergido() * densidad * gravedad;
        var rozamiento = Math.sign(velY) * velY * velY * coeficienteRozamiento;
        velY += (empuje - rozamiento - gravedad) * deltaTime;
    }
}

function VolumenSumergido() {
    if(dinoPosY >= nivelDelMar) { //fuera del agua
        return 0;
    }else {
        return dino.clientWidth * Math.min(nivelDelMar - dinoPosY, dino.clientHeight);
    }
}

function HandleKeyDown(ev){
    if(ev.keyCode == 32){
        Saltar();
    }
}

function Saltar(){
    if(!saltando){
        saltando = true;
        dino.classList.remove("dino-corriendo");
        audioSalto.currentTime = 0;
        audioSalto.play();
        if(dinoPosY > nivelDelMarCubriendo){
            velY = impulso;
        }else{
            velY = impulsoEnAgua;
        }
    }
}

function MoverDinosaurio() {
    if(dinoPosY < nivelDelMarCubriendo){
        TocarSuelo();
    }
    dinoPosY += velY * deltaTime;
    dino.style.bottom = dinoPosY+"px";
}






















