import { createBrowserRouter } from 'react-router-dom';
import { TopView } from '../view/TopView';
import { RoutePath } from '../helper/route';
import { GameView } from '../view/GameView';

export const router = createBrowserRouter([
  {
    path: RoutePath.TopView,
    element: <TopView />,
  },
  {
    path: RoutePath.GameView,
    element: <GameView />,
  },
]);