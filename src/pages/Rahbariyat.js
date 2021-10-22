import React, { Component } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
// import CardActions from "@material-ui/core/CardActions";
// import Collapse from "@material-ui/core/Collapse";
// import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/Delete";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import BorderColorIcon from "@material-ui/icons/BorderColor";
import { getSchools, getStaff, getStaffs } from "../host/Config";
import GLOBAL from "../host/Global";
import { BsPersonCheck } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";
import { FaSchool } from "react-icons/fa";
import style from "../css/xodim.module.css";
import Loader from "./Loader";
export default class Rahbariyat extends Component {
  state = {
    maktab1: null,
    maktab: [],
    datas: [],
    data: {},
    show: false,
    id: window.location.href.slice(window.location.href.lastIndexOf("/") + 1),
  };
  getStaffS = () => {
    getStaffs()
      .then((res) => this.setState({ datas: res.data }))
      .catch(() => console.log("Ma'lumot yuklanmadi 2"));
  };
  getSchoolsAll = () => {
    getSchools()
      .then((res) => this.getSchool(res.data))
      .catch(() => console.log("Ma'lumot yuklanmadi 2"));
  };
  getSchool = (val) => {
    this.setState({
      loader:true,
      maktab: val,
      maktab1: val[0].id,
      s: val[0].school_number,
    });
    console.log(val[0].id, this.state.maktab1);
  };
  showModal = (id) => {
    this.setState({ show: true, data: this.state.datas[id] });
  };
  closeModal = () => {
    this.setState({ show: false, data: {} });
  };
  componentDidMount() {
    this.getSchoolsAll();
    this.getStaffS();
  
    console.log(this.state.maktab, this.state.maktab1);
    setInterval(() => {
      this.setState({
        loader: false,
      });
    }, 3000);
  }
  render() {
    return (
      <div>
        {this.state.loader===true?(<Loader/>):(
        <Container fluid>
          <Row>
            {this.state.datas !== []
              ? this.state.datas.map((item, key) => {
                  return this.state.maktab.map((item2) => {
                    return parseInt(item2.id) === parseInt(item.school) ? (
                      parseInt(
                        window.location.href.slice(
                          window.location.href.lastIndexOf("/") + 1
                        )
                      ) === parseInt(item.school) ? (
                        <Col lg={3} md={4} sm={6} xs={12}>
                          {/* <Card
                            style={{
                              margin: "10px auto",
                              borderRadius: "7px",
                              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                            }}
                          >
                            <Card.Img variant="top" src={item.image} />
                            <Card.Body>
                              <h6>
                                <p>{item.full_name}</p>
                              </h6>
                              <div
                                style={{ margin: "10px 0px", fontSize: "15px" }}
                              >
                                <span style={{ marginRight: "10px" }}>
                                  <BsPersonCheck style={{ fontSize: "20px" }} />
                                </span>
                                <span>{item.position}-maktab</span>
                              </div>
                              <div
                                style={{ margin: "10px 0px", fontSize: "15px" }}
                              >
                                <span style={{ marginRight: "10px" }}>
                                  <FiPhone style={{ fontSize: "20px" }} />
                                </span>
                                <span>{item.phone}-maktab</span>
                              </div>
                              <div
                                style={{ margin: "10px 0px", fontSize: "15px" }}
                              >
                                <span style={{ marginRight: "10px" }}>
                                  <FaSchool style={{ fontSize: "20px" }} />
                                </span>
                                <span>{item2.school_number}-maktab</span>
                              </div>
                              <Button
                                onClick={() => this.showModal(key)}
                                style={{ fontSize: "12px" }}
                              >
                                Ko'proq o'qish
                              </Button>
                            </Card.Body>
                          </Card> */}
                          <Card className={style.root}>
                            {item.image !== null ? (
                              <CardMedia
                                className={style.media}
                                image={item.image}
                                title={item.full_name}
                              />
                            ) : (
                              ""
                            )}
                            <CardContent>
                              <Typography
                                variant="body2"
                                color="textDark"
                                component="p"
                              >
                                <p>
                                  <b>Xodim: </b>
                                  {item.full_name}
                                </p>
                                <p>
                                  <b>Mutaxassislik: </b>
                                  {item.position}
                                </p>
                                <p>
                                  <b>Telefon raqami: </b>
                                  {item.phone}
                                </p>
                                <p>
                                  <b>Maktab: </b>
                                  {item2.school_number} - maktab
                                </p>
                                <Button
                                  onClick={() => this.showModal(key)}
                                  style={{ fontSize: "12px" }}
                                >
                                  Ko'proq o'qish
                                </Button>
                              </Typography>
                            </CardContent>
                          </Card>
                        </Col>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    );
                  });
                })
              : ""}
            {/* {parseInt(
              window.location.href.slice(
                window.location.href.lastIndexOf("/") + 1
              )
            ) === 0
              ? this.state.datas.map((item2, key) => {
                  return parseInt(this.state.maktab1) ===
                    parseInt(item2.school) ? (
                    <Col lg={3} md={4} sm={6} xs={12}>
                      <Card
                        style={{
                          margin: "10px auto",
                          borderRadius: "7px",
                          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                        }}
                      >
                        <Card.Img variant="top" src={item2.image} />
                        <Card.Body>
                          <h6>
                            <p>{item2.full_name}</p>
                          </h6>
                          <div style={{ margin: "10px 0px", fontSize: "15px" }}>
                            <span style={{ marginRight: "10px" }}>
                              <BsPersonCheck style={{ fontSize: "20px" }} />
                            </span>
                            <span>{item2.position}-maktab</span>
                          </div>
                          <div style={{ margin: "10px 0px", fontSize: "15px" }}>
                            <span style={{ marginRight: "10px" }}>
                              <FiPhone style={{ fontSize: "20px" }} />
                            </span>
                            <span>{item2.phone}-maktab</span>
                          </div>
                          <div style={{ margin: "10px 0px", fontSize: "15px" }}>
                            <span style={{ marginRight: "10px" }}>
                              <FaSchool style={{ fontSize: "20px" }} />
                            </span>
                            <span>{this.state.s}-maktab</span>
                          </div>
                          <Button
                            onClick={() => this.showModal(key)}
                            style={{ fontSize: "12px" }}
                          >
                            Ko'proq o'qish
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ) : (
                    ""
                  );
                })
              : ""} */}
          </Row>
        </Container>)}
        <Modal
          show={this.state.show}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              {this.state.data.full_name} haqida ma'lumot:
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{this.state.data.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.closeModal()}>Yopish</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
