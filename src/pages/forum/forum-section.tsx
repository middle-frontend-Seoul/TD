import React, { FC } from 'react';

import { Link } from 'components-ui/link';
import { Block } from 'components-ui/block';
import { Space } from 'components-ui/space';
import { FORUM } from 'core/url';

const PageForumSection: FC = () => {
  return (
    <Space type="vertical">
      <Block title="Форум" page="forum">
        PageForumSection
      </Block>
      <Link to={FORUM} type="button">
        Назад
      </Link>
    </Space>
  );
};

export { PageForumSection };
export default PageForumSection;
