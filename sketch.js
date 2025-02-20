let train = true;
let input1 = 0;
let input2 = 1;
let input3 = 2;
let input4 = 3;
let iterations = 0; // Contador de iterações

function setup() {
    createCanvas(500, 500);
    background(0);

    nn = new RedeNeural(2, 5, 1);

    // Problema XOR
    dataset = {
        inputs: [
            [1, 1],
            [1, 0],
            [0, 1],
            [0, 0]
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
    if (train) {
        for (let i = 0; i < 1000; i++) {
            let index = floor(random(4));
            nn.train(dataset.inputs[index], dataset.outputs[index]);
            iterations++; // Incrementa o contador de iterações
        }

        let allConditionsMet = true;

        for (let input = 0; input < 4; input++) {
            let prediction = nn.predict(dataset.inputs[input]);

            // Correção: acessar o primeiro elemento do array de saída
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
}
