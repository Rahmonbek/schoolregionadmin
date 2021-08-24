import React, { Component } from 'react'
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { getStaff, getStaffs } from "../host/Config";
import GLOBAL from "../host/Global";
import { getSchools } from "../host/Config";

export default class Rahbariyat extends Component {
    state = {
      maktab1:null,
        maktab:[],
        datas: [],
        data: {},
        show: false,
        id:window.location.href.slice(window.location.href.lastIndexOf('/')+1)
      };
      getStaffS = () => {
          getStaffs()
            .then((res) => this.setState({ datas: res.data }))
            .catch(() => console.log("Ma'lumot yuklanmadi 2"));
      };
      getSchoolsAll = () => {
        getSchools().then((res) => this.getSchool(res.data))
        .catch(() => console.log("Ma'lumot yuklanmadi 2"));
      };
      getSchool=(val)=>{
        this.setState({
          maktab:val,
          maktab1:val[0].id,
          s:val[0].school_number
        })
        console.log(val[0].id,this.state.maktab1)
      }
      showModal = (id) => {
        this.setState({ show: true, data: this.state.datas[id] });
      };
      closeModal = () => {
        this.setState({ show: false, data: {} });
      };
      componentDidMount() {
        this.getSchoolsAll();
        this.getStaffS();
        console.log(this.state.maktab,this.state.maktab1)
      }
    render() {
        return (
            <div>
                <Container fluid>
          <Row>
            {this.state.datas !== []
              ? this.state.datas.map((item, key) => {
                  return (
                   this.state.maktab.map(item2=>{
                     return(
                      (parseInt(item2.id)===parseInt(item.school))?(
                        (parseInt(window.location.href.slice(window.location.href.lastIndexOf('/')+1))===parseInt(item.school))?(
                          <Col lg={3} md={4} sm={6} xs={12}>
                          <Card style={{ margin: "10px auto", borderRadius: "7px", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}}>
                            <Card.Img variant="top" src={item.image} />
                            <Card.Body>
                              <h6>
                                <p>{item.full_name}</p>
                                <p>{item.position }</p>
                                <p>{item.phone}</p>
                                <p>{item2.school_number}-maktab</p>
                              </h6>
                              <Button onClick={() => this.showModal(key)} style={{ fontSize: "12px" }}>
                                Ko'proq o'qish
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                        ):''
                       ):''
                     )
                   })
                  );
                })
              : ""}
        {
(parseInt(window.location.href.slice(window.location.href.lastIndexOf('/')+1))===0)?(
      this.state.datas.map((item2,key)=>{
        return(
          (parseInt(this.state.maktab1)===parseInt(item2.school))?(
          
              <Col lg={3} md={4} sm={6} xs={12}>
              <Card style={{ margin: "10px auto", borderRadius: "7px", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}}>
                <Card.Img variant="top" src={item2.image} />
                <Card.Body>
                  <h6>
                    <p>{item2.full_name}</p>
                    <p>{item2.position }</p>
                    <p>{item2.phone}</p>
                    <p>{this.state.s}-maktab</p>
                  </h6>
                  <Button onClick={() => this.showModal(key)} style={{ fontSize: "12px" }}>
                    Ko'proq o'qish
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            ):''
          
        )
        })
):''
}            
                
            
          </Row>
        </Container>
        <Modal show={this.state.show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">{this.state.data.full_name} haqida ma'lumot:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{this.state.data.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.closeModal()}>Yopish</Button>
          </Modal.Footer>
        </Modal>
            </div>
        )
    }
}
