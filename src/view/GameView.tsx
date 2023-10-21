import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { ChinchilloApi } from '../core/chinchilloApi';
import styles from '../styles/game.module.css';
import { Form } from 'react-bootstrap';

type TransformStyle = {
  transform: string
};

export const GameView = () => {
  const navigate = useNavigate();

  const [animation, setAnimation] = useState<string>(`${styles.dice}`);
  const [firstDice, setFirstDice] = useState<{ [key: number]: TransformStyle }>({});
  const [secondDice, setSecondDice] = useState<{ [key: number]: TransformStyle }>({});
  const [thirdDice, setThirdDice] = useState<{ [key: number]: TransformStyle }>({});
  const [result, setresult] = useState<number>(0);
  const [cpu1Result, setCpu1Result] = useState<number>(0);
  const [cpu2Result, setCpu2Result] = useState<number>(0);

  const TransformStyles: TransformStyle[] = [
    { transform: `translate3d(0, 50px, 0) rotateX(-90deg)` },
    { transform: `translate3d(0, -50px, 0) rotateX(-90deg)` },
    { transform: `translate3d(0, 0, -50px)` },
    { transform: `translate3d(0, 0, 50px) rotateY(180deg)` },
    { transform: `translate3d(50px, 0, 0) rotateY(90deg)` },
    { transform: `translate3d(-50px, 0, 0) rotateY(-90deg)` },
  ];

  const getOrderNumbers = (target: number) => {
    const diceNumbers: number[] = [target, 7 - target,];
    if (target === 1 || target === 6) {
      diceNumbers.push(3, 4, 2, 5);
    } else if (target === 2 || target === 5) {
      diceNumbers.push(3, 4, 1, 6);
    } else {
      diceNumbers.push(1, 6, 2, 5);
    };
    const transformStyles: { [key: number]: TransformStyle } = {}
    diceNumbers.forEach((number, index) => {
      transformStyles[number] = TransformStyles[index]
    });
    return transformStyles;
  };

  const [myPoint, setMyPoint] = useState<number>(10);
  const [latch, setLatch] = useState<number>(1);
  const [resultDiceRollText, setResultDiceRollText] = useState<string>('');
  const [diceRollcount, setDiceRollCount] = useState<number>(1);

  const onPressStartDiceRoll = () => {
    setResultDiceRollText('');
    if (diceRollcount === 3) {
      setDiceRollCount(1);
    } else {
      setDiceRollCount(prev => prev + 1);
    }
    const { diceResult, firstDice, secondDice, thirdDice, resultMessage } = ChinchilloApi.getDiceRoll();
    const cpu1DiceResult: number = ChinchilloApi.getDiceRoll().diceResult.result;
    const cpu2DiceResult: number = ChinchilloApi.getDiceRoll().diceResult.result;
    const resultNumbers: number[] = [diceResult.result, cpu1DiceResult, cpu2DiceResult];
    const maxDiceResult: number = Math.max(...resultNumbers);
    setCpu1Result(cpu1DiceResult);
    setCpu2Result(cpu2DiceResult);
    setFirstDice(getOrderNumbers(firstDice));
    setSecondDice(getOrderNumbers(secondDice));
    setThirdDice(getOrderNumbers(thirdDice));
    setAnimation(`${styles.dice} ${styles.dice_anime2}`);
    setTimeout(() => {
      if (diceRollcount === 3) {
        if (resultNumbers.every(result => result === maxDiceResult)) {
          setResultDiceRollText('引き分け：' + resultMessage);
        } else if (diceResult.result === maxDiceResult) {
          setMyPoint(prev => prev + (latch * diceResult.rate));
          setResultDiceRollText('勝利：' + resultMessage);
        } else {
          setMyPoint(prev => prev - (latch * diceResult.rate));
          setResultDiceRollText('敗北：' + resultMessage);
        }
        setresult(diceResult.result);
      }
      setAnimation(`${styles.dice}`);
    }, 2000);
  };

  return (<>
    <div className={styles.container}>
      <div className={styles.top_dice_box}>
        <div className={styles.cpu1}>
          <div className={styles.result}>{cpu1Result}</div>
        </div>
        <div className={styles.sphere}>
          <div className={animation}>
            <div className={styles.item} style={firstDice[1]}></div>
            <div className={styles.item} style={firstDice[2]}></div>
            <div className={styles.item} style={firstDice[3]}></div>
            <div className={styles.item} style={firstDice[4]}></div>
            <div className={styles.item} style={firstDice[5]}></div>
            <div className={styles.item} style={firstDice[6]}></div>
          </div>
        </div>
        <div className={styles.cpu1}>
          <div className={styles.result}>{cpu2Result}</div>
        </div>
      </div>
      <div className={styles.bottom_dice_box}>
        <div className={styles.sphere}>
          <div className={animation}>
            <div className={styles.item} style={secondDice[1]}></div>
            <div className={styles.item} style={secondDice[2]}></div>
            <div className={styles.item} style={secondDice[3]}></div>
            <div className={styles.item} style={secondDice[4]}></div>
            <div className={styles.item} style={secondDice[5]}></div>
            <div className={styles.item} style={secondDice[6]}></div>
          </div>
        </div>
        <div className={styles.sphere}>
          <div className={animation}>
            <div className={styles.item} style={thirdDice[1]}></div>
            <div className={styles.item} style={thirdDice[2]}></div>
            <div className={styles.item} style={thirdDice[3]}></div>
            <div className={styles.item} style={thirdDice[4]}></div>
            <div className={styles.item} style={thirdDice[5]}></div>
            <div className={styles.item} style={thirdDice[6]}></div>
          </div>
        </div>
      </div>
      <button className={styles.start_button} onClick={onPressStartDiceRoll}>DICE ROLL</button>
      <p>{myPoint}</p>
      <p>{latch}</p>
      <div>{resultDiceRollText}{diceRollcount}</div>
    </div>
    <button className={styles.start_button} onClick={() => setLatch(prev => prev + 1)}>UP</button>
    <button className={styles.start_button} onClick={() => setLatch(prev => prev - 1)}>DOWN</button>
  </>);
}

