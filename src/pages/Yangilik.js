import React, { Component } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { getNew, getNews } from "../host/Config";
import GLOBAL from "../host/Global";
import { FaHistory } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { message } from "antd";
import { getSchools } from "../host/Config";
<<<<<<< Updated upstream
import { BiTime } from "react-icons/bi";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
export default class Yangilik extends Component {
  state = {
    maktab: [],
=======
import {BiTime} from 'react-icons/bi'
import Loader from "./Loader";
export default class Yangilik extends Component {
  state = {
    loader:true,
    maktab:[],
>>>>>>> Stashed changes
    datas: [],
    data: {},
    show: false,
    id: window.location.href.slice(window.location.href.lastIndexOf("/") + 1),
  };
  getNews = () => {
    getNews()
      .then((res) => this.setState({ datas: res.data }))
      .catch(() => message.error("Ma'lumot yuklanmadi"));
  };
  getSchoolsAll = () => {
    getSchools()
      .then((res) => this.getSchool(res.data))
      .catch(() => console.log("Ma'lumot yuklanmadi 2"));
  };
  getSchool = (val) => {
    this.setState({
      maktab: val,
    });
  };
  showModal = (id) => {
    this.setState({ show: true, data: this.state.datas[id] });
  };
  closeModal = () => {
    this.setState({ show: false, data: {} });
  };
  componentDidMount() {
    this.getNews();
<<<<<<< Updated upstream
    this.getSchoolsAll();
=======
    this.getSchoolsAll()
    setInterval(() => {
      this.setState({
        loader: false,
      });
    }, 3000);
>>>>>>> Stashed changes
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
                        <Col xl={3} lg={4} md={6} sm={10} xs={12} key={key}>
                          <Card style={{ margin: "5px" }}>
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                height="150"
                                image={item.image}
                                alt="green iguana"
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h7">
                                  {item.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  <div
                                    style={{
                                      margin: "10px 0px",
                                      fontSize: "15px",
                                    }}
                                  >
                                    <span style={{ marginRight: "10px" }}>
                                      <HiLocationMarker />
                                    </span>
                                    <span>{item2.school_number}-maktab</span>
                                  </div>
                                  <div
                                    style={{
                                      margin: "10px 0px",
                                      fontSize: "15px",
                                    }}
                                  >
                                    <span style={{ marginRight: "10px" }}>
                                      <BiTime />
                                    </span>
                                    <span>
                                      {item.published_time.slice(0, 10)}
                                    </span>
                                  </div>
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                            <CardActions>
                              <Button
                                onClick={() => this.showModal(key)}
                                style={{ fontSize: "12px" }}
                              >
                                Batafsil
                              </Button>
                            </CardActions>
                          </Card>
                          {/* <Card
                            style={{
                              margin: "10px auto",
                              borderRadius: "7px",
                              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                              height: "500px",
                            }}
                          >
                            <Card.Img
                              variant="top"
                              src={item.image}
                              style={{ width: "100%", height: "250px" }}
                            />
                            <Card.Body>
                              <h6
                                style={{
                                  margin: "5px 0px 20px 0px",
                                  fontSize: "16px",
                                  borderBottom: "1px solid #ccc",
                                  height: "50px",
                                }}
                              >
                                <b>{item.title}</b>
                              </h6>
                              <div
                                style={{ margin: "10px 0px", fontSize: "15px" }}
                              >
                                <span style={{ marginRight: "10px" }}>
                                  <HiLocationMarker />
                                </span>
                                <span>{item2.school_number}-maktab</span>
                              </div>
                              <div
                                style={{ margin: "10px 0px", fontSize: "15px" }}
                              >
                                <span style={{ marginRight: "10px" }}>
                                  <BiTime />
                                </span>
                                <span>{item.published_time.slice(0, 10)}</span>
                              </div>
                              <Button
                                onClick={() => this.showModal(key)}
                                style={{ fontSize: "12px" }}
                              >
                                Batafsil
                              </Button>
                            </Card.Body>
                          </Card> */}
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
            {this.state.datas !== []
              ? this.state.datas.map((item, key) => {
                  return window.location.href.slice(
                    window.location.href.lastIndexOf("/") + 1
                  ) === "all" ? (
                    <Col lg={3} md={4} sm={6} xs={12} key={key}>
                      <Card
                        style={{
                          margin: "10px auto",
                          borderRadius: "7px",
                          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                          height: "500px",
                        }}
                      >
                        <Card.Img
                          variant="top"
                          src={item.image}
                          style={{ width: "100%", height: "250px" }}
                        />
                        <Card.Body>
                          <h6
                            style={{
                              margin: "5px 0px 20px 0px",
                              fontSize: "16px",
                              borderBottom: "1px solid #ccc",
                              height: "50px",
                            }}
                          >
                            <b>{item.title}</b>
                          </h6>

                          <p>{item.school}-maktab</p>

                          <p>{item.published_time}</p>
                          <Button
                            onClick={() => this.showModal(key)}
                            style={{ fontSize: "12px" }}
                          >
                            Batafsil
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ) : (
                    ""
                  );
                })
              : ""}
          </Row>
<<<<<<< Updated upstream
        </Container>
        <Modal
          show={this.state.show}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
=======
        </Container>)}
        <Modal show={this.state.show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
>>>>>>> Stashed changes
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Yangilik sarlavhasi: {this.state.data.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Yangilik matni: {this.state.data.text}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.closeModal()}>Yopish</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
