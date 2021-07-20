import React from 'react';
import Form from './Form.js';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.suggestedEmail || '',
      password: ''
    }
  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e) {
    e.preventDefault()

    const {email, password} = this.state
    this.props.loginRequest(password ,email)
  }


render(){
  return (
    <Form 
      email={this.state.email} password={this.state.password}
      handleChange={this.handleChange} handleSubmit={this.handleSubmit} headingText="Вход" buttonText="Войти"/>
    
  )
}
}
export default withRouter(Login);