import React, { Component } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { getNew, getNews } from "../host/Config";
import GLOBAL from "../host/Global";
import { FaHistory } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { message } from "antd";
import { getSchools } from "../host/Config";

export default class Yangilik extends Component {
  state = {
    maktab:[],
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
    getSchools().then((res) => this.getSchool(res.data))
    .catch(() => console.log("Ma'lumot yuklanmadi 2"));
  };
  getSchool=(val)=>{
    console.log(val)
    this.setState({
      maktab:val
    })
  }
  showModal = (id) => {
    this.setState({ show: true, data: this.state.datas[id] });
  };
  closeModal = () => {
    this.setState({ show: false, data: {} });
  };
  componentDidMount() {
    this.getNews();
    this.getSchoolsAll()
  }
  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            {this.state.datas !== []
              ? this.state.datas.map((item, key) => {
                  return(
                  this.state.maktab.map(item2=>{
                    return(
                      (parseInt(item2.id)===parseInt(item.school))?(
                        (parseInt(window.location.href.slice(window.location.href.lastIndexOf("/") + 1)) === parseInt(item.school)) ? (
                          <Col lg={3} md={4} sm={6} xs={12}>
                            <Card style={{ margin: "10px auto", borderRadius: "7px", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", height: "500px" }}>
                              <Card.Img variant="top" src={item.image} style={{ width: "100%", height: "250px" }} />
                              {/* <Card.Img variant="top" src="https://picsum.photos/50" /> */}
                              <Card.Body>
                                <h6 style={{ margin: "5px 0px 20px 0px", fontSize: "16px", borderBottom: "1px solid #ccc", height: "50px" }}>
                                  <b>{item.title}</b>
                                </h6>
      
                                
                                  <p>{item2.school_number}-maktab</p>
                              
                               
                                  <p>{item.published_time}</p>
                               
                                {/* <p style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.text}</p> */}
                                <Button onClick={() => this.showModal(key)} style={{ fontSize: "12px" }}>
                                  Batafsil
                                </Button>
                              </Card.Body>
                            </Card>
                          </Col>
                        ) : ''
                      ):""
                    )
                  })
                    
                  )
                })
              : ""}
            {this.state.datas !== []
              ? this.state.datas.map((item, key) => {
                  return (
                  (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) === 'all') ? (
                    <Col lg={3} md={4} sm={6} xs={12}>
                      <Card style={{ margin: "10px auto", borderRadius: "7px", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", height: "500px" }}>
                        <Card.Img variant="top" src={item.image} style={{ width: "100%", height: "250px" }} />
                        {/* <Card.Img variant="top" src="https://picsum.photos/50" /> */}
                        <Card.Body>
                          <h6 style={{ margin: "5px 0px 20px 0px", fontSize: "16px", borderBottom: "1px solid #ccc", height: "50px" }}>
                            <b>{item.title}</b>
                          </h6>

                          
                            <p>{item.school}-maktab</p>
                       
                          
                            <p>{item.published_time}</p>
                         
                          {/* <p style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.text}</p> */}
                          <Button onClick={() => this.showModal(key)} style={{ fontSize: "12px" }}>
                            Batafsil
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ) : ''

                  )
                })
              : ""}
           
          </Row>
        </Container>
        <Modal show={this.state.show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">Yangilik sarlavhasi: {this.state.data.title}</Modal.Title>
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
