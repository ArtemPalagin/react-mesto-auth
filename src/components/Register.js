import React from 'react';
import Form from './Form.js';
import * as mestpAuth from '../mestoAuth.js';
import { Link, withRouter } from 'react-router-dom';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
    e.preventDefault();

    if (!this.state.password || !this.state.email) {
      return
    }

    mestpAuth.register(this.state.password, this.state.email).then((resp) => {
    
      this.setState({ email: '', password: '' }, () => {
        this.props.suggestLogin(resp.data.email);
        this.props.infoTooltipOpen(true);
        this.props.history.push('/sign-in');
      })}).catch((err) => {
      this.props.infoTooltipOpen(false);
      console.log(err);
    });
  }
  render() {
    return (
      <Form handleSubmit={this.handleSubmit} handleChange={this.handleChange} email={this.state.email} headingText="Регистрация" buttonText="Зарегистрироваться">
        <Link to="/sign-in" className="form__link">Уже зарегистрированы? Войти</Link>
      </Form>
    )
  }
}
export default withRouter(Register);