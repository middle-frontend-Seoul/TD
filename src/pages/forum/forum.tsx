import React, { FC } from 'react';

import { Link } from 'components-ui/link';
import { Block } from 'components-ui/block';
import { Space } from 'components-ui/space';
import { HOME } from 'core/url';

const PageForum: FC = () => {
  return (
    <Space type="vertical">
      <Block title="Форум" page="forum">
        PageForum
      </Block>
      <Link to={HOME} type="button">
        На главный экран
      </Link>
    </Space>
  );
};

export { PageForum };
export default PageForum;
