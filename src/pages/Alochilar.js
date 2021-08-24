import React, { Component } from "react";
import axios from 'axios'
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { getEvent, getEvents } from "../host/Config";
import GLOBAL from "../host/Global";
import { FaRegCalendarAlt, FaHistory } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { message } from "antd";
import { getSchools,getExcellent,getClass,getPupil} from "../host/Config";
import { httpRequest, url } from "../host/Host";
import {FadeLoader} from "react-spinners/FadeLoader"
import {FcBusinessman,FcBusinesswoman} from 'react-icons/fc'
export default class Tadbirlar extends Component {
  state = {
      pupil:[],
      class:[],
    maktab:[],
    datas: [],
    data: {},
    show: false,
    id: window.location.href.slice(window.location.href.lastIndexOf("/") + 1),
  };
  
  
  getExcellents = () => {
      console.log(this.state.id)
      localStorage.setItem('nextId',window.location.href.slice(window.location.href.lastIndexOf('/')+1))
    axios.get(`${url}/excellent/${window.location.href.slice(window.location.href.lastIndexOf('/')+1)}`)
    .then(res => {
        this.setState({
            datas:res.data,
            loader:false
        })
    })
  };
  getSchoolsAll = () => {
    getSchools().then((res) => this.getSchool(res.data))
    .catch(() => console.log("Ma'lumot yuklanmadi 2"));
  };
  getPupils = () => {
    getPupil().then((res) => this.getPupilI(res.data))
    .catch(() => console.log("Ma'lumot yuklanmadi 2"));
  };
  getPupilI=(val)=>{
    this.setState({
      pupil:val
    })
  }
  getSchool=(val)=>{
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
  componentDidUpdate(){
    if(localStorage.getItem('nextId')!==window.location.href.slice(window.location.href.lastIndexOf('/')+1)){
     this.getExcellents()
    }
  }
  componentDidMount() {
    this.getPupils()
    this.getExcellents()
    this.getSchoolsAll()
  }
  render() {
    return (
        <div>
{
    this.state.loader?<div className="loaderT">
<FadeLoader

 color='blue' loading={this.state.loader} size={120} />        

    </div>:
      <div>
        <Container fluid>
          <Row>
            {
                   this.state.datas.map((item2,key)=>{
                       return(
                          
                                this.state.pupil.map((item3,key)=>{
                                  return(
                                    item2.pupil==item3.id?(
                                      <Col lg={3} md={4} sm={6} xs={12}>
                                      <Card style={{ margin: "10px auto", borderRadius: "7px", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", height: "500px" }}>
                                        <Card.Img variant="top" src={item3.image} style={{ width: "100%", height: "max-height" }} />
                                        {/* <Card.Img variant="top" src="https://picsum.photos/50" /> */}
                                        <Card.Body>
                                          <h6 style={{ margin: "5px 0px 20px 0px", fontSize: "16px", borderBottom: "1px solid #ccc", height: "50px" }}>
                                            <b>{item3.full_name}</b>
                                          </h6>
                
                                          <div style={{ margin: "10px 0px", fontSize: "15px" }}>
                                            <span style={{ marginRight: "10px" }}>
                                              <HiLocationMarker />
                                            </span>
                                            <span>{item3.clas}-sinf</span>
                                          </div>
                                          <div style={{ margin: "10px 0px", fontSize: "15px" }}>
                                            <span style={{ marginRight: "10px" }}>
                                              <FaRegCalendarAlt />
                                            </span>
                                            <span>Tug'ilgan sana: {item3.birth_day}</span>
                                          </div>
                                          <div style={{ margin: "10px 0px", fontSize: "15px" }}>
                                            <span style={{ marginRight: "10px" }}>
                                              <FcBusinessman />
                                            </span>
                                            <span style={{dipslay:'block'}}>Otasing F.I.O: {item3.father_name}</span>
                                            <span style={{dipslay:'block'}}>{item3.father_tel}</span>
                                          </div>
                                          <div style={{ margin: "10px 0px", fontSize: "15px" }}>
                                            <span style={{ marginRight: "10px" }}>
                                              <FcBusinesswoman/>
                                            </span>
                                            <span style={{dipslay:'block'}}>Onasining F.I.O: {item3.mother_name}</span>
                                            <span style={{dipslay:'block'}}>{item3.mother_tel}</span>
                                          </div>
                                        
                                          {/* <p style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.text}</p> */}
                                          <Button onClick={() => this.showModal(key)} style={{ fontSize: "12px" }}>
                                            Batafsil
                                          </Button>
                                        </Card.Body>
                                      </Card>
                                     </Col>
                                    ):''
                                  )
                                })
                       )
                   })
                }
          </Row>
        </Container>
        <Modal show={this.state.show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
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
  }
  </div>
    );
  }
}
