import React, { Component } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { getEvent, getEvents } from "../host/Config";
import GLOBAL from "../host/Global";

export default class Tadbirlar extends Component {
  state = {
    datas: [],
    data: {},
    show: false,
  };
  getEvents = () => {
    if (GLOBAL.id !== null)
      getEvent()
        .then((res) => this.setState({ datas: res.data }))
        .catch(() => console.log("Ma'lumot yuklanmadi"));
    else
      getEvents()
        .then((res) => this.setState({ datas: res.data }))
        .catch(() => console.log("Ma'lumot yuklanmadi"));
  };
  showModal = (id) => {
    this.setState({ show: true, data: this.state.datas[id] });
  };
  closeModal = () => {
    this.setState({ show: false, data: {} });
  };
  componentDidMount() {
    this.getEvents();
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
                            <b>{item.title}</b>
                          </h6>
                          <p style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.text}</p>
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
            <Modal.Title id="contained-modal-title-vcenter">Tadbir sarlavhasi: {this.state.data.title}</Modal.Title>
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
