import React, { Component } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import style from "../css/Navbar.module.css";
import { Menu } from "antd";
import { UserOutlined, BookOutlined, RocketOutlined, BellOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;
export default class Navbar extends Component {
  state = {
    current: "rahbariyat",
  };
  handleClick = (e) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
      <div>
        <nav className={style.nvb}>
          <BrowserRouter>
            <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
              <Menu.Item key="rahbariyat" icon={<UserOutlined />}>
                <Link exact to="/rahbariyat" style={{ textDecoration: "none" }}>
                  Rahbariyat
                </Link>
              </Menu.Item>
              <Menu.Item key="yangiliklar" icon={<BookOutlined />}>
                <Link style={{ textDecoration: "none" }} exact to="/yangiliklar">
                  Yangiliklar
                </Link>
              </Menu.Item>
              <Menu.Item key="tadbirlar" icon={<BellOutlined />}>
                <Link exact to="/tadbirlar" style={{ textDecoration: "none" }}>
                  Tadbirlar
                </Link>
              </Menu.Item>
              <Menu.Item key="alochilar" icon={<RocketOutlined />}>
                <Link exact to="/alochilar" style={{ textDecoration: "none" }}>
                  Alochilar
                </Link>
              </Menu.Item>
            </Menu>
          </BrowserRouter>
        </nav>
      </div>
    );
  }
}
