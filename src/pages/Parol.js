import { message } from 'antd'
import axios from 'axios'
import React, { Component } from 'react'
import {Form, Button, Col, Row} from "react-bootstrap"
import GLOBAL from '../host/Global'
import { url } from '../host/Host'
export default class Parol extends Component {
    state={
        input:true
    }
    addLessonParol=(e)=>{
          e.preventDefault();
          const formData = new FormData(e.target)
        formData.append('id', GLOBAL.user)
            var formDataObj = Object.fromEntries(formData.entries());
            formDataObj.id=Number(formDataObj.id)
            
            var config={
              user_id:GLOBAL.id,
                password:document.getElementById('pass').value,
              }
              console.log(config)
            // formDataObj.school=Number(formDataObj.school)
            axios.post(`${url}/reset-password/`, config).then(res=>{message.success("Parol saqlandi");}).catch(err=>{message.error("Parol saqlanmadi")})
        
          }
    render() {
        return (
            <div>
            <Form  onSubmit={this.addLessonParol} style={{backgroundColor:'white', padding:'20px', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px', marginBottom:'30px'}}>
   <Row>
     <Col lg={7}>
     <Form.Group controlId="pass" className="mb-3">
    <Form.Label style={{borderBottom:'1px solid black', marginBottom:'20px', fontSize:"16px"}}>Yangi passwordni kiriting</Form.Label>
    <Form.Control className="formInput"  name="password" type={this.state.input?"password":"text"}   required={true}/>
  </Form.Group>
   
     </Col>
     <Col lg={5} style={{display:"flex", alignItems:'center', justifyContent:'center'}}>
     <Button style={{position:'relative', top:'20px'}} variant="danger" onClick={()=>{this.setState({input:!this.state.input})}}>Parolni ko'rish</Button>
       <Button style={{position:'relative', top:'20px'}} variant="primary" type="submit">Parolni saqlash</Button>
       </Col>
   </Row>
      </Form>
            </div>
        )
    }
}
