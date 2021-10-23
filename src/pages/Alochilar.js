import React, { Component } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { getEvent, getEvents } from "../host/Config";
import GLOBAL from "../host/Global";
import { FaRegCalendarAlt, FaHistory } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { message } from "antd";
import { getSchools, getExcellent, getClass, getPupil } from "../host/Config";
import { httpRequest, url } from "../host/Host";
import FadeLoader from "react-spinners/FadeLoader";
import { FcBusinessman, FcBusinesswoman, FcPhone } from "react-icons/fc";

import { FiBookmark } from "react-icons/fi";
import Loader from "./Loader";
export default class Tadbirlar extends Component {
  state = {
    loader: true,
    pupil: [],
    class: [],
    maktab: [],
    datas: [],
    data: {},
    show: false,
    id: window.location.href.slice(window.location.href.lastIndexOf("/") + 1),
  };

  getExcellents = () => {
    console.log(this.state.id);
    localStorage.setItem(
      "nextId",
      window.location.href.slice(window.location.href.lastIndexOf("/") + 1)
    );
    axios
      .get(
        `${url}/excellent/${window.location.href.slice(
          window.location.href.lastIndexOf("/") + 1
        )}`
      )
      .then((res) => {
        this.setState({
          datas: res.data,
          loader: true,
        });
      });
  };
  getSchoolsAll = () => {
    getSchools()
      .then((res) => this.getSchool(res.data))
      .catch(() => console.log("Ma'lumot yuklanmadi 2"));
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
  getClasses = () => {
    getClass()
      .then((res) => this.getClassI(res.data))
      .catch(() => console.log("Ma'lumot yuklanmadi 2"));
  };
  getClassI = (val) => {
    this.setState({
      class: val,
    });
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
  componentDidUpdate() {
    if (
      localStorage.getItem("nextId") !==
      window.location.href.slice(window.location.href.lastIndexOf("/") + 1)
    ) {
      this.getExcellents();
    }
  }
  componentDidMount() {
    this.getClasses();
    this.getPupils();
    this.getExcellents();
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
              {this.state.datas.map((item2, key) => {
                return this.state.pupil.map((item3, key) => {
                  return this.state.class.map((item4) => {
                    return item2.pupil == item3.id ? (
                      item4.id === item3.clas ? (
                        <Col lg={4} md={6} sm={12} xs={12}>
                          <Card
                            style={{
                              margin: "10px auto",
                              borderRadius: "7px",
                              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                              height: "600px",
                            }}
                          >
                            <Card.Img
                              variant="top"
                              className="gimg"
                              src={item3.image}
                              style={{ width: "100%", height: "max-height" }}
                            />
                            {/* <Card.Img variant="top" src="https://picsum.photos/50" /> */}
                            <Card.Body>
                              <h6
                                style={{
                                  margin: "5px 0px 20px 0px",
                                  fontSize: "16px",
                                  borderBottom: "1px solid #ccc",
                                  height: "50px",
                                }}
                              >
                                <b>{item3.full_name}</b>
                              </h6>

                              <div
                                style={{ margin: "10px 0px", fontSize: "15px" }}
                              >
                                <span style={{ marginRight: "10px" }}>
                                  <FiBookmark />
                                </span>
                                <span>
                                  {item4.school}-maktab {item4.class_number}-"
                                  {item4.class_char}" sinf
                                </span>
                              </div>

                              <div
                                style={{ margin: "10px 0px", fontSize: "15px" }}
                              >
                                <span style={{ marginRight: "10px" }}>
                                  <FaRegCalendarAlt />
                                </span>
                                <span>Tug'ilgan sana: {item3.birth_day}</span>
                              </div>
                              <div
                                style={{ margin: "10px 0px", fontSize: "15px" }}
                              >
                                <span style={{ marginRight: "10px" }}>
                                  <FcBusinessman />
                                </span>
                                <span style={{ dipslay: "block" }}>
                                  Otasi: {item3.father_name}
                                </span>
                              </div>
                              <div
                                style={{ margin: "10px 0px", fontSize: "15px" }}
                              >
                                <span style={{ marginRight: "10px" }}>
                                  <FcPhone />
                                </span>
                                <span style={{ dipslay: "block" }}>
                                  Tel: {item3.father_tel}
                                </span>
                              </div>
                              <div
                                style={{ margin: "10px 0px", fontSize: "15px" }}
                              >
                                <span style={{ marginRight: "10px" }}>
                                  <FcBusinesswoman />
                                </span>
                                <span style={{ dipslay: "block" }}>
                                  Onasi: {item3.mother_name}
                                </span>
                              </div>
                              <div
                                style={{ margin: "10px 0px", fontSize: "15px" }}
                              >
                                <span style={{ marginRight: "10px" }}>
                                  <FcPhone />
                                </span>
                                <span style={{ dipslay: "block" }}>
                                  Tel: {item3.mother_tel}
                                </span>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    );
                  });
                });
              })}
            </Row>
          </Container>
        )}
      </div>
    );
  }
}
