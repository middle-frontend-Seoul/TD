import React, { FC } from 'react';

import { Layout } from 'core/layout';
import { Block } from 'components-ui/block';
import { Title } from 'components-ui/title';
import { Space } from 'components-ui/space';
import { Button } from 'components-ui/button';

import './home.scss';

const PageHome: FC = () => {
  return (
    <Layout>
      <Space type="vertikale">
        <Block className="home-block">
          <Title>Выберите карту</Title>
        </Block>
        <Space type="horizontal">
          <Button radius>Профиль</Button>
          <Button radius>Таблица лидеров</Button>
          <Button radius>Форум</Button>
          <Button radius>Выйти из игры</Button>
        </Space>
      </Space>
    </Layout>
  );
};

export { PageHome };
export default PageHome;
