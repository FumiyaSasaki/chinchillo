import { TransformStyle } from "../tepes/type";

export const TransformStyles: TransformStyle[] = [
    // 上面
    { transform: `translate3d(0, 50px, 0) rotateX(-90deg)` },
    { transform: `translate3d(0, -50px, 0) rotateX(-90deg)` },
    { transform: `translate3d(0, 0, -50px)` },
    // 左下
    { transform: `translate3d(0, 0, 50px) rotateY(180deg)` },
    { transform: `translate3d(50px, 0, 0) rotateY(90deg)` },
    // 右下
    { transform: `translate3d(-50px, 0, 0) rotateY(-90deg)` },
];

export const getOrderNumbers = (target: number) => {
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