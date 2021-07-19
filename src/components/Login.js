import React from 'react';
import Form from './Form.js';
import * as mestpAuth from '../mestoAuth.js';
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

    mestpAuth.authorize(password, email).then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        this.setState({ email: '', password: '' }, () => {
          this.props.handleLogin({email: email});
          this.props.history.push('/');
        })
      } else {
        throw new Error();
      }
    })
      .catch((err) => {
        console.log(err)
      })
  };

render(){
  return (
    <Form 
      email={this.state.email} password={this.state.password}
      handleChange={this.handleChange} handleSubmit={this.handleSubmit} headingText="Вход" buttonText="Войти"/>
    
  )
}
}
export default withRouter(Login);