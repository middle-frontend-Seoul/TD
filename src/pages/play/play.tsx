import React, { FC, useRef, useState, useEffect, useCallback } from 'react';

import { Space } from 'components-ui/space';
import { Stats } from 'components-ui/stats';
import { Block } from 'components-ui/block';
import { Modal } from 'components-ui/modal';
import { Button } from 'components-ui/button';

import { Game } from 'games';

// import sell from 'images/tools/sell.png';
import { gridPlayOne } from './grid';
import './style.scss';

const PagePlay: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const towersRef = useRef<HTMLLIElement>(null);

  // TODO: информация об ошибке в стайте является временныь решением
  const [error, setError] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !towersRef.current) return;

    try {
      const game = new Game(canvasRef.current, gridPlayOne);
      game.renderTowers(towersRef.current);
      game.start();
    } catch (err) {
      setError(err.message);
    }
  }, [canvasRef, towersRef]);

  const onClickPause = useCallback(() => setMenuVisible(true), []);
  const onClickCloseMenu = useCallback(() => setMenuVisible(false), []);

  return (
    <Block relative page="play">
      {error && <div>{error}</div>}
      <canvas ref={canvasRef} width={900} height={570} />
      <div className="play-footer">
        <ul className="tools">
          <li className="tools__item towers" ref={towersRef} />
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
      <Modal isOpen={menuVisible} onClose={onClickCloseMenu}>
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
