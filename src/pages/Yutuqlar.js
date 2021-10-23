import React, { Component } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
//simport { getNew, getNews } from "../host/Config";
//import GLOBAL from "../host/Global";
import { FaUserGraduate } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { message } from "antd";
import { getSchools, getAchievment, getPupil } from "../host/Config";
import { IoMdTrophy } from "react-icons/io";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import Loader from "./Loader";
export default class Yutuqlar extends Component {
  state = {
    loader: true,
    pupil: [],
    maktab: [],
    datas: [],
    data: {},
    show: false,
    id: window.location.href.slice(window.location.href.lastIndexOf("/") + 1),
  };
  getAchievments = () => {
    getAchievment()
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
  getPupils = () => {
    getPupil()
      .then((res) => this.getPupilI(res.data))
      .catch(() => console.log("Ma'lumot yuklanmadi 2"));
  };
  
  getPupilI = (val) => {
    this.setState({
      pupil: val,
    });
  };
  showModal = (id) => {
    this.setState({ show: true, data: this.state.datas[id] });
  };
  closeModal = () => {
    this.setState({ show: false, data: {} });
  };
  componentDidMount() {
    this.getPupils();
    this.getAchievments();
    this.getSchoolsAll();
    setInterval(() => {
      this.setState({
        loader: false,
      });
    }, 3000);
  }
  render() {
    return (
      <div>
        {this.state.loader === true ? (
          <Loader />
        ) : (
          <Container fluid>
            <Row>
              {this.state.datas !== []
                ? this.state.datas.map((item, key) => {
                    return this.state.maktab.map((item2) => {
                      return this.state.pupil.map((item3) => {
                        return parseInt(item2.id) === parseInt(item.school) ? (
                          parseInt(item.pupils) === parseInt(item3.id) ? (
                            parseInt(
                              window.location.href.slice(
                                window.location.href.lastIndexOf("/") + 1
                              )
                            ) === parseInt(item.school) ? (
                              <Col xl={3} lg={4} md={6} sm={10} xs={12}>
                                <Card
                                  style={{ margin: "5px", minHeight: "400px" }}
                                >
                                  <CardActionArea>
                                    <CardMedia
                                      component="img"
                                      height="250px"
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
                                        <h6
                                          style={{
                                            margin: "5px 0px 20px 0px",
                                            fontSize: "16px",
                                            borderBottom: "1px solid #ccc",
                                            height: "50px",
                                          }}
                                        >
                                          <b>{item.competition}</b>
                                        </h6>

                                        <div
                                          style={{
                                            margin: "10px 0px",
                                            fontSize: "15px",
                                          }}
                                        >
                                          <span style={{ marginRight: "10px" }}>
                                            <HiLocationMarker />
                                          </span>
                                          <span>
                                            {item2.school_number}-maktab
                                          </span>
                                        </div>
                                        <div
                                          style={{
                                            margin: "10px 0px",
                                            fontSize: "15px",
                                          }}
                                        >
                                          <span style={{ marginRight: "10px" }}>
                                            <IoMdTrophy />
                                          </span>
                                          <span>{item.result}</span>
                                        </div>
                                        <div
                                          style={{
                                            margin: "10px 0px",
                                            fontSize: "15px",
                                          }}
                                        >
                                          <span style={{ marginRight: "10px" }}>
                                            <FaUserGraduate />
                                          </span>
                                          <span>{item3.full_name}</span>
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
                              </Col>
                            ) : Number(
                              window.location.href.slice(
                                window.location.href.lastIndexOf("/") + 1
                              )
                            )===-1? (
                              <Col xl={3} lg={4} md={6} sm={10} xs={12}>
                              <Card
                                style={{ margin: "5px", minHeight: "400px" }}
                              >
                                <CardActionArea>
                                  <CardMedia
                                    component="img"
                                    height="250px"
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
                                      <h6
                                        style={{
                                          margin: "5px 0px 20px 0px",
                                          fontSize: "16px",
                                          borderBottom: "1px solid #ccc",
                                          height: "50px",
                                        }}
                                      >
                                        <b>{item.competition}</b>
                                      </h6>

                                      <div
                                        style={{
                                          margin: "10px 0px",
                                          fontSize: "15px",
                                        }}
                                      >
                                        <span style={{ marginRight: "10px" }}>
                                          <HiLocationMarker />
                                        </span>
                                        <span>
                                          {item2.school_number}-maktab
                                        </span>
                                      </div>
                                      <div
                                        style={{
                                          margin: "10px 0px",
                                          fontSize: "15px",
                                        }}
                                      >
                                        <span style={{ marginRight: "10px" }}>
                                          <IoMdTrophy />
                                        </span>
                                        <span>{item.result}</span>
                                      </div>
                                      <div
                                        style={{
                                          margin: "10px 0px",
                                          fontSize: "15px",
                                        }}
                                      >
                                        <span style={{ marginRight: "10px" }}>
                                          <FaUserGraduate />
                                        </span>
                                        <span>{item3.full_name}</span>
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
                            </Col>
                            ):("")
                          ) : (
                            ""
                          )
                        ) : (
                          ""
                        );
                      });
                    });
                  })
                : ""}
            </Row>
          </Container>
        )}
        <Modal
          show={this.state.show}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Yutuq: {this.state.data.competition}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{this.state.data.text}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.closeModal()}>Yopish</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
