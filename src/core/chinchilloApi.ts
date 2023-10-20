export namespace ChinchilloApi {
    const getRandomInt = (min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    };

    export const getDiceRoll = () => {
        const firstDice: number = getRandomInt(1, 7);
        const secondDice: number = getRandomInt(1, 7);
        const thirdDice: number = getRandomInt(1, 7);
        let diceRoll = ''
        let diceResult = 0;
        if (firstDice === 1 && secondDice === 1 && thirdDice === 1) {
            diceRoll = '出目はピンゾロ';
            diceResult = 9
        } else if (firstDice === secondDice && secondDice === thirdDice && thirdDice === firstDice) {
            diceRoll = `出目は${firstDice}のゾロ目！`;
            diceResult = 8;
        } else if (firstDice !== secondDice && secondDice !== thirdDice && firstDice + secondDice + thirdDice === 15) {
            diceRoll = '出目はシゴロ'
            diceResult = 7
        } else if (firstDice === secondDice && secondDice !== thirdDice) {
            diceResult = thirdDice;
        } else if (secondDice === thirdDice && thirdDice !== firstDice) {
            diceResult = firstDice;
        } else if (thirdDice === firstDice && firstDice !== secondDice) {
            diceResult = secondDice;
        } else if (firstDice !== secondDice && firstDice !== thirdDice && secondDice !== thirdDice && firstDice + secondDice + thirdDice === 6) {
            // diceRoll = '出目はヒフミ！';
            diceResult = -1
        } else {
            diceResult = 0;
        }
        return { diceResult, firstDice, secondDice, thirdDice };
    };
}