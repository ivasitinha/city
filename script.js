const canvas = document.getElementById('cenarioCanvas');
const ctx = canvas.getContext('2d');

// Ajusta o tamanho do canvas para cobrir a janela
function redimensionarCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
redimensionarCanvas();
window.addEventListener('resize', redimensionarCanvas);

// --- CARREGAMENTO DE IMAGENS ---
const bgImage = new Image();
bgImage.src = 'bg.jpg';

const carImage = new Image();
carImage.src = 'car.png';

const motoImage = new Image();
motoImage.src = 'motobike.png';

let imagensCarregadas = 0;
function verificarCarregamento() {
  imagensCarregadas++;
  if (imagensCarregadas === 3) {
    requestAnimationFrame(loopPrincipal);
  }
}

bgImage.onload = verificarCarregamento;
carImage.onload = verificarCarregamento;
motoImage.onload = verificarCarregamento;

// --- CONFIGURAÇÕES DO CENÁRIO E VEÍCULOS ---

let bgX = 0;
const velocidadeFundo = 5;

// Carro (Ajustado no limite inferior do asfalto)
const carro = {
  xProporcao: 0.55,      // Posição horizontal na tela
  larguraDesejada: 240,  // Tamanho do carro
  offsetY: 0.995         // Posição vertical (máximo para baixo)
};

// Moto (Ajustada no limite inferior do asfalto)
const moto = {
  xProporcao: 0.25,      // Posição horizontal na tela
  larguraDesejada: 140,  // Tamanho da moto
  offsetY: 1.0           // Posição vertical (máximo para baixo)
};

// --- LOOP DE ANIMAÇÃO ---

function loopPrincipal() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 1. Mover apenas o Fundo em Loop Contínuo
  bgX -= velocidadeFundo;
  const larguraBgProporcional = canvas.height * (bgImage.width / bgImage.height);

  if (bgX <= -larguraBgProporcional) {
    bgX = 0;
  }

  let xAtual = bgX;
  while (xAtual < canvas.width) {
    ctx.drawImage(bgImage, xAtual, 0, larguraBgProporcional, canvas.height);
    xAtual += larguraBgProporcional;
  }

  // 2. Desenhar o Carro
  const alturaCarro = carro.larguraDesejada * (carImage.height / carImage.width);
  const carroX = canvas.width * carro.xProporcao;
  const carroY = (canvas.height * carro.offsetY) - alturaCarro;
  ctx.drawImage(carImage, carroX, carroY, carro.larguraDesejada, alturaCarro);

  // 3. Desenhar a Moto
  const alturaMoto = moto.larguraDesejada * (motoImage.height / motoImage.width);
  const motoX = canvas.width * moto.xProporcao;
  const motoY = (canvas.height * moto.offsetY) - alturaMoto;
  ctx.drawImage(motoImage, motoX, motoY, moto.larguraDesejada, alturaMoto);

  requestAnimationFrame(loopPrincipal);
}
