import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../helper/route';

export const TopView = () => {
    const navigate = useNavigate();
    const onNavigateToGame = () => navigate(RoutePath.GameView);
    return <button onClick={onNavigateToGame}>Game</button>;
}
