import React from 'react';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Loading = ({ style, ...rest }) => {
  const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}
      {...rest}
    >
      <Spin indicator={loadingIcon} />
    </div>
  );
};

export default Loading;
