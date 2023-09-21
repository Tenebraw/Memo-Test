const cartasContenedor = document.querySelector('.cartascontenedor');
const manojoCartas = document.querySelectorAll('.memocartas');

let match =0;
let turnos =0;
let primeraCarta,segundaCarta;
let cartaGirada=false;
let idCartas = [];
let imagenesCartas = [];


for(let i=0;i<manojoCartas.length;i++){
    idCartas.push('carta'+[i+1]);
}
for(let j=0;j<(manojoCartas.length)/2;j++){
    imagenesCartas.push('images/front'+[j+1]+'.jpg');
}

imagenesCartas.push(...imagenesCartas);

mezclarCartas(idCartas);
mezclarCartas(imagenesCartas);
repartirCartas(idCartas,imagenesCartas);

manojoCartas.forEach(carta => carta.addEventListener('click', girarCartas));

function repartirCartas(id,cartas){
    for(let j=0;j<id.length;j++){
    document.querySelector(`#${id[j]}`).src=cartas[j];
}} 

function girarCartas(){
    if(this===primeraCarta){return} 
    this.classList.add('girar');
    if(!cartaGirada){
        primeraCarta=this;
        cartaGirada=true;
        return;
    }  
    segundaCarta=this;
    bloquearClicks();
    comprobarPares();
}


function comprobarPares(){
   if(primeraCarta.firstElementChild.src== segundaCarta.firstElementChild.src){
    primeraCarta.removeEventListener('click', girarCartas);
    segundaCarta.removeEventListener('click', girarCartas);
    desbloquearClicks();
    cartaGirada=false;
    match++;
    turnos++;
    evaluarFinJuego();
    return;
   }
    setTimeout(()=>{
       primeraCarta.classList.remove('girar');
        segundaCarta.classList.remove('girar');
        turnos++;
       desbloquearClicks();
    cartaGirada=false;
    primeraCarta=null;
    segundaCarta=null;
    },1000);
}


function mezclarCartas(array) { // Metodo Fisher-Yates
    let currentIndex = array.length,  randomIndex;
   while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];    
    }
    return array;
  }


function evaluarFinJuego(){
    if(match===12){     
        document.querySelector('strong').textContent=`${turnos}`;
        document.querySelector('#fin-juego').style.display='block';
    }
}

function empezarDeNuevo(){
    document.querySelectorAll('.girar').forEach((e)=>{
        e.classList.remove('girar');
    });
    manojoCartas.forEach(carta => carta.addEventListener('click', girarCartas));
    document.querySelector('#fin-juego').style.display='none';
    match =0, 
    turnos =0; 
    primeraCarta=null;
    segundaCarta=null;
    cartaGirada=false;
    mezclarCartas(idCartas);
    mezclarCartas(imagenesCartas);
    repartirCartas(idCartas,imagenesCartas);
}

function bloquearClicks(){
    cartasContenedor.classList.add('bloquear');
}

function desbloquearClicks(){
    cartasContenedor.classList.remove('bloquear'); 
}