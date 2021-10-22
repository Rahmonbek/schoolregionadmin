import React, { Component } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { getEvent, getEvents } from "../host/Config";
import GLOBAL from "../host/Global";
import { FaRegCalendarAlt, FaHistory } from "react-icons/fa";
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
export default class Tadbirlar extends Component {
  state = {
    maktab: [],
=======
import {BiTime} from 'react-icons/bi'
import Loader from "./Loader";
export default class Tadbirlar extends Component {
  state = {
    loader:true,
    maktab:[],
>>>>>>> Stashed changes
    datas: [],
    data: {},
    show: false,
    id: window.location.href.slice(window.location.href.lastIndexOf("/") + 1),
  };
  getEvents = () => {
    getEvents()
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
    this.getEvents();
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
                  return parseInt(
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
                            <Typography variant="body2" color="text.secondary">
                              <div
                                style={{ margin: "10px 0px", fontSize: "15px" }}
                              >
                                <span style={{ marginRight: "10px" }}>
                                  <HiLocationMarker />
                                </span>
                                <span>{item.address}</span>
                              </div>

                              <div
                                style={{ margin: "10px 0px", fontSize: "15px" }}
                              >
                                <span style={{ marginRight: "10px" }}>
                                  <FaRegCalendarAlt />
                                </span>
                                <span>{item.date}</span>
                              </div>

                              <div
                                style={{ margin: "10px 0px", fontSize: "15px" }}
                              >
                                <span style={{ marginRight: "10px" }}>
                                  <BiTime />
                                </span>
                                <span>{item.time}</span>
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
                        />{" "}
                        <Card.Body>
                          <h6
                            style={{
                              fontSize: "16px",
                              borderBottom: "1px solid #ccc",
                              height: "50px",
                            }}
                          >
                            <b>{item.title}</b>
                          </h6>
                          <div style={{ margin: "10px 0px", fontSize: "15px" }}>
                            <span style={{ marginRight: "10px" }}>
                              <HiLocationMarker />
                            </span>
                            <span>{item.address}</span>
                          </div>

                          <div style={{ margin: "10px 0px", fontSize: "15px" }}>
                            <span style={{ marginRight: "10px" }}>
                              <FaRegCalendarAlt />
                            </span>
                            <span>{item.date}</span>
                          </div>

                          <div style={{ margin: "10px 0px", fontSize: "15px" }}>
                            <span style={{ marginRight: "10px" }}>
                              <BiTime />
                            </span>
                            <span>{item.time}</span>
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
                  );
                })
              : ""}

            {this.state.datas !== []
              ? this.state.datas.map((item, key) => {
                  return window.location.href.slice(
                    window.location.href.lastIndexOf("/") + 1
                  ) === "all" ? (
                    <Col xl={3} lg={4} md={6} sm={6} xs={12} key={key}>
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
                        {/* <Card.Img variant="top" src="https://picsum.photos/50" /> */}
                        <Card.Body>
                          <h6
                            style={{
                              fontSize: "16px",
                              borderBottom: "1px solid #ccc",
                              height: "50px",
                            }}
                          >
                            <b>{item.title}</b>
                          </h6>

                          <p>{item.address}</p>

                          <p>{item.date}</p>

                          <p>{item.time}</p>

                          {/* <p style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.text}</p> */}
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
              Tadbir sarlavhasi: <b>"{this.state.data.title}"</b>{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Tadbir matni: {this.state.data.text}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.closeModal()}>Yopish</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
