import { Dice, DiceRollResult } from "../tepes/type";

export namespace ChinchilloApi {
    const getRandomInt = (min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    };

    export const getDiceRoll = (): DiceRollResult => {
        const firstDice: Dice = getRandomInt(1, 7) as Dice;
        const secondDice: Dice = getRandomInt(1, 7) as Dice;
        const thirdDice: Dice = getRandomInt(1, 7) as Dice;
        let resultMessage = ''
        let diceResult = { result: 0, rate: 1 };
        if (firstDice === 1 && secondDice === 1 && thirdDice === 1) {
            resultMessage = '出目はピンゾロ';
            diceResult = { result: 9, rate: 5 };
        } else if (firstDice === secondDice && secondDice === thirdDice && thirdDice === firstDice) {
            resultMessage = `出目は${firstDice}のゾロ目`;
            diceResult = { result: 8, rate: 3 };
        } else if (firstDice !== secondDice && secondDice !== thirdDice && firstDice + secondDice + thirdDice === 15) {
            resultMessage = '出目はシゴロ'
            diceResult = { result: 7, rate: 2 }
        } else if (firstDice === secondDice && secondDice !== thirdDice) {
            resultMessage = `出目は${thirdDice}`;
            diceResult = { result: thirdDice, rate: 1 };
        } else if (secondDice === thirdDice && thirdDice !== firstDice) {
            resultMessage = `出目は${firstDice}`;
            diceResult = { result: firstDice, rate: 1 };
        } else if (thirdDice === firstDice && firstDice !== secondDice) {
            resultMessage = `出目は${secondDice}`;
            diceResult = { result: secondDice, rate: 1 };
        } else if (firstDice !== secondDice && firstDice !== thirdDice && secondDice !== thirdDice && firstDice + secondDice + thirdDice === 6) {
            resultMessage = '出目はヒフミ';
            diceResult = { result: -1, rate: -1 };
        } else {
            resultMessage = '出目無し';
            diceResult = { result: 0, rate: 1 };
        }
        return { diceResult, resultMessage, firstDice, secondDice, thirdDice };
    };
}