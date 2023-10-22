import React, { useCallback, useEffect, useState } from 'react';
import styles from '../styles/game.module.css';
import { TransformStyle } from '../tepes/type';
export const DiceDisplay = React.memo(({
    animation, displayDice
}: {
    animation: string, displayDice: { [key: number]: TransformStyle }
}) => {
    return (<div className={styles.sphere}>
        <div className={animation}>
            <div className={styles.item} style={displayDice[1]}></div>
            <div className={styles.item} style={displayDice[2]}></div>
            <div className={styles.item} style={displayDice[3]}></div>
            <div className={styles.item} style={displayDice[4]}></div>
            <div className={styles.item} style={displayDice[5]}></div>
            <div className={styles.item} style={displayDice[6]}></div>
        </div>
    </div>)
});