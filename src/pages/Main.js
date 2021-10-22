import React, { Component } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { PieChartOutlined } from "@ant-design/icons";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import style from "../css/Navbar.module.css";
import Yangilik from "./Yangilik";
import Tadbirlar from "./Tadbirlar";
import { getSchools, getRegion } from "../host/Config";
import Rahbariyat from "./Rahbariyat";
import GLOBAL from "../host/Global";
import Parol from "./Parol";
import Alochilar from "./Alochilar";
import Togaraklar from "./Togaraklar";
import Yutuqlar from "./Yutuqlar";
import {
  UserOutlined,
  BookOutlined,
  RocketOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { FaSchool } from "react-icons/fa";
import Loader from "./Loader";

const { Header, Content, Footer, Sider } = Layout;

export default class Main extends Component {
  state = {
    loader:true,
    oneId: null,
    collapsed: false,
    maktab: [],
    maktabId: 0,
    current: "rahbariyat",
    maktab1: null,
    index: null,
    region: [],
  };
  getSchoolsAll = () => {
    getSchools().then((res) =>
      this.setState({ maktab: res.data, oneId: res.data[0].id })
    );
  };
  getRegions = () => {
    getRegion().then((res) => this.setState({ region: res.data }));
  };
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };
  getId = (val) => {
 
    this.setState({
      maktabId: val,
      maktab1:val[0]?val[0].id:0,
    });
  };
  handleClick = (e) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };

  componentDidMount() {
    this.getRegions();
    this.getSchoolsAll();
    console.log(GLOBAL.id);
    setInterval(() => {
      this.setState({
        loader: false,
      });
    }, 3000);
  }
  render() {
    return GLOBAL.id !== null ? (
      <div>
        {this.state.loader===true?(<Loader/>):(
        <BrowserRouter>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={["0"]} mode="inline">

              <Menu.Item onClick={() => this.getId(0)} key="-2" icon={<PieChartOutlined style={{position:'relative', top:"-3px"}}/>}>
<Link style={{textDecoration:'none', color:'white'}}  to={`/${window.location.href.slice(window.location.href.indexOf("main"), window.location.href.lastIndexOf("/"))}/all`}>Hammasi</Link>
              </Menu.Item>


              {this.state.maktab.map((item, key) => {
                return (
                  <Menu.Item onClick={() => this.getId(`${item.school_number}`)} key={key} icon={<FaSchool style={{position:'relative', top:"-3px"}}/>}>
                    <Link style={{textDecoration:'none',color:'white'}} to={`/${window.location.href.slice(window.location.href.indexOf("main"), window.location.href.lastIndexOf("/"))}/${item.id}`}>{item.school_number}-maktab</Link>
                  </Menu.Item>
                );
              })}
              <Menu.Item key="-1" icon={<PieChartOutlined style={{position:'relative', top:"-3px"}}/>}>
<Link  style={{textDecoration:'none', color:'white'}} to={`/main/parol`}>Parol o'zgartirish</Link>
              </Menu.Item>

                {this.state.maktab.map((item, key) => {
                  return (
                    <Menu.Item
                      onClick={() => this.getId(`${item.school_number}`)}
                      key={key}
                      icon={<FaSchool />}
                    >
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to={`/${window.location.href.slice(
                          window.location.href.indexOf("main"),
                          window.location.href.lastIndexOf("/")
                        )}/${item.id}`}
                      >
                        {item.school_number}-maktab
                      </Link>
                    </Menu.Item>
                  );
                })}
                <Menu.Item key="-1" icon={<PieChartOutlined />}>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={`/main/parol`}
                  >
                    Parol o'zgartirish
                  </Link>
                </Menu.Item>
              </Menu>
            </Sider>
</Layout>
            <Layout className="site-layout">
              <Header
                className="site-layout-background"
                style={{ padding: 0 }}
              />

              <Content style={{ margin: "0 16px" }}>
                <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
                <div
                  className="site-layout-background"
                  style={{
                    padding: 24,
                    minHeight: "540px",
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                >
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
                    {/* <Route exact path="/main/togaraklar/:id">
                      <Togaraklar />
                    </Route> */}
                    <Route exact path="/main/yutuqlar/:id">
                      <Yutuqlar />
                    </Route>
                  </Switch>
                </div>
                <div className={style.maktab}>
                  {this.state.region.map((item) => {
                    return GLOBAL.id === item.admin ? (
                      <h3>{item.region_name}</h3>
                    ) : (
                      ""
                    );
                  })}
                </div>
              <nav className={style.nvb}>
            <Menu  defaultSelectedKeys={['rahbariyat']} onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
              <Menu.Item key="rahbariyat" icon={<UserOutlined style={{position:'relative', top:"-3px"}}/>}>
                <Link exact to={`/main/rahbariyat/${this.state.oneId}`} style={{ textDecoration: "none" }}>
                  Rahbariyat
                </Link>
              </Menu.Item>
              <Menu.Item key="yangiliklar" icon={<BookOutlined style={{position:'relative', top:"-3px"}}/>}>
                <Link style={{ textDecoration: "none" }} exact to={`/main/yangiliklar/${this.state.oneId}`}>
                  Yangiliklar
                </Link>
              </Menu.Item>
              <Menu.Item key="tadbirlar" icon={<BellOutlined style={{position:'relative', top:"-3px"}}/>}>
                <Link exact to={`/main/tadbirlar/${this.state.oneId}`} style={{ textDecoration: "none" }}>
                  Tadbirlar
                </Link>
              </Menu.Item>
              {/* <Menu.Item key="togaraklar" icon={<BellOutlined style={{position:'relative', top:"-3px"}}/>}>
                <Link exact to={`/main/togaraklar/${this.state.oneId}`} style={{ textDecoration: "none" }}>
                  To'garaklar
                </Link>
              </Menu.Item> */}
              <Menu.Item key="yutuqlar" icon={<BellOutlined style={{position:'relative', top:"-3px"}}/>}>
                <Link exact to={`/main/yutuqlar/${this.state.oneId}`} style={{ textDecoration: "none" }}>
                  Yutuqlar
                </Link>
              </Menu.Item>
              <Menu.Item key="alochilar" icon={<RocketOutlined style={{position:'relative', top:"-3px"}}/>}>
                <Link refresh="true" exactexact to={`/main/alochilar/${this.state.oneId}`} style={{ textDecoration: "none" }}>
                  Alochilar
                </Link>
              </Menu.Item>
            </Menu>
        </nav>
            </Content>
          </Layout>
        </BrowserRouter>)}
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}
