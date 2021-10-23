import React, { Component } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { getEvents } from "../host/Config";
import { FaRegCalendarAlt, FaSchool } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { message } from "antd";
import { getSchools } from "../host/Config";
import { BiTime } from "react-icons/bi";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import Loader from "./Loader";
export default class Tadbirlar extends Component {
  state = {
    loader: true,
    maktab: [],
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
  getNumberSchool = (id) => {
    var maktabNumber = "";
    this.state.maktab.map((item) => {
      if (id === item.id) {
        if (item.school_number !== null)
          maktabNumber = `${item.school_number} - maktab`;
        else maktabNumber = `${item.school_name}`;
      }
    });
    return maktabNumber;
  };
  showModal = (id) => {
    this.setState({ show: true, data: this.state.datas[id] });
  };
  closeModal = () => {
    this.setState({ show: false, data: {} });
  };
  componentDidMount() {
    this.getEvents();
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
                                  <span></span>
                                  <span>{item.address}</span>
                                </div>

                                <div
                                  style={{
                                    margin: "10px 0px",
                                    fontSize: "15px",
                                  }}
                                >
                                  <span style={{ marginRight: "10px" }}>
                                    <FaRegCalendarAlt />
                                  </span>
                                  <span>{item.date}</span>
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
                                  <span>{item.time}</span>
                                </div>
                                {this.getNumberSchool(item.school) !== "" ? (
                                  <div
                                    style={{
                                      margin: "10px 0px",
                                      fontSize: "15px",
                                    }}
                                  >
                                    <span style={{ marginRight: "10px" }}>
                                      <FaSchool />
                                    </span>
                                    <span>
                                      {this.getNumberSchool(item.school)}
                                    </span>
                                  </div>
                                ) : (
                                  ""
                                )}
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
                    ) :parseInt(
                      window.location.href.slice(
                        window.location.href.lastIndexOf("/") + 1
                      )
                    ) ===-1? (
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
                                <span></span>
                                <span>{item.address}</span>
                              </div>

                              <div
                                style={{
                                  margin: "10px 0px",
                                  fontSize: "15px",
                                }}
                              >
                                <span style={{ marginRight: "10px" }}>
                                  <FaRegCalendarAlt />
                                </span>
                                <span>{item.date}</span>
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
                                <span>{item.time}</span>
                              </div>
                              {this.getNumberSchool(item.school) !== "" ? (
                                <div
                                  style={{
                                    margin: "10px 0px",
                                    fontSize: "15px",
                                  }}
                                >
                                  <span style={{ marginRight: "10px" }}>
                                    <FaSchool />
                                  </span>
                                  <span>
                                    {this.getNumberSchool(item.school)}
                                  </span>
                                </div>
                              ) : (
                                ""
                              )}
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
                    ):''):('')
                  })
                }):( "")}

            
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
