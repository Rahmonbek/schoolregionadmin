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
import FadeLoader from "react-spinners/FadeLoader";

export default class Tadbirlar extends Component {
  state = {
loader:true,
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
    axios.get(`${url}/excellent/${window.location.href.slice(window.location.href.lastIndexOf('/')+1)}`)
    .then(res => {
        this.setState({
            datas:res.data
        })
    })
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
  showModal = (id) => {
    this.setState({ show: true, data: this.state.datas[id] });
  };
  closeModal = () => {
    this.setState({ show: false, data: {} });
  };
  componentDidUpdate(){
     this.getExcellents()
     
   }
  componentDidMount() {
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
                            // (parseInt(window.location.href.slice(window.location.href.lastIndexOf("/")+1))===48)?(
                                <Col lg={3} md={4} sm={6} xs={12}>
                                  <Card style={{ margin: "10px auto", borderRadius: "7px", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", height: "500px" }}>
                                    <Card.Img variant="top" src={item2.image} style={{ width: "100%", height: "250px" }} />
                                    {/* <Card.Img variant="top" src="https://picsum.photos/50" /> */}
                                    <Card.Body>
                                      <h6 style={{ margin: "5px 0px 20px 0px", fontSize: "16px", borderBottom: "1px solid #ccc", height: "50px" }}>
                                        <b>{item2.pupil}</b>
                                      </h6>
            
                                      <div style={{ margin: "10px 0px", fontSize: "15px" }}>
                                        <span style={{ marginRight: "10px" }}>
                                          <HiLocationMarker />
                                        </span>
                                        <span>{item2.address}</span>
                                      </div>
                                      <div style={{ margin: "10px 0px", fontSize: "15px" }}>
                                        <span style={{ marginRight: "10px" }}>
                                          <FaRegCalendarAlt />
                                        </span>
                                        <span>{item2.date}</span>
                                      </div>
                                      <div style={{ margin: "10px 0px", fontSize: "15px" }}>
                                        <span style={{ marginRight: "10px" }}>
                                          <FaHistory />
                                        </span>
                                        <span>{item2.time}</span>
                                      </div>
                                      {/* <p style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.text}</p> */}
                                      <Button onClick={() => this.showModal(key)} style={{ fontSize: "12px" }}>
                                        Batafsil
                                      </Button>
                                    </Card.Body>
                                  </Card>
                                 </Col>
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
