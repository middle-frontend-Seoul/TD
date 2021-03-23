import React, { FC, useCallback } from 'react';
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

  const onClickForum = useCallback(() => history.push(FORUM), [history]);
  const onClickLogout = useCallback(() => history.push(SIGNIN), [history]);
  const onClickProfile = useCallback(() => history.push(PROFILE), [history]);
  const onClickStatistincs = useCallback(() => history.push(STATISTICS), [
    history,
  ]);

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
        <Button radius onClick={onClickProfile}>
          Профиль
        </Button>
        <Button radius onClick={onClickStatistincs}>
          Таблица лидеров
        </Button>
        <Button radius onClick={onClickForum}>
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
