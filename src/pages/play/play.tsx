import React, { FC, useRef, useState, useEffect, useCallback } from 'react';

import { Space } from 'components-ui/space';
import { Stats } from 'components-ui/stats';
import { Block } from 'components-ui/block';
import { Modal } from 'components-ui/modal';
import { Button } from 'components-ui/button';
import { Tools, ToolsItem } from 'components-ui/tools';

import { Game } from 'games';

import flamethrower from 'images/tools/flamethrower.png';
import mortar from 'images/tools/mortar.png';
import laser from 'images/tools/laser.png';
import sell from 'images/tools/sell.png';
import gun from 'images/tools/gun.png';

import { gridPlayOne } from './grid';
import './style.scss';

const PagePlay: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // TODO: информация об ошибке в стайте является временныь решением
  const [error, setError] = useState('');
  const [isMenuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    try {
      const game = new Game(canvasRef.current, gridPlayOne);
      game.start();
    } catch (err) {
      setError(err.message);
    }
  }, [canvasRef]);

  const onClickPause = useCallback(() => setMenuVisible(true), []);
  const onClickCloseMenu = useCallback(() => setMenuVisible(false), []);

  return (
    <Block relative page="play">
      {error && <div>{error}</div>}
      <canvas ref={canvasRef} width={900} height={570} />
      <div className="play-footer">
        <Tools>
          <ToolsItem src={gun} label="Пулемёт" footer="15 B" />
          <ToolsItem src={flamethrower} label="Огнемёт" footer="25 B" />
          <ToolsItem src={laser} label="Лазер" footer="40 B" />
          <ToolsItem src={mortar} label="Ракеты" footer="60 B" />
          <ToolsItem src={sell} label="Продать" />
        </Tools>
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
