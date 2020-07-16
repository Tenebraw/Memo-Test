const cartas = document.querySelectorAll('.memo-cartas');
const findeljuego = document.querySelector('#fin-juego');
let turnos = 0;
let match = 0;
let cartaGirada = false;
let bloquearTablero = false;
let primeraCarta, segundaCarta;

function girarCartas() {
    if (bloquearTablero) return;
    if (this === primeraCarta) return;

    this.classList.add('girar');

    if (!cartaGirada) {
        // Si no hay carta girada entonces su estado es true.
        cartaGirada = true;
        primeraCarta = this; //carta cliqueada.

        return;
    }

    // Segundo click
    segundaCarta = this;
    chequearCoincidencias();
}

function chequearCoincidencias() {
    if (primeraCarta.dataset.control === segundaCarta.dataset.control) {
        desactivarCartas();
        turnos++;
        match++;
        evaluarFinDeJuego();
        return;
    }
    quitarGirarCartas();
    turnos++;
}

function desactivarCartas() {
    primeraCarta.removeEventListener('click', girarCartas);
    segundaCarta.removeEventListener('click', girarCartas);

    resetearTablero();
}

function quitarGirarCartas() {
    bloquearTablero = true;

    setTimeout(() => {
        primeraCarta.classList.remove('girar');
        segundaCarta.classList.remove('girar');
        resetearTablero();

    }, 1500);
}

function resetearTablero() {
    [cartaGirada, bloquearTablero] = [false, false];
    [primeraCarta, segundaCarta] = [null, null];
}

document.body.onload = mezclarCartas();

function mezclarCartas() {
    cartas.forEach(carta => {
        let randomPos = Math.floor(Math.random() * 16);
        carta.style.order = randomPos;
    });
}

cartas.forEach(carta => carta.addEventListener('click', girarCartas));

function evaluarFinDeJuego() {
    if (match === 8) {
        findeljuego.querySelector('strong').textContent = turnos.toString();
        document.querySelector('#fin-juego').style.display = 'block';
    }
}

function EmpezardeNuevo() {

    window.location.reload(false);


}