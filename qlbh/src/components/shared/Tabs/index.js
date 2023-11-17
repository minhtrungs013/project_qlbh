import { Tabs } from 'antd';
import React from 'react'

const TabCustomize = (props) => {
    const { items, tabPosition = 'top', defaultActiveKey = '0', ...rest } = props;
   

  return (
    <div> 
        <Tabs 
            items={items} 
            type="card" 
            tabPosition={tabPosition} 
            tabBarGutter={0} 
            defaultActiveKey={defaultActiveKey} 
            {...rest} />
    </div>
  )
}

TabCustomize.propTypes = {}

export default TabCustomize