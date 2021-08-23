import React, { Component } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { PieChartOutlined } from "@ant-design/icons";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import style from "../css/Navbar.module.css";
import Yangilik from "./Yangilik";
import Tadbirlar from "./Tadbirlar";
import { getSchools } from "../host/Config";
import Rahbariyat from "./Rahbariyat";
import MaktabId from "./maktabId";
import GLOBAL from "../host/Global";
import Parol from "./Parol";
import { UserOutlined, BookOutlined, RocketOutlined, BellOutlined } from "@ant-design/icons";


const { Header, Content, Footer, Sider } = Layout;

export default class Main extends Component {
  state = {
    collapsed: false,
    maktab: [],
    maktabId: 0,
    current: "rahbariyat",
  };
  getSchoolsAll = () => {
    getSchools().then((res) => this.setState({ maktab: res.data }));
  };
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };
  getId = (val) => {
    this.setState({
      maktabId: val,
    });
  };
  handleClick = (e) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };

  componentDidMount() {
    this.getSchoolsAll();
    console.log(GLOBAL.id,GLOBAL.region)
   
  }
  render() {
    return GLOBAL.id !== null ? (
      <div>
        <BrowserRouter>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={["0"]} mode="inline">
              <Menu.Item onClick={() => this.getId(0)} key="0" icon={<PieChartOutlined />}>
<Link style={{textDecoration:'none', color:'white'}}  to={`/${window.location.href.slice(window.location.href.indexOf("main"), window.location.href.lastIndexOf("/"))}/all`}>Hammasi</Link>
              </Menu.Item>
              <Menu.Item onClick={() => this.getId(0)} key="-1" icon={<PieChartOutlined />}>
<Link  style={{textDecoration:'none', color:'white'}} to={`/main/parol`}>Parol o'zgartirish</Link>
              </Menu.Item>
              {this.state.maktab.map((item, key) => {
                return (
                  <Menu.Item onClick={() => this.getId(`${item.school_number}`)} key={key + 1} icon={<PieChartOutlined />}>
                    <Link to={`/${window.location.href.slice(window.location.href.indexOf("main"), window.location.href.lastIndexOf("/"))}/${item.id}`}>{item.school_number}-maktab</Link>
                  </Menu.Item>
                );
              })}
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />

            <Content style={{ margin: "0 16px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
              <div className="site-layout-background" style={{ padding: 24, height: "540", overflowY: "auto", overflowX: "hidden" }}>
                  <Switch>
                    <Route exact path="/main/rahbariyat/:id">
                      <Rahbariyat />
                    </Route>
                    <Route exact path="/main/yangiliklar/:id">
                      <Yangilik />
                    </Route>
                    <Route exact path="/main/tadbirlar/:id">
                      <Tadbirlar />
                    </Route>
                    <Route exact path="/main/alochilar/:id">
                      <MaktabId />
                    </Route>
                    <Route exact path="/main/parol">
                      <Parol />
                    </Route>
                  </Switch>

                <Footer style={{ textAlign: "center" }}>
                  Tizim IT Tower kompaniyasi tomonidan tayyorlandi.
                  <br /> Murojat uchun:{" "}
                  <a style={{ textDecoration: "none", color: "black" }} href="tel:+998999349707">
                    +998-99-934-97-07
                  </a>
                </Footer>
              </div>
              {this.state.maktabId !== 0 ? (
                <div className={style.maktab}>
                  <h3>{this.state.maktabId} - maktab</h3>
                </div>
              ) : (
                <div className={style.maktab}>
                  <h3>Barcha maktablar</h3>
                </div>
              )}
              <nav className={style.nvb}>
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
              <Menu.Item key="rahbariyat" icon={<UserOutlined />}>
                <Link exact to="/main/rahbariyat/all" style={{ textDecoration: "none" }}>
                  Rahbariyat
                </Link>
              </Menu.Item>
              <Menu.Item key="yangiliklar" icon={<BookOutlined />}>
                <Link style={{ textDecoration: "none" }} exact to="/main/yangiliklar/all">
                  Yangiliklar
                </Link>
              </Menu.Item>
              <Menu.Item key="tadbirlar" icon={<BellOutlined />}>
                <Link exact to="/main/tadbirlar/all" style={{ textDecoration: "none" }}>
                  Tadbirlar
                </Link>
              </Menu.Item>
              <Menu.Item key="alochilar" icon={<RocketOutlined />}>
                <Link exact to="/main/alochilar/all" style={{ textDecoration: "none" }}>
                  Alochilar
                </Link>
              </Menu.Item>
            </Menu>
        </nav>
            </Content>
          </Layout>
        </Layout>
        </BrowserRouter>
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}
