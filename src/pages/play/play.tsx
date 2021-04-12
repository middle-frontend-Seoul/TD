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
import { gridPlayOne } from './grid';
import './style.scss';

const PagePlay: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameManager, setGameManager] = useState<Game>();

  // TODO: информация об ошибке в стайте является временныь решением
  const [error, setError] = useState('');
  const [isMenuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    try {
      const game = new Game(canvasRef.current, gridPlayOne);
      game.start();

      setGameManager(game);
    } catch (err) {
      setError(err.message);
    }
  }, [canvasRef]);

  const onClickPause = useCallback(() => setMenuVisible(true), []);
  const onClickCloseMenu = useCallback(() => setMenuVisible(false), []);

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
