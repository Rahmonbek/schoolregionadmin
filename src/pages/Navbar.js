import React, { Component } from 'react'
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';



export default class Navbar extends Component {
    state = {
        current: 'region',
      };
      handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
      };
    render() {
        const { current } = this.state;
        return (
            <div>
                  <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="region" icon={<UserOutlined />}>
          Rayonlar
        </Menu.Item>
        <Menu.Item key="school" icon={<UserOutlined />}>
          Maktablar
        </Menu.Item>
       
       
      </Menu>
            </div>
        )
    }
}
