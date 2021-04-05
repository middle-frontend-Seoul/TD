import React, { FC } from 'react';

import { Link } from 'components-ui/link';
import { Button } from 'components-ui/button';
import { Block } from 'components-ui/block';
import { Space } from 'components-ui/space';
import { Table, TableColumn } from 'components-ui/table';
import { HOME } from 'core/url';

import './style.scss';

const columns: TableColumn<any>[] = [
  {
    key: 'name',
    dataIndex: 'name',
    width: '70%',
    title: 'Раздел',
  },
  {
    key: 'theme',
    dataIndex: 'theme',
    width: '15%',
    title: 'Темы',
  },
  {
    key: 'messages',
    dataIndex: 'messages',
    width: '15%',
    title: 'Сообщения',
  },
];

const PageForum: FC = () => {
  return (
    <Space type="vertical">
      <Block title="Форум" page="forum">
        <div className="forum">
          <div className="forum-body">
            <Table
              className="forum-table"
              columns={columns}
              dataSource={[
                { name: 'Правила игры в Кинг', theme: 3, messages: 21 },
                { name: 'Карточные игры', theme: 5, messages: 77 },
                { name: 'Баги', theme: 2, messages: 12 },
              ]}
            />
          </div>
          <div className="forum-footer">
            <Button type="button" use="primary" size="xsmall">
              Новая тема
            </Button>
          </div>
        </div>
      </Block>
      <Space type="horizontal" position="center">
        <Link to={HOME} type="button">
          На главный экран
        </Link>
      </Space>
    </Space>
  );
};

export { PageForum };
export default PageForum;
