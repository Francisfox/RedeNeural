let train = true;
let iterations = 0; 

let input1, input2, predictButton, resultText;
let nn; // Variável para a rede neural

function setup() {
    createCanvas(500, 500);
    background(0);

    // Certifique-se de que a classe RedeNeural está carregada
    try {
        nn = new RedeNeural(2, 10, 1);
    } catch (e) {
        console.error("Erro ao criar a rede neural:", e);
        return;
    }

    console.log("Rede Neural inicializada!");

    dataset = {
        inputs: [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1]
        ],
        outputs: [
            [0],
            [0],
            [0],
            [1]
        ]
    };

    // Criar inputs para usuário inserir valores
    input1 = createInput('0');
    input1.position(20, 20);
    input1.size(40);

    input2 = createInput('0');
    input2.position(80, 20);
    input2.size(40);

    // Botão para prever
    predictButton = createButton('Prever');
    predictButton.position(140, 20);
    predictButton.mousePressed(makePrediction);

    // Texto do resultado
    resultText = createP('Resultado: ');
    resultText.position(20, 40);
    resultText.style('color', 'white');
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

            if (Math.abs(prediction[0] - dataset.outputs[input][0]) > 0.02) {
                allConditionsMet = false;
            }
        }

        if (allConditionsMet) {
            train = false;
            console.log("Número total de iterações:", iterations);
            for (let input = 0; input < 4; input++) {
                console.log(nn.predict(dataset.inputs[input]));
            }
            console.log("Treinamento concluído");
        }
    }

    if (!train) {
        fill(0, 255, 0);
        textSize(20);
        textAlign(CENTER, CENTER);
        text("Concluído!", width / 2, height - 20);
    }

    drawPredictionsOutput();
    drawPredictions();
    drawIterationBox();
    
    
}


// Função para prever baseado no input do usuário
function makePrediction() {
    let val1 = parseFloat(input1.value());
    let val2 = parseFloat(input2.value());

    if (isNaN(val1) || isNaN(val2)) {
        resultText.html("Entrada inválida!");
        return;
    }

    let output = nn.predict([val1, val2]);

    if (Array.isArray(output)) {
        resultText.html("Resultado: " + output[0].toFixed(2));
    } else {
        console.error("Erro: saída inesperada de nn.predict()");
    }
}

function drawPredictionsOutput() {
    let spacing = 60;
    let offsetX = 400;
    let offsetY = 150;

    for (let i = 0; i < 4; i++) {
        let x = dataset.inputs[i][0];
        let y = dataset.inputs[i][1];

        let pred = nn.predict([x, y]);
        let colorValue = (pred[0] > 0.5) ? 255 : 0;

        let posX = offsetX;
        let posY = offsetY + i * spacing;

        fill(colorValue);
        stroke(255);
        ellipse(posX, posY, 50, 50);

        fill(255 - colorValue);
        textAlign(CENTER, CENTER);
        textSize(16);
        text(pred[0].toFixed(2), posX, posY);
    }
}
function drawPredictions() {
    let spacing = 60;
    let offsetX = 200;
    let offsetY = 100;

    for (let i = 0; i < 5; i++) {
        let x = 0;
        let y = 0;

        let pred = nn.predict([x, y]);
        let colorValue = (pred[0] > 0.5) ? 255 : 0;

        let posX = offsetX;
        let posY = offsetY + i * spacing;

        fill(colorValue);
        stroke(255);
        ellipse(posX, posY, 50, 50);

        fill(255 - colorValue);
        textAlign(CENTER, CENTER);
        textSize(16);
        text(pred[0].toFixed(2), posX, posY);
    }
    // Desenhar linhas entre os círculos
    stroke(100, 100, 255); // Cor azulada para destacar as conexões
    strokeWeight(2);
    line(200, 150, 400, 150);
}
function drawIterationBox() {
    fill(0, 150);
    noStroke();
    rect(10, height - 60, 200, 50);

    fill(255);
    textSize(16);
    textAlign(LEFT, TOP);
    text("Iterações: " + iterations, 20, height - 50);
}
