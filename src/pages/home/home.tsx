import React, { FC } from 'react';

import { Link } from 'components-ui/link';
import { Block } from 'components-ui/block';
import { Title } from 'components-ui/title';
import { Space } from 'components-ui/space';
import { Button } from 'components-ui/button';
import { PLAY, PROFILE, STATISTICS, FORUM } from 'core/url';

import map1 from './images/map1.png';
import map2 from './images/map2.png';
import map3 from './images/map3.png';
import './home.scss';

const PageHome: FC = () => {
  return (
    <Space type="vertical">
      <Block center page="home" type="flex" className="home-block">
        <Title style={{ marginTop: -20 }}>Выберите карту</Title>
        <Space type="horizontal" position="center">
          <Link to={PLAY}>
            <img src={map1} alt="map1" />
          </Link>
          <Link to={PLAY}>
            <img src={map2} alt="map2" />
          </Link>
          <Link to={PLAY}>
            <img src={map3} alt="map3" />
          </Link>
        </Space>
      </Block>
      <Space type="horizontal">
        <Link type="button" to={PROFILE}>
          Профиль
        </Link>
        <Link type="button" to={STATISTICS}>
          Таблица лидеров
        </Link>
        <Link type="button" to={FORUM}>
          Форум
        </Link>
        <Button radius>Выйти из игры</Button>
      </Space>
    </Space>
  );
};

export { PageHome };
export default PageHome;
