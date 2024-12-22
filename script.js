window.addEventListener('load', init);

let treasurePicArr = [];
let treasureWeightArr = [];
let treasureValueArr = [];

const C = 7;
const W = [3, 1, 3, 4, 2];
const V = [2, 2, 4, 5, 3];
let DP;

function knapSack() {
    // tjekker at der er en capacity
    if (C < 0 || W.length != V.length || W.length == null || V.length == null) {
        throw new Error('Invalid input: Check that weights and values');
    }
    // laver 2D arrayet
    const DP = [];
    for (let i = 0; i <= W.length; i++) {
        const row = [];
        DP.push(row);
        for (let j = 0; j <= C; j++) {
            const cell = 0;
            row.push(cell);
        }
    }
    // definer antal objekter
    const N = W.length;
    for (let i = 1; i <= N; i++) {
        let w = W[i - 1];
        let v = V[i - 1];

        for (let c = 1; c <= C; c++) {
            DP[i][c] = DP[i - 1][c];
            if (c >= w && DP[i - 1][c - w] + v > DP[i][c]) {
                DP[i][c] = DP[i - 1][c - w] + v;
            }
        }
    }

    let itemsAdded = [];
    let capacity = C;

    for (let i = N; i > 0; i--) {
        // console.log("nuværende obj " + DP[i][capacity]);
        // console.log("forrige obj " + DP[i - 1][capacity]);

        if (DP[i][capacity] != DP[i - 1][capacity]) {
            console.log();
            itemsAdded.push(V[i - 1]);
            capacity = capacity - W[i - 1];
        } else {
            //console.log("false");
        }
    }
    //console.log(itemsAdded);
    return DP[N][C];
}

//console.log(knapSack());

//#region Controller

function init() {
    console.log('Programmet kører');
    setUpEventListeners();
}

//#endregion

//#region Model

//#endregion

//#region View

//#endregion

function setUpEventListeners() {
    document.querySelector('#capacity').addEventListener('change', setCapacity);
    document.querySelector('#treasures').addEventListener('change', setTreasure);
    document.querySelector('#solve-button').addEventListener('click', solveKnapsack);
    document.querySelector('#reset-button').addEventListener('click', resetKnapsack);
    document.querySelector('#stop-button').addEventListener('click', stopKnapsack);
}

function setCapacity(event) {
    const capacity = event.target.value;
    console.log('setCapacity: ' + capacity);
}

function setTreasure(event) {
    const amount = event.target.value;
    console.log('setTreasure: ' + amount);
    generateTreasures(amount);
}

function solveKnapsack() {
    console.log('solveKnapsack');
}

function resetKnapsack() {
    console.log('resetKnapsack');
}

function stopKnapsack() {
    console.log('stopKnapsack');
}

function clearArrays() {
    treasurePicArr = [];
    treasureValueArr = [];
    treasureWeightArr = [];
}

function generateTreasures(amount) {
    clearArrays();

    for (let i = 1; i <= amount; i++) {
        const generateTreasure = Math.ceil(Math.random() * 10);
        console.log('Generated this number: ' + generateTreasure);

        treasurePicArr.push(treasurepool[generateTreasure].img);
        treasureValueArr.push(treasurepool[generateTreasure].value);
        treasureWeightArr.push(treasurepool[generateTreasure].weight);
    }
    console.log(treasurePicArr);
    console.log(treasureValueArr);
    console.log(treasureWeightArr);
    clearTreasureTable();
    treasurePicArr.forEach(showArray);
    DP = createGrid(C, treasureValueArr.length);
}

function createGrid() {
    // laver 2D arrayet
    const DP = [];
    for (let i = 0; i <= W.length; i++) {
        const row = [];
        DP.push(row);
        for (let j = 0; j <= C; j++) {
            const cell = 0;
            row.push(cell);
        }
    }
    return DP;
}

function displayGrid() {
    const grid = document.querySelector('.grid');
}

function showArray(element, index) {
    const table = document.querySelector('#treasure-table-content');

    const html = /*html*/ `
 <th> 
 <td>${index + 1}</td>
 <td>${treasurePicArr[index]}</td>
 <td>${treasureWeightArr[index]}</td>
 <td>${treasureValueArr[index]}</td>
 </th>

  `;
    table.insertAdjacentHTML('beforeend', html);
}

const treasurepool = {
    1: {
        img: 'skull',
        value: 5,
        weight: 10,
    },
    2: {
        img: 'sword',
        value: 5,
        weight: 10,
    },
    3: {
        img: 'fish',
        value: 5,
        weight: 1,
    },
    4: {
        img: 'crown',
        value: 10,
        weight: 10,
    },
    5: {
        img: 'golden-goose',
        value: 5,
        weight: 10,
    },
    6: {
        img: 'sack-of-gold',
        value: 5,
        weight: 10,
    },
    7: {
        img: 'redfin-snapper',
        value: 5,
        weight: 3,
    },
    8: {
        img: 'rum',
        value: 7,
        weight: 10,
    },
    9: {
        img: 'treasure-map',
        value: 5,
        weight: 6,
    },
    10: {
        img: 'hook',
        value: 4,
        weight: 3,
    },
};

function clearTreasureTable() {
    const table = document.querySelector('#treasure-table-content');
    table.innerHTML = '';
}
