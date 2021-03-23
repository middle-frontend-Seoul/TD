import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { Link } from 'components-ui/link';
import { Block } from 'components-ui/block';
import { Title } from 'components-ui/title';
import { Space } from 'components-ui/space';
import { Button } from 'components-ui/button';
import { PLAY, PROFILE, STATISTICS, FORUM, SIGNIN } from 'core/url';

import map1 from './images/map1.png';
import map2 from './images/map2.png';
import map3 from './images/map3.png';
import './home.scss';

const PageHome: FC = () => {
  const history = useHistory();

  const onClickButton = (data: unknown) => history.push(data as string);
  const onClickLogout = () => history.push(SIGNIN);

  return (
    <Space type="vertikale">
      <Block
        center
        className="home-block"
        style={{ height: 'calc(100vh - 200px)', minHeight: 300 }}
      >
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
        <Button radius onClick={onClickButton} data={PROFILE}>
          Профиль
        </Button>
        <Button radius onClick={onClickButton} data={STATISTICS}>
          Таблица лидеров
        </Button>
        <Button radius onClick={onClickButton} data={FORUM}>
          Форум
        </Button>
        <Button radius onClick={onClickLogout}>
          Выйти из игры
        </Button>
      </Space>
    </Space>
  );
};

export { PageHome };
export default PageHome;
