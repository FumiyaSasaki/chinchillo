import React, { useCallback, useEffect, useState } from 'react';
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
  const [gameCount, setGameCount] = useState<number>(0);

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

  const setDisplayDiceResultForCpu = () => {

  };

  const [myPoint, setMyPoint] = useState<number>(10);
  const [latch, setLatch] = useState<number>(1);
  const [resultDiceRollText, setResultDiceRollText] = useState<string>('');
  const [diceRollcount, setDiceRollCount] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);

  const onPressDiceRollFirst = () => {
    setResultDiceRollText('');
    setDisabled(true);
    const { diceResult, firstDice, secondDice, thirdDice, resultMessage } = ChinchilloApi.getDiceRoll();
    const nowDiceRollcount: number = diceRollcount + 1;
    const isFirstDiceRoll: boolean = nowDiceRollcount === 1;
    const isFinishDiceRoll: boolean = nowDiceRollcount === 3 || diceResult.result > 0;
    const cpu1DiceResult: number = isFirstDiceRoll ? ChinchilloApi.getDiceRoll().diceResult.result : cpu1Result;
    const cpu2DiceResult: number = isFirstDiceRoll ? ChinchilloApi.getDiceRoll().diceResult.result : cpu2Result;
    const resultNumbers: number[] = [diceResult.result, cpu1DiceResult, cpu2DiceResult];
    const maxDiceResult: number = Math.max(...resultNumbers);
    setDiceRollCount(isFinishDiceRoll ? 0 : prev => prev + 1);
    if (nowDiceRollcount === 1) {
      setCpu1Result(cpu1DiceResult);
      setCpu2Result(cpu2DiceResult);
    }
    setFirstDice(getOrderNumbers(firstDice));
    setSecondDice(getOrderNumbers(secondDice));
    setThirdDice(getOrderNumbers(thirdDice));
    setAnimation(`${styles.dice} ${styles.dice_anime2}`);
    setTimeout(() => {
      if (isFinishDiceRoll) {
        if (resultNumbers.every(result => result === maxDiceResult)) {
          setResultDiceRollText('引き分け：' + resultMessage);
        } else if (diceResult.result === maxDiceResult) {
          setMyPoint(prev => prev + (latch * diceResult.rate));
          setResultDiceRollText('勝利：' + resultMessage);
        } else {
          setMyPoint(prev => prev - (latch * diceResult.rate));
          setResultDiceRollText('敗北：' + resultMessage);
        }
        setGameCount(prev => prev + 1);
      } else {
        setResultDiceRollText('もう一度回してください！');
      }
      setAnimation(`${styles.dice}`);
      setDisabled(false);
    }, 2000);
  };

  const onPressRestartGame = () => {
    setMyPoint(10);
    setResultDiceRollText('');
    setGameCount(0);
  };

  return (<>
    <div className={styles.container}>
      {(gameCount === 2 || myPoint <= 0) &&
        <dialog open className={styles.modal_container}>
          <p>ゲーム終了しました。</p>
          <p>最終得点は{myPoint}です</p>
          <button onClick={onPressRestartGame}>もう一度最初から</button>
        </dialog>
      }
      <div className={styles.top_dice_box}>
        <div className={styles.cpu1}>
          <div className={styles.cpu_result}>{cpu1Result}</div>
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
          <div className={styles.cpu_result}>
            <img src="../images/five_dice.png" alt="" />
            <img src="../images/five_dice.png" alt="" />
            <img src="../images/five_dice.png" alt="" />
          </div>
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
      <div className={styles.button_box}>
        <button className={styles.start_button} onClick={onPressDiceRollFirst} disabled={disabled}>DICE ROLL</button>
        <button className={styles.start_button} onClick={() => setLatch(prev => prev + 1)} disabled={disabled || myPoint === latch}>UP</button>
        <button className={styles.start_button} onClick={() => setLatch(prev => prev - 1)} disabled={disabled || latch === 0}>DOWN</button>
      </div>
      <p>現在のポイント：{myPoint}</p>
      <p>賭けポイント：{latch}</p>
      <div>{resultDiceRollText}</div>
    </div>


  </>);
}

