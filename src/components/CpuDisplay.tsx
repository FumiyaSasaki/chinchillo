import React from 'react';
import styles from '../styles/game.module.css';
import { DiceNumber, Dice } from '../tepes/type';
export const CpuDisplay = React.memo(({
    diceNumbers
}: {
    diceNumbers: Dice[]
}) => {
    return (<div className={styles.cpu1}>
        <div className={styles.cpu_result}>
            {diceNumbers.length > 0 ? <>
                <img src={`../images/${DiceNumber[diceNumbers[0]]}_dice.png`} alt="" />
                <img src={`../images/${DiceNumber[diceNumbers[1]]}_dice.png`} alt="" />
                <img src={`../images/${DiceNumber[diceNumbers[2]]}_dice.png`} alt="" /></>
                : <p></p>}
        </div>
    </div>)
});