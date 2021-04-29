import React, {
  FC,
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
  useReducer,
} from 'react';

import { useHistory } from 'react-router';

import { Card } from 'components-ui/card';
import { Space } from 'components-ui/space';
import { Stats } from 'components-ui/stats';
import { Block } from 'components-ui/block';
import { Modal } from 'components-ui/modal';
import { Button } from 'components-ui/button';

import { Game, uiReducer, initialUIState } from 'games/game';
import { Towers } from 'games/towers/towers';

import sell from 'images/tools/sell.png';
import openFS from 'images/tools/open-fullscreen.png';
import closeFS from 'images/tools/exit-fullscreen.png';
import { gridPlayOne } from '../../games/maps/grid_1';
import './style.scss';

const TILE_SIZE = 30;

const PagePlay: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameManager, setGameManager] = useState<Game>();
  const [isFullscreenMode, setFullscreenMode] = useState<boolean>(false);

  // TODO: информация об ошибке в стайте является временныь решением
  const [error, setError] = useState('');
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [uiState, setUIState] = useReducer(uiReducer, initialUIState);

  const history = useHistory();

  useEffect(() => {
    let game: Game;
    if (canvasRef.current) {
      try {
        game = new Game(canvasRef.current, gridPlayOne, setUIState, TILE_SIZE);
        game.start();

        setGameManager(game);
      } catch (err) {
        setError(err.message);
      }
    }
    return () => {
      game?.gameOver();
    };
  }, [canvasRef]);

  const onClickPause = useCallback(() => {
    if (gameManager?.pause()) {
      setMenuVisible(true);
    }
  }, [gameManager]);

  const onClickCloseMenu = useCallback(() => {
    if (gameManager?.start()) {
      setMenuVisible(false);
    }
  }, [gameManager]);

  // -- Renders --
  // -------------
  const renderTowers = useMemo(() => {
    const builder = gameManager?.getTowerPlacer();

    return Towers.map((Tower) => {
      const tower = new Tower({ x: 0, y: 0 }, TILE_SIZE);

      const onDragTower = () => {
        if (builder) builder.place(Tower);
      };

      return (
        <li key={tower.getName()} className="tools__item towers">
          <Card
            onClick={onDragTower}
            src={tower.pathImage}
            text={tower.getName()}
            price={tower.getPrice()}
          />
        </li>
      );
    });
  }, [gameManager]);

  // ceйчас api довольно бесполезная, сделано для соответствия требованиям 6-го спринта
  // TODO: изменить document.documentElement на block когда приложение научится масштабировать canvas
  const changeFullscreenMode = () => {
    setFullscreenMode(!isFullscreenMode);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const returnToMain = () => {
    history.push({
      pathname: '/',
    });
  };

  return (
    <Block relative page="play">
      {error && <div>{error}</div>}
      <canvas ref={canvasRef} width={900} height={570} />
      <div className="play-footer">
        <ul className="tools">
          {renderTowers}

          <li className="tools__item towers">
            <Card src={sell} text="Продать" />
          </li>
        </ul>

        <div className="play-stats">
          <Button size="xsmall" use="primary" onClick={onClickPause}>
            Пауза
          </Button>
          <Stats
            score={uiState.score}
            wave={uiState.wave}
            lives={uiState.lives}
          />
        </div>
        <div
          onKeyDown={changeFullscreenMode}
          className="fullscreen-button"
          role="button"
          tabIndex={0}
          onClick={changeFullscreenMode}
        >
          {isFullscreenMode ? (
            <img alt="" src={closeFS} />
          ) : (
            <img alt="" src={openFS} />
          )}
        </div>
      </div>
      <Modal isOpen={isMenuVisible} onClose={onClickCloseMenu}>
        <Space>
          <Button radius>Продолжить</Button>
          <Button radius>Начать сначала</Button>
          <Button radius onClick={returnToMain}>
            Завершить игру
          </Button>
        </Space>
      </Modal>
      <Modal isOpen={uiState.isGameEnded} onClose={() => undefined}>
        <Space>
          <div className="end-game-title">Игра завершена</div>
          <Button radius onClick={returnToMain}>
            Завершить игру
          </Button>
        </Space>
      </Modal>
    </Block>
  );
};

export { PagePlay };
export default PagePlay;
