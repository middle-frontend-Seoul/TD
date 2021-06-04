import React, { FC } from 'react';

import { Link } from 'components-ui/link';
import { Block } from 'components-ui/block';
import { Title } from 'components-ui/title';
import { Space } from 'components-ui/space';
import { Button } from 'components-ui/button';
import { URL } from 'core/url';
import { useAppSelector, useBoundAction } from 'rdx/hooks';
import { logout } from 'rdx/slices/auth-slice';

import map1 from './images/map1.png';
import map2 from './images/map2.png';
import map3 from './images/map3.png';
import map1Alt from './images/map1_alt.png';
import map2Alt from './images/map2_alt.png';
import map3Alt from './images/map3_alt.png';

import './home.scss';

const PageHome: FC = () => {
  const actionLogout = useBoundAction(logout);

  const colorTheme = useAppSelector((state) => state.user.theme);

  const handleLogout = () => {
    actionLogout();
  };

  return (
    <Space type="vertical">
      <Block center page="home" type="flex" className="home-block">
        <Title style={{ marginTop: -20 }}>Выберите карту</Title>
        <Space type="horizontal" position="center">
          <Link to={URL.PLAY.path}>
            <img src={colorTheme === 'default' ? map1 : map1Alt} alt="map1" />
          </Link>
          <Link to={URL.PLAY.path}>
            <img src={colorTheme === 'default' ? map2 : map2Alt} alt="map2" />
          </Link>
          <Link to={URL.PLAY.path}>
            <img src={colorTheme === 'default' ? map3 : map3Alt} alt="map3" />
          </Link>
        </Space>
      </Block>
      <Space type="horizontal">
        <Link type="button" to={URL.PROFILE.path}>
          Профиль
        </Link>
        <Link type="button" to={URL.STATISTICS.path}>
          Таблица лидеров
        </Link>
        <Link type="button" to={URL.FORUM.path}>
          Форум
        </Link>
        <Button radius onClick={handleLogout}>
          Выйти из игры
        </Button>
      </Space>
    </Space>
  );
};

export { PageHome };
export default PageHome;
