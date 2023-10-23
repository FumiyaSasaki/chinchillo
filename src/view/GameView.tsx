import React, { useState } from 'react';
import { ChinchilloApi } from '../core/chinchilloApi';
import styles from '../styles/game.module.css';
import { Cpu, Dice, DiceRollResult, TransformStyle, initialDiceRollResult } from '../tepes/type';
import { getOrderNumbers } from '../helper/gameViewHelper';
import { DiceDisplay } from '../components/DiceDisplay';
import { CpuDisplay } from '../components/CpuDisplay';

const GameMaxCount = 5;

export const GameView = () => {
  const [animation, setAnimation] = useState<string>(`${styles.dice}`);
  const [firstDice, setFirstDice] = useState<{ [key: number]: TransformStyle }>({});
  const [secondDice, setSecondDice] = useState<{ [key: number]: TransformStyle }>({});
  const [thirdDice, setThirdDice] = useState<{ [key: number]: TransformStyle }>({});
  const [cpu1, setCpu1] = useState<Cpu>({ diceRollResult: initialDiceRollResult, diceNumbers: [] });
  const [cpu2, setCpu2] = useState<Cpu>({ diceRollResult: initialDiceRollResult, diceNumbers: [] });
  const [gameCount, setGameCount] = useState<number>(0);
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
    const cpu1DiceResult: DiceRollResult = isFirstDiceRoll ? ChinchilloApi.getDiceRoll() : cpu1.diceRollResult;
    const cpu2DiceResult: DiceRollResult = isFirstDiceRoll ? ChinchilloApi.getDiceRoll() : cpu2.diceRollResult;
    const resultNumbers: number[] = [diceResult.result, cpu1DiceResult.diceResult.result, cpu2DiceResult.diceResult.result];
    const maxDiceResult: number = Math.max(...resultNumbers);
    if (nowDiceRollcount === 1) {
      const diceNumbersCpu1: Dice[] = [cpu1DiceResult.firstDice, cpu1DiceResult.secondDice,
      cpu1DiceResult.thirdDice].sort((a, b) => a - b);
      const diceNumbersCpu2: Dice[] = [cpu2DiceResult.firstDice, cpu2DiceResult.secondDice,
      cpu2DiceResult.thirdDice].sort((a, b) => a - b);
      setCpu1({ diceRollResult: cpu1DiceResult, diceNumbers: diceNumbersCpu1 });
      setCpu2({ diceRollResult: cpu2DiceResult, diceNumbers: diceNumbersCpu2 });
    }
    setDiceRollCount(isFinishDiceRoll ? 0 : prev => prev + 1);
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
        setResultDiceRollText('もう一度回してください');
      }
      setAnimation(`${styles.dice}`);
      setDisabled(false);
    }, 2000);
  };

  const onPressRestartGame = () => {
    setMyPoint(10);
    setResultDiceRollText('');
    setGameCount(0);
    setLatch(1);
  };

  return (<>
    <div className={styles.container}>
      {(gameCount === GameMaxCount || myPoint <= 0) &&
        <dialog open className={styles.modal_container}>
          <div className={styles.modal_box}>
            <p>{myPoint <= 0 ? 'ゲームオーバーです' : 'ゲーム終了しました'}</p>
            <p>最終得点は{myPoint}です</p>
            <button onClick={onPressRestartGame}>もう一度最初から</button>
          </div>
        </dialog>}
      <div className={styles.top_dice_box}>
        <CpuDisplay diceNumbers={cpu1.diceNumbers} />
        <DiceDisplay animation={animation} displayDice={firstDice} />
        <CpuDisplay diceNumbers={cpu2.diceNumbers} />
      </div>
      <div className={styles.bottom_dice_box}>
        <DiceDisplay animation={animation} displayDice={secondDice} />
        <DiceDisplay animation={animation} displayDice={thirdDice} />
      </div>
      <div className={styles.button_box}>
        <button className={styles.start_button} onClick={onPressDiceRollFirst} disabled={disabled}>DICE ROLL</button>
        <button className={styles.start_button} onClick={() => setLatch(prev => prev + 1)} disabled={disabled || myPoint === latch}>UP</button>
        <button className={styles.start_button} onClick={() => setLatch(prev => prev - 1)} disabled={disabled || latch === 1}>DOWN</button>
      </div>
      <div className={styles.point_box}>
        <p>現在のポイント：{myPoint}</p>
        <p>賭けポイント：{latch}</p>
        <p>残りゲーム数：{GameMaxCount - gameCount}</p>
      </div>
      <div>{resultDiceRollText}</div>
    </div>
  </>);
}