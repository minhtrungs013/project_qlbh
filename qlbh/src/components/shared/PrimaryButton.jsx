import React from 'react';
import { Button } from 'antd';
function PrimaryButton(props) {
  return <Button type="primary" size="small" {...props} />;
}

PrimaryButton.propTypes = {};

export default PrimaryButton;
