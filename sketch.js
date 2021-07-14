var train = true;
var input1 = 0;
var input2 = 1;
var input3 = 2;
var input4 = 3;

function setup() {
    createCanvas(500, 500);
    background(0);

    nn = new RedeNeural(2, 3, 1);

    // XOR Problem
    dataset = {
        inputs:
            [[1, 1],
             [1, 0],
             [0, 1],
             [0, 0]
            ],
        outputs:
            [[1],
             [0],
             [1],
             [0]
            ]
    }
}

function draw() {
    if (train) {
        for (var i = 0; i < 1000; i++) {
            var index = floor(random(4));
            nn.train(dataset.inputs[index], dataset.outputs[index]);
        }
        if (nn.predict(dataset.inputs[input1]) > 0.98 && nn.predict(dataset.inputs[input4]) < 0.04) {
            train = false;
            console.log(nn.predict(dataset.inputs[input1]));
            console.log(nn.predict(dataset.inputs[input2]));
            console.log(nn.predict(dataset.inputs[input3]));
            console.log(nn.predict(dataset.inputs[input4]));
        
            console.log("terminou");
        }
    }
}