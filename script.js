// Cruzadinha de Arquitetura Computacional
// Cada palavra: número da pista, direção (H = horizontal, V = vertical),
// linha/coluna da primeira letra, resposta e pista.
const PALAVRAS = [
  {
    "num": 2,
    "dir": "H",
    "row": 0,
    "col": 4,
    "answer": "EEPROM",
    "clue": "Memória não volátil que pode ser apagada e regravada eletricamente, byte a byte."
  },
  {
    "num": 5,
    "dir": "H",
    "row": 2,
    "col": 0,
    "answer": "QUADCORE",
    "clue": "Processador com quatro núcleos de execução no mesmo chip."
  },
  {
    "num": 6,
    "dir": "H",
    "row": 2,
    "col": 11,
    "answer": "DMA",
    "clue": "Técnica que permite a periféricos transferir dados com a memória sem ocupar a CPU."
  },
  {
    "num": 8,
    "dir": "H",
    "row": 4,
    "col": 0,
    "answer": "MICROCONTROLADOR",
    "clue": "Chip único com processador, memória e portas de entrada e saída, comum em sistemas embarcados."
  },
  {
    "num": 9,
    "dir": "H",
    "row": 6,
    "col": 2,
    "answer": "REGISTRADORES",
    "clue": "Pequenas posições de armazenamento dentro da CPU, as mais rápidas de todas."
  },
  {
    "num": 10,
    "dir": "H",
    "row": 8,
    "col": 5,
    "answer": "CACHE",
    "clue": "Memória rápida e pequena entre CPU e RAM que guarda dados acessados com frequência."
  },
  {
    "num": 12,
    "dir": "H",
    "row": 10,
    "col": 5,
    "answer": "UC",
    "clue": "Parte da CPU que busca, decodifica e comanda a execução de cada instrução."
  },
  {
    "num": 13,
    "dir": "H",
    "row": 10,
    "col": 8,
    "answer": "DATABUS",
    "clue": "Caminho bidirecional que leva informações entre CPU, memória e periféricos."
  },
  {
    "num": 15,
    "dir": "H",
    "row": 12,
    "col": 6,
    "answer": "FLASH",
    "clue": "Memória não volátil apagada em blocos, usada em pendrives e cartões SD."
  },
  {
    "num": 1,
    "dir": "V",
    "row": 0,
    "col": 2,
    "answer": "DUALCORE",
    "clue": "Processador com dois núcleos de execução no mesmo chip."
  },
  {
    "num": 3,
    "dir": "V",
    "row": 0,
    "col": 9,
    "answer": "MEMORIADEMASSA",
    "clue": "Guarda arquivos de forma permanente e em grande volume, como HD ou SSD."
  },
  {
    "num": 4,
    "dir": "V",
    "row": 0,
    "col": 12,
    "answer": "ROM",
    "clue": "Memória não volátil gravada na fábrica, cujo conteúdo normalmente não é alterado."
  },
  {
    "num": 7,
    "dir": "V",
    "row": 2,
    "col": 13,
    "answer": "ADDRESSBUS",
    "clue": "Caminho de sentido único pelo qual a CPU indica a posição de memória a acessar."
  },
  {
    "num": 10,
    "dir": "V",
    "row": 8,
    "col": 5,
    "answer": "CPU",
    "clue": "Chip que executa as instruções dos programas; o cérebro do computador."
  },
  {
    "num": 11,
    "dir": "V",
    "row": 9,
    "col": 11,
    "answer": "RAM",
    "clue": "Memória principal, volátil, que guarda programas e dados em execução; perde tudo sem energia."
  },
  {
    "num": 14,
    "dir": "V",
    "row": 11,
    "col": 7,
    "answer": "ULA",
    "clue": "Parte da CPU que faz as contas e as operações lógicas."
  }
];

const LINHAS = 14;
const COLUNAS = 16;

const gridEl = document.getElementById("grid");
const listaH = document.getElementById("pistas-h");
const listaV = document.getElementById("pistas-v");

const celulas = {}; // "r,c" -> { input, palavras: [índices] }
let direcaoAtiva = "H";
let palavraAtiva = null;

function chave(r, c) { return r + "," + c; }

function posicoes(p) {
  const lista = [];
  for (let i = 0; i < p.answer.length; i++) {
    lista.push(p.dir === "H" ? [p.row, p.col + i] : [p.row + i, p.col]);
  }
  return lista;
}

function montarTabuleiro() {
  gridEl.style.setProperty("--colunas", COLUNAS);
  PALAVRAS.forEach((p, idx) => {
    posicoes(p).forEach(([r, c]) => {
      const k = chave(r, c);
      if (!celulas[k]) celulas[k] = { r, c, palavras: [], input: null };
      celulas[k].palavras.push(idx);
    });
  });

  for (let r = 0; r < LINHAS; r++) {
    for (let c = 0; c < COLUNAS; c++) {
      const cel = celulas[chave(r, c)];
      const div = document.createElement("div");
      if (!cel) {
        div.className = "vazia";
        gridEl.appendChild(div);
        continue;
      }
      div.className = "casa";
      const numero = PALAVRAS.find(p => p.row === r && p.col === c);
      if (numero) {
        const n = document.createElement("span");
        n.className = "num";
        n.textContent = numero.num;
        div.appendChild(n);
      }
      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = 1;
      input.autocomplete = "off";
      input.autocapitalize = "characters";
      input.spellcheck = false;
      input.setAttribute("aria-label", "Linha " + (r + 1) + ", coluna " + (c + 1));
      input.dataset.r = r;
      input.dataset.c = c;
      input.addEventListener("focus", () => aoFocar(cel));
      input.addEventListener("click", () => aoClicar(cel));
      input.addEventListener("input", () => aoDigitar(cel));
      input.addEventListener("keydown", e => aoTecla(e, cel));
      div.appendChild(input);
      cel.input = input;
      gridEl.appendChild(div);
    }
  }
}

function montarPistas() {
  PALAVRAS.forEach((p, idx) => {
    const li = document.createElement("li");
    li.id = "pista-" + idx;
    li.innerHTML = '<span class="n">' + p.num + '.</span> <span class="t"></span> <span class="status"></span>';
    li.querySelector(".t").textContent = p.clue + " (" + p.answer.length + " letras)";
    li.addEventListener("click", () => {
      direcaoAtiva = p.dir;
      const [r, c] = posicoes(p).find(([r, c]) => !celulas[chave(r, c)].input.value) || [p.row, p.col];
      celulas[chave(r, c)].input.focus();
    });
    (p.dir === "H" ? listaH : listaV).appendChild(li);
  });
}

function palavraDaCelula(cel) {
  const candidatas = cel.palavras.filter(i => PALAVRAS[i].dir === direcaoAtiva);
  if (candidatas.length) return candidatas[0];
  return cel.palavras[0];
}

function aoClicar(cel) {
  // clicar de novo numa casa de cruzamento alterna a direção
  if (palavraAtiva !== null && cel.palavras.length > 1 && document.activeElement === cel.input && cel._jaFocada) {
    direcaoAtiva = direcaoAtiva === "H" ? "V" : "H";
  }
  cel._jaFocada = true;
  destacar(cel);
}

function aoFocar(cel) {
  const unica = cel.palavras.length === 1;
  if (unica) direcaoAtiva = PALAVRAS[cel.palavras[0]].dir;
  destacar(cel);
  setTimeout(() => { if (document.activeElement === cel.input) cel.input.select(); }, 0);
}

function destacar(cel) {
  limparDestaque();
  palavraAtiva = palavraDaCelula(cel);
  direcaoAtiva = PALAVRAS[palavraAtiva].dir;
  posicoes(PALAVRAS[palavraAtiva]).forEach(([r, c]) => {
    celulas[chave(r, c)].input.parentElement.classList.add("ativa");
  });
  document.getElementById("pista-" + palavraAtiva).classList.add("ativa");
}

function limparDestaque() {
  document.querySelectorAll(".casa.ativa").forEach(e => e.classList.remove("ativa"));
  document.querySelectorAll("li.ativa").forEach(e => e.classList.remove("ativa"));
}

function aoDigitar(cel) {
  const v = cel.input.value.toUpperCase().replace(/[^A-Z]/g, "");
  cel.input.value = v.slice(-1);
  if (cel.input.value) mover(cel, 1);
}

function mover(cel, passo) {
  const p = PALAVRAS[palavraDaCelula(cel)];
  const pos = posicoes(p);
  const i = pos.findIndex(([r, c]) => r === cel.r && c === cel.c);
  const prox = pos[i + passo];
  if (prox) celulas[chave(prox[0], prox[1])].input.focus();
}

function vizinha(cel, dr, dc) {
  let r = cel.r + dr, c = cel.c + dc;
  while (r >= 0 && r < LINHAS && c >= 0 && c < COLUNAS) {
    const v = celulas[chave(r, c)];
    if (v) return v;
    r += dr; c += dc;
  }
  return null;
}

function aoTecla(e, cel) {
  const setas = { ArrowLeft: [0, -1], ArrowRight: [0, 1], ArrowUp: [-1, 0], ArrowDown: [1, 0] };
  if (setas[e.key]) {
    e.preventDefault();
    const [dr, dc] = setas[e.key];
    direcaoAtiva = dr === 0 ? "H" : "V";
    const v = vizinha(cel, dr, dc);
    if (v) v.input.focus();
  } else if (e.key === "Backspace" && !cel.input.value) {
    e.preventDefault();
    mover(cel, -1);
  } else if (e.key === " ") {
    e.preventDefault();
    direcaoAtiva = direcaoAtiva === "H" ? "V" : "H";
    destacar(cel);
  }
}

montarTabuleiro();
montarPistas();
