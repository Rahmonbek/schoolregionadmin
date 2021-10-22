import React, { Component } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { getNew, getNews } from "../host/Config";
import GLOBAL from "../host/Global";
import { FaHistory,FaUserGraduate } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { message } from "antd";
import { getSchools ,getAchievment,getPupil} from "../host/Config";
import {IoMdTrophy} from 'react-icons/io'
import Loader from "./Loader";
export default class Yutuqlar extends Component {
  state = {
   loader:true,
    pupil:[],
    maktab:[],
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
    getSchools().then((res) => this.getSchool(res.data))
    .catch(() => console.log("Ma'lumot yuklanmadi 2"));
  };
  getSchool=(val)=>{
    this.setState({
      maktab:val
    })
  }
  getPupils = () => {
    getPupil().then((res) => this.getPupilI(res.data))
    .catch(() => console.log("Ma'lumot yuklanmadi 2"));
  };
  getPupilI=(val)=>{
    this.setState({
      pupil:val
    })
  }
  showModal = (id) => {
    this.setState({ show: true, data: this.state.datas[id] });
  };
  closeModal = () => {
    this.setState({ show: false, data: {} });
  };
  componentDidMount() {
      this.getPupils()
    this.getAchievments();
    this.getSchoolsAll()
    setInterval(() => {
      this.setState({
        loader: false,
      });
    }, 3000);
  }
  render() {
    return (
      <div>{this.state.loader===true?(<Loader/>):(
        <Container fluid>
          <Row>
            {this.state.datas !== []
              ? this.state.datas.map((item, key) => {
                  return(
                  this.state.maktab.map(item2=>{
                    return(
                     this.state.pupil.map(item3=>{
                         return(
                    
                                (parseInt(item2.id)===parseInt(item.school))?(
                                    (parseInt(item.pupils)===parseInt(item3.id))?(
                                    (parseInt(window.location.href.slice(window.location.href.lastIndexOf("/") + 1)) === parseInt(item.school)) ? (
                                      <Col lg={3} md={4} sm={6} xs={12}>
                                        <Card style={{ margin: "10px auto", borderRadius: "7px", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", height: "500px" }}>
                                          <Card.Img variant="top" src={item.image} style={{ width: "100%", height: "250px" }} />
                                          {/* <Card.Img variant="top" src="https://picsum.photos/50" /> */}
                                          <Card.Body>
                                            <h6 style={{ margin: "5px 0px 20px 0px", fontSize: "16px", borderBottom: "1px solid #ccc", height: "50px" }}>
                                              <b>{item.competition}</b>
                                            </h6>
                  
                                            <div style={{ margin: "10px 0px", fontSize: "15px" }}>
                                              <span style={{ marginRight: "10px" }}>
                                                <HiLocationMarker/>
                                              </span>
                                              <span>{item2.school_number}-maktab</span>
                                            </div>
                                            <div style={{ margin: "10px 0px", fontSize: "15px" }}>
                                              <span style={{ marginRight: "10px" }}>
                                                <IoMdTrophy/>
                                                </span>
                                                <span>{item.result}</span>       
                                            </div>
                                            <div style={{ margin: "10px 0px", fontSize: "15px" }}>
                                              <span style={{ marginRight: "10px" }}>
                                                <FaUserGraduate />
                                                </span>
                                                <span>{item3.full_name}</span>
                                            </div>
                                            <Button onClick={() => this.showModal(key)} style={{ fontSize: "12px" }}>
                                              Batafsil
                                            </Button>
                                          </Card.Body>
                                        </Card>
                                      </Col>
                                    ) : ''
                                  ):""
                             ):''
                         )
                     })
                    )
                  })
                    
                  )
                })
              : ""}
           
          </Row>
        </Container>)}
        <Modal show={this.state.show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">Yutuq: {this.state.data.competition}</Modal.Title>
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
