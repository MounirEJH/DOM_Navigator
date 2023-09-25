// Constantes globales
const anchoTablero = 8;
const altoTablero = 8;

// Método window.onload
// Añadir aquí solamente:
//  1.Registro de listeners de eventos del DOM
window.onload = function () {

    var radioButtons = document.getElementsByName('modo');
    const casillas = document.querySelectorAll('.casilla');
    var casillaSeleccionada = null;

    radioButtons.forEach((radioButton) => {
        radioButton.addEventListener('change', () => {

            switch (radioButton.id) {
                case 'modoCasilla':
                    limpiarTablero();

                    casillas.forEach(casilla => {
                        casilla.addEventListener('click', () => {
                            limpiarTablero();
                            casillaSeleccionada = casilla;
                            const casillas = document.querySelectorAll('.casilla');
                            const index = Array.from(casillas).indexOf(casillaSeleccionada);
                            const x = index % anchoTablero;

                            const fila = casillaSeleccionada.parentElement;
                            const casillasFila = fila.querySelectorAll(".casilla");
                            casillasFila[x].classList.add("casillaSel");

                            let path = '';
                            let node = casilla;

                            while (node !== document.documentElement) {

                                let nodeName = node.nodeName.toUpperCase();
                                let nodeClass = '';
                                if (nodeName !== 'HTML') {
                                    nodeClass = node.classList.value;
                                }

                                path = `${nodeName}.${nodeClass}/${path}`;
                                node = node.parentNode;
                            }
                            path = '#document/' + path;

                            document.querySelector('#nodePath').textContent = path.slice(0, -1);
                        });
                    });
                    break;

                case 'modoFila':
                    limpiarTablero();

                    casillas.forEach(casilla => {
                        casilla.addEventListener('click', () => {
                            limpiarTablero();
                            if (casillaSeleccionada && casilla !== casillaSeleccionada) {
                                casillaSeleccionada.classList.remove('casillaSel');
                            }
                            casillaSeleccionada = casilla;
                            const casillas = document.querySelectorAll('.casilla');
                            const index = Array.from(casillas).indexOf(casillaSeleccionada);

                            //Al padre
                            const fila = casillaSeleccionada.parentElement;
                            const casillasFila = fila.querySelectorAll('.casilla');

                            casillasFila.forEach(casilla => {
                                casilla.classList.add('casillaSel');
                            });

                        });
                    });
                    break;

                case 'modoCol':
                    limpiarTablero();

                    casillas.forEach(casilla => {
                        casilla.addEventListener('click', () => {
                            limpiarTablero();
                            if (casillaSeleccionada && casilla !== casillaSeleccionada) {
                                casillaSeleccionada.classList.remove('casillaSel');
                            }
                            casillaSeleccionada = casilla;
                            const casillas = document.querySelectorAll('.casilla');
                            const index = Array.from(casillas).indexOf(casillaSeleccionada);
                            const x = index % anchoTablero;

                            //Al padre
                            const fila = casillaSeleccionada.parentElement;
                            const tablero = fila.parentElement;

                            tablero.querySelectorAll(".linea").forEach(fila => {
                                const casillas = fila.querySelectorAll(".casilla");
                                casillas[x].classList.add("casillaSel");
                            });
                        });
                    });
                    break;

                default:
                    console.log('No se reconoce la opción seleccionada');
            }
        });
    });
};

function limpiarTablero() {
    const casillasSeleccionadas = document.querySelectorAll(".casillaSel");
    casillasSeleccionadas.forEach(function (casilla) {
        casilla.classList.remove("casillaSel");
    });
}
