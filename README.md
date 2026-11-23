# Cruzadinha de Arquitetura Computacional

Jogo de palavras cruzadas que roda no navegador, feito em HTML, CSS e JavaScript puros, para treinar os termos da aula de Tópicos de Arquitetura Computacional (Atividade Avaliativa III · Sprint 3).

**Jogue aqui:** https://SEU-USUARIO.github.io/arqcomp-cruzadinha/

## Como jogar

1. Leia as pistas numeradas, separadas em **Horizontais** e **Verticais**.
2. Clique numa casa do tabuleiro e digite as letras direto nela. Termos compostos vão sem espaço (por exemplo, `DATABUS`) e sem acento.
3. Use as setas do teclado para andar pelo tabuleiro. A barra de espaço, ou um novo clique numa casa de cruzamento, troca entre horizontal e vertical. Clicar numa pista leva você até a palavra dela.
4. Clique em **Conferir** para ver quais palavras estão certas (✓, casas verdes) e quais estão erradas ou incompletas (✗). O contador mostra quantas palavras você acertou, por exemplo "8 de 16 palavras".
5. Clique em **Reiniciar** para limpar o tabuleiro e jogar de novo.

## Palavras e pistas

O tabuleiro usa as 16 palavras da lista da atividade.

| Nº | Direção | Termo | Pista |
|----|---------|-------|-------|
| 1 | Vertical | dual core | Processador com dois núcleos de execução no mesmo chip. |
| 2 | Horizontal | EEPROM | Memória não volátil que pode ser apagada e regravada eletricamente, byte a byte. |
| 3 | Vertical | memória de massa (armazenamento) | Guarda arquivos de forma permanente e em grande volume, como HD ou SSD. |
| 4 | Vertical | ROM | Memória não volátil gravada na fábrica, cujo conteúdo normalmente não é alterado. |
| 5 | Horizontal | quad core | Processador com quatro núcleos de execução no mesmo chip. |
| 6 | Horizontal | DMA | Técnica que permite a periféricos transferir dados com a memória sem ocupar a CPU. |
| 7 | Vertical | address bus (barramento de endereço) | Caminho de sentido único pelo qual a CPU indica a posição de memória a acessar. |
| 8 | Horizontal | microcontrolador | Chip único com processador, memória e portas de entrada e saída, comum em sistemas embarcados. |
| 9 | Horizontal | registradores | Pequenas posições de armazenamento dentro da CPU, as mais rápidas de todas. |
| 10 | Horizontal | cache | Memória rápida e pequena entre CPU e RAM que guarda dados acessados com frequência. |
| 10 | Vertical | CPU | Chip que executa as instruções dos programas; o cérebro do computador. |
| 11 | Vertical | RAM | Memória principal, volátil, que guarda programas e dados em execução; perde tudo sem energia. |
| 12 | Horizontal | UC (Unidade de Controle) | Parte da CPU que busca, decodifica e comanda a execução de cada instrução. |
| 13 | Horizontal | data bus (barramento de dados) | Caminho bidirecional que leva informações entre CPU, memória e periféricos. |
| 14 | Vertical | ULA | Parte da CPU que faz as contas e as operações lógicas. |
| 15 | Horizontal | Flash | Memória não volátil apagada em blocos, usada em pendrives e cartões SD. |

## Estrutura do projeto

- `index.html`: página do jogo
- `style.css`: visual do tabuleiro e das pistas
- `script.js`: dados das palavras, montagem do tabuleiro, botões Conferir e Reiniciar
- `README.md`: este arquivo
