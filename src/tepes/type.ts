export type TransformStyle = {
    transform: string
};

export type Dice = 1 | 2 | 3 | 4 | 5 | 6;

export type DiceRollResult = {
    diceResult: {
        result: number;
        rate: number;
    }
    resultMessage: string;
    firstDice: Dice;
    secondDice: Dice;
    thirdDice: Dice;
};

export const initialDiceRollResult: DiceRollResult = {
    diceResult: {
        result: 0,
        rate: 0
    },
    resultMessage: '',
    firstDice: 1,
    secondDice: 1,
    thirdDice: 1
};

export type Cpu = {
    diceRollResult: DiceRollResult;
    diceNumbers: Dice[];
};

export const initialCpu = {
    first: '',
    second: '',
    third: ''
};

export const DiceNumber = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six'
};
