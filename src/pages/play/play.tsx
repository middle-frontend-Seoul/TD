import React, { FC, useRef, useState, useEffect } from 'react';

import { Space } from 'components-ui/space';
import { Stats } from 'components-ui/stats';
import { Block } from 'components-ui/block';
import { Modal } from 'components-ui/modal';
import { Button } from 'components-ui/button';
import { Canvas } from 'components-ui/canvas';
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
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const game = new Game(canvasRef.current, gridPlayOne);
    game.start();
  }, [canvasRef]);

  const onClickPause = () => setMenuVisible(true);
  const onClickCloseMenu = () => setMenuVisible(false);

  return (
    <Block relative page="play">
      <Canvas width={900} height={570} ref={canvasRef} />
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
      <Modal open={menuVisible} onClose={onClickCloseMenu}>
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
