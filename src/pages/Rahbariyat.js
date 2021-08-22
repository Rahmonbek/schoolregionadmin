import React, { Component } from 'react'
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { getStaff, getStaffs } from "../host/Config";
import GLOBAL from "../host/Global";

export default class Rahbariyat extends Component {
    state = {
        datas: [],
        data: {},
        show: false,
      };
      getStaffS = () => {
        if (GLOBAL.id !== null)
          getStaff()
            .then((res) => this.setState({ datas: res.data }))
            .catch(() => console.log("Ma'lumot yuklanmadi 1"));
        else
          getStaffs()
            .then((res) => this.setState({ datas: res.data }))
            .catch(() => console.log("Ma'lumot yuklanmadi 2"));
      };
      showModal = (id) => {
        this.setState({ show: true, data: this.state.datas[id] });
      };
      closeModal = () => {
        this.setState({ show: false, data: {} });
      };
      componentDidMount() {
        this.getStaffS();
      }
    render() {
        return (
            <div>
                <Container fluid>
          <Row>
            {this.state.datas !== []
              ? this.state.datas.map((item, key) => {
                  return (
                    <Col lg={3} md={4} sm={6} xs={12}>
                      <Card style={{ margin: "10px auto", borderRadius: "7px", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
                        <Card.Img variant="top" src={item.image} />
                        <Card.Body>
                          <h6>
                            <p>{item.full_name}</p>
                            <p>{item.position }</p>
                            <p>{item.phone}</p>
                            <p>{item.school}-maktab</p>
                          </h6>
                          <Button onClick={() => this.showModal(key)} style={{ fontSize: "12px" }}>
                            Ko'proq o'qish
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })
              : ""}
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
