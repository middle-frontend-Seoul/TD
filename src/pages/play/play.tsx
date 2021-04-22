import React, {
  FC,
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';

import { Card } from 'components-ui/card';
import { Space } from 'components-ui/space';
import { Stats } from 'components-ui/stats';
import { Block } from 'components-ui/block';
import { Modal } from 'components-ui/modal';
import { Button } from 'components-ui/button';

import { Game, Towers } from 'games';

import sell from 'images/tools/sell.png';
import openFS from 'images/tools/open-fullscreen.png';
import closeFS from 'images/tools/exit-fullscreen.png';
import { gridPlayOne } from './grid';
import './style.scss';

const PagePlay: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameManager, setGameManager] = useState<Game>();
  const [isFullscreenMode, setFullscreenMode] = useState<boolean>(false);

  // TODO: информация об ошибке в стайте является временныь решением
  const [error, setError] = useState('');
  const [isMenuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    let game: Game;
    if (canvasRef.current) {
      try {
        game = new Game(canvasRef.current, gridPlayOne);
        game.init();
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
    gameManager?.pause();
    setMenuVisible(true);
  }, [gameManager]);

  const onClickCloseMenu = useCallback(() => {
    gameManager?.start();
    setMenuVisible(false);
  }, [gameManager]);

  // -- Renders --
  // -------------
  const renderTowers = useMemo(() => {
    const builder = gameManager?.getTowersBuilder();

    return Towers.map((Tower) => {
      const tower = new Tower();

      const onDragTower = () => {
        if (builder) builder.onDrag(Tower);
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
            names={['Очки', 'Волна', 'Жизни', 'Ресурсы']}
            values={[200010, '#1', 3, '30 B']}
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
          <Button radius>Завершить игру</Button>
        </Space>
      </Modal>
    </Block>
  );
};

export { PagePlay };
export default PagePlay;
