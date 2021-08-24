import React, { Component } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { PieChartOutlined } from "@ant-design/icons";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import style from "../css/Navbar.module.css";
import Yangilik from "./Yangilik";
import Tadbirlar from "./Tadbirlar";
import { getSchools } from "../host/Config";
import Rahbariyat from "./Rahbariyat";
import GLOBAL from "../host/Global";
import Parol from "./Parol";
import Alochilar from './Alochilar'
import { UserOutlined, BookOutlined, RocketOutlined, BellOutlined } from "@ant-design/icons";


const { Header, Content, Footer, Sider } = Layout;

export default class Main extends Component {
  state = {
    oneId:null,
    collapsed: false,
    maktab: [],
    maktabId: 0,
    current: "rahbariyat",
    maktab1:null,
    index:null
  };
  getSchoolsAll = () => {
    getSchools().then((res) => this.setState({ maktab: res.data,
      oneId:res.data[0].id}));
  };
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };
  getId = (val) => {
    this.setState({
      maktabId: val,
      maktab1:val[0].id,
    });

  };
  handleClick = (e) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };

  componentDidMount() {
    this.getSchoolsAll()  
  }
  render() {
    return GLOBAL.id !== null ? (
      <div>
        <BrowserRouter>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={["0"]} mode="inline">
              {this.state.maktab.map((item, key) => {
                return (
                  <Menu.Item onClick={() => this.getId(`${item.school_number}`)} key={key} icon={<PieChartOutlined />}>
                    <Link to={`/${window.location.href.slice(window.location.href.indexOf("main"), window.location.href.lastIndexOf("/"))}/${item.id}`}>{item.school_number}-maktab</Link>
                  </Menu.Item>
                );
              })}
              <Menu.Item onClick={() => this.getId(0)} key="-1" icon={<PieChartOutlined />}>
<Link  style={{textDecoration:'none', color:'white'}} to={`/main/parol`}>Parol o'zgartirish</Link>
              </Menu.Item>
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
                      <Alochilar />
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
                <div className={style.maktab}>
                  <h3></h3>
                </div>
              <nav className={style.nvb}>
            <Menu  defaultSelectedKeys={['rahbariyat']} onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
              <Menu.Item key="rahbariyat" icon={<UserOutlined />}>
                <Link exact to={`/main/rahbariyat/${this.state.oneId}`} style={{ textDecoration: "none" }}>
                  Rahbariyat
                </Link>
              </Menu.Item>
              <Menu.Item key="yangiliklar" icon={<BookOutlined />}>
                <Link style={{ textDecoration: "none" }} exact to={`/main/yangiliklar/${this.state.oneId}`}>
                  Yangiliklar
                </Link>
              </Menu.Item>
              <Menu.Item key="tadbirlar" icon={<BellOutlined />}>
                <Link exact to={`/main/tadbirlar/${this.state.oneId}`} style={{ textDecoration: "none" }}>
                  Tadbirlar
                </Link>
              </Menu.Item>
              <Menu.Item key="alochilar" icon={<RocketOutlined />}>
                <Link refresh="true" exactexact to={`/main/alochilar/${this.state.oneId}`} style={{ textDecoration: "none" }}>
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
