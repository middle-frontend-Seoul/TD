import React, { FC } from 'react';

import { Link } from 'components-ui/link';
import { Button } from 'components-ui/button';
import { Block } from 'components-ui/block';
import { Space } from 'components-ui/space';
import { Table, TableColumn } from 'components-ui/table';
import { FORUM } from 'core/url';

import './style.scss';

const columns: TableColumn<any>[] = [
  {
    key: 'name',
    dataIndex: 'name',
    width: '65%',
    title: 'Раздел: Правила игры в Кинг',
  },
  {
    key: 'messages',
    dataIndex: 'messages',
    width: '15%',
    title: '',
  },
  {
    key: 'view',
    dataIndex: 'view',
    width: '20%',
    title: '',
  },
];

const PageForumSection: FC = () => {
  return (
    <Space type="vertical">
      <Block title="Форум" page="forum">
        <div className="forum">
          <div className="forum-body">
            <Table
              className="forum-table"
              columns={columns}
              dataSource={[
                {
                  name: 'Основные правила',
                  messages: 'Ответы: 7',
                  view: 'Просмотры: 101',
                },
                {
                  name: 'Рекомендации',
                  messages: 'Ответы: 7',
                  view: 'Просмотры: 101',
                },
                {
                  name: 'Вариации правил',
                  messages: 'Ответы: 7',
                  view: 'Просмотры: 101',
                },
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
        <Link to={FORUM} type="button">
          Назад
        </Link>
      </Space>
    </Space>
  );
};

export { PageForumSection };
export default PageForumSection;
