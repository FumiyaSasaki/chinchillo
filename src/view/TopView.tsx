import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../helper/route';

export const TopView = () => {
    const navigate = useNavigate();
    const onNavigateToGame = () => navigate(RoutePath.GameView);
    return (
        <div>
            <Button variant='primary' onClick={onNavigateToGame}>Game</Button>
        </div>
    );
}
