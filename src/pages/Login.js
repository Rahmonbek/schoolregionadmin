import axios from "axios";
import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import style from "../css/Verify.module.css";
import { url } from "../host/Host";
import { message } from "antd";
import GLOBAL from "../host/Global";
import { Redirect ,Link} from "react-router-dom";
import { getRegion } from "../host/Config";
import { getSchools } from "../host/Config";

export default class Login extends Component {
  state = {
    login: false,
    id: null,
    regions: [],
    oneId:null
  };
  getRegions = () => {
    getRegion().then((res) => this.setState({ regions: res.data }));
  };
  loginVeb = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    axios
      .post(`${url}/login/`, formDataObj)
      .then((res) => {
        this.state.regions.map((item) => {
          return item.admin === res.data.id ? (GLOBAL.region = item.id) : "";
        });
        if (GLOBAL.region !== null) {
          window.localStorage.setItem("token", res.data.token);
          GLOBAL.id = res.data.id;
          this.setState({ login: true });
        } else {
          message.error("Login yoki parolni xato kiritdingiz. Iltimos tekshirib qaytatdan kiriting.");
        }
      })
      .catch((err) => {
        message.error("Login yoki parolni xato kiritdingiz. Iltimos tekshirib qaytatdan kiriting.");
      });
  };
  getSchoolsAll = () => {
    getSchools().then((res) => console.log(res.data))
    .catch(() => console.log("Ma'lumot yuklanmadi 2"));
  };
  getSchool=(val)=>{
    this.setState({
      oneId:val
    })
  }
  componentDidMount() {
    this.getRegions()
  }
  render() {
    return this.state.login === false ? (
      <div className={style.formDiv}>
        <div className={style.loginBox}>
          <h2>Tizimga kirish</h2>
          <Form className={style.From} onSubmit={this.loginVeb}>
            <Form.Group className={style.userBox}>
              <Form.Control style={{ outline: "none" }} className={style.Forminput} type="text" name="username" required={true} />
              <Form.Label className={style.formLabel}>Login</Form.Label>
            </Form.Group>
            <Form.Group className={style.userBox}>
              <Form.Control style={{ outline: "none" }} className={style.Forminput} type="password" name="password" required={true} />
              <Form.Label className={style.formLabel}>Parol</Form.Label>
            </Form.Group>
           <p> <Link style={{textDecoration:'none'}} to="/verify">Emailni tasdiqlash</Link></p>
            <Button className={style.sub} type="submit">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Kirish
            </Button>
            
          </Form>
        </div>
      </div>
    ) : (
      <Redirect to={`/main/rahbariyat/0`} />
    );
  }
}
