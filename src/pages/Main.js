import React, { Component } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { PieChartOutlined } from "@ant-design/icons";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import style from "../css/Navbar.module.css";
import Yangilik from "./Yangilik";
import Tadbirlar from "./Tadbirlar";
import { getSchools } from "../host/Config";
const { Header, Content, Footer, Sider } = Layout;

export default class Main extends Component {
  state = {
    collapsed: false,
    maktab: 0,
  };
  getSchoolsAll = () => {
    getSchools()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  maktab = (a) => {
    this.setState({
      maktab: a,
    });
  };
  componentDidMount() {
    this.getSchoolsAll();
  }
  render() {
    return (
      <div>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={["0"]} mode="inline">
              <Menu.Item
                onClick={() => {
                  this.maktab(0);
                }}
                key="0"
                icon={<PieChartOutlined />}
              >
                Hammasi
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  this.maktab(1);
                }}
                key="1"
                icon={<PieChartOutlined />}
              >
                1- maktab
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  this.maktab(2);
                }}
                key="2"
                icon={<PieChartOutlined />}
              >
                2- maktab
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  this.maktab(3);
                }}
                key="3"
                icon={<PieChartOutlined />}
              >
                3- maktab
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  this.maktab(4);
                }}
                key="4"
                icon={<PieChartOutlined />}
              >
                4- maktab
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  this.maktab(5);
                }}
                key="5"
                icon={<PieChartOutlined />}
              >
                5- maktab
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  this.maktab(6);
                }}
                key="6"
                icon={<PieChartOutlined />}
              >
                6- maktab
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  this.maktab(7);
                }}
                key="7"
                icon={<PieChartOutlined />}
              >
                7- maktab
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  this.maktab(8);
                }}
                key="8"
                icon={<PieChartOutlined />}
              >
                8- maktab
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />

            <Content style={{ margin: "0 16px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
              <div className="site-layout-background" style={{ padding: 24, height: "540", overflowY: "auto", overflowX: "hidden" }}>
                <BrowserRouter>
                  <Switch>
                    <Route path="/yangiliklar">
                      <Yangilik />
                    </Route>
                    <Route path="/tadbirlar">
                      <Tadbirlar />
                    </Route>
                  </Switch>
                </BrowserRouter>

                <Footer style={{ textAlign: "center" }}>
                  Tizim IT Tower kompaniyasi tomonidan tayyorlandi.
                  <br /> Murojat uchun:{" "}
                  <a style={{ textDecoration: "none", color: "black" }} href="tel:+998999349707">
                    +998-99-934-97-07
                  </a>
                </Footer>
              </div>
              {this.state.maktab !== 0 ? (
                <div className={style.maktab}>
                  <h3>{this.state.maktab} - maktab</h3>
                </div>
              ) : (
                <div className={style.maktab}>
                  <h3>Barcha maktablar</h3>
                </div>
              )}
            </Content>
          </Layout>
        </Layout>
        <Navbar />
      </div>
    );
  }
}
