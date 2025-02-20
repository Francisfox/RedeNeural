let train = true;
let iterations = 0; // Contador de iterações

function setup() {
    createCanvas(500, 500);
    background(0);

    nn = new RedeNeural(2, 5, 1);

    // Problema XOR
    dataset = {
        inputs: [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1]
        ],
        outputs: [
            [0],
            [1],
            [1],
            [0]
        ]
    };
}

function draw() {
    background(0);

    if (train) {
        for (let i = 0; i < 1000; i++) {
            let index = floor(random(4));
            nn.train(dataset.inputs[index], dataset.outputs[index]);
            iterations++;
        }

        let allConditionsMet = true;

        for (let input = 0; input < 4; input++) {
            let prediction = nn.predict(dataset.inputs[input]);

            if (Math.abs(prediction - dataset.outputs[input][0]) > 0.02) {
                allConditionsMet = false;
            }
        }

        if (allConditionsMet) {
            train = false;
            console.log("Número total de iterações:", iterations);
            for (let input = 0; input < 4; input++) {
                console.log(nn.predict(dataset.inputs[input]));
            }
            console.log("terminou");
        }
    }

    // Adicionar sinalização de fim de treinamento
    if (!train) {
        fill(0, 255, 0);
        textSize(20);
        textAlign(CENTER, CENTER);
        text("Concluído!", width / 2, height - 20);
    }


    // Desenhar os pontos e exibir previsões
    drawPredictions();

    // Exibir a caixa de iteração
    drawIterationBox();

    drawIterationBoxRetorno1();
    drawIterationBoxRetorno2();
}

function drawPredictions() {
    let spacing = 100; // Espaçamento entre os pontos
    let offsetX = 200; // Posição horizontal fixa para centralizar os pontos
    let offsetY = 100; // Posição vertical inicial para o primeiro ponto

    for (let i = 0; i < 4; i++) {
        let x = dataset.inputs[i][0];
        let y = dataset.inputs[i][1];

        let pred = nn.predict([x, y])[0]; // Pegando a predição da rede neural
        let colorValue = (pred > 0.5) ? 255 : 0; // Se a previsão for maior que 0.5, é 1 (branco), caso contrário 0 (preto)

        let posX = offsetX; // Posição horizontal fixa
        let posY = offsetY + i * spacing; // Posição vertical para os pontos (um abaixo do outro)

        // Cor do círculo baseada na predição
        fill(colorValue);
        stroke(255);
        ellipse(posX, posY, 50, 50);

        // Exibir o valor previsto dentro do círculo
        fill(255 - colorValue);
        textAlign(CENTER, CENTER);
        textSize(16);
        text(pred.toFixed(2), posX, posY);
    }
}

function drawIterationBox() {
    // Caixa de fundo para as iterações
    fill(0, 150);
    noStroke();
    rect(10, height - 60, 200, 50); // Mudando a posição da caixa para a parte inferior

    // Texto exibindo a iteração atual
    fill(255);
    textSize(16);
    textAlign(LEFT, TOP);
    text("Iterações: " + iterations, 20, height - 50); // Posicionando o texto na parte inferior
}
function drawIterationBoxRetorno1() {
    // Caixa de fundo para as iterações
    fill(0, 150);
    noStroke();
    rect(10, height - 60, 200, 50); // Mudando a posição da caixa para a parte inferior

    // Texto exibindo a iteração atual
    fill(255);
    textSize(16);
    textAlign(LEFT, TOP);
    text("Instruções ", 300, 150); // Posicionando o texto na parte inferior
}
function drawIterationBoxRetorno2() {
    // Caixa de fundo para as iterações
    fill(0, 150);
    noStroke();
    rect(10, height - 60, 200, 50); // Mudando a posição da caixa para a parte inferior

    // Texto exibindo a iteração atual
    fill(255);
    textSize(16);
    textAlign(LEFT, TOP);
    text("Instruções ", 300, 350); // Posicionando o texto na parte inferior
}