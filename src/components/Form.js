import React from 'react';

function Form(props) {
    return (
        <section className="form">
            <h1 className="form__heading">{props.headingText}</h1>
            <form className="form__enter" onSubmit={props.handleSubmit} name="mainForm">
                <input 
                    className="form__input" name="email" value={props.email} 
                    onChange={props.handleChange} placeholder="Email" type="text" />
                <input 
                    className="form__input" name="password" value={props.password} 
                    onChange={props.handleChange} placeholder="Пароль" type="password" />
                <button className="form__button" type="submit">{props.buttonText}</button>
            </form>
            {props.children}
        </section>
    )
}
export default Form;