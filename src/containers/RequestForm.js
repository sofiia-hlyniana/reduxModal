import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormGroup } from 'react-bootstrap'
import SuccessIcon from '../components/SuccessIcon'
import { handleInput, handleFocus, handleBlur, formReset, submitFormData } from '../AC/form'
import { formStyles } from '../constants'

import '../assets/request-modal.styl';
import '../assets/modal-form.styl';

class RequestForm extends Component {

	constructor(props) {
		super(props)
	}

	static PropTypes = {
		inputs: PropTypes.object.isRequired,
		handleInput: PropTypes.func,
		handleFocus: PropTypes.func,
		submitFormData: PropTypes.func,
		formReset: PropTypes.func,
		submitSucceeded: PropTypes.bool,
		submitFailed: PropTypes.bool
	};

	componentWillUnmount() {
		this.props.formReset()
	}

	handleFocus = (input) => (ev) => {
		this.props.handleFocus(input, ev.target.value, ev.target.type)
	};

	handleInputChange = (input) => (ev) => {
		this.props.handleInput(input, ev.target.value, ev.target.type)
	};

	handleBlur = (input) => (ev) => {
		this.props.handleBlur(input, ev.target.value, ev.target.type)
	};

	handleFormSubmit = (ev) => {
		ev.preventDefault();
		this.props.submitFormData(this.props.ajaxUrl)
	};

	getButtonStatus = () => {
		const { formFields: { userName, userEmail, requestText } } = this.props;
		const isEveryFieldTouched = [ userName, userEmail, requestText ].every((field) => (field.touched));
		const isEveryFieldValid = [ userName, userEmail, requestText ].every((field) => (field.valid));
		return !(isEveryFieldTouched && isEveryFieldValid)
	};

	render() {

		const {
				formFields: {
						userName,
						userEmail,
						requestText
				},
				inputs: {
						userNameDefault,
						userEmailDefault,
						requestTextDefault
				},
				buttonText,
				errorMessage,
				isFetching,
				submitSucceeded,
				submitFailed
		} = this.props;

		return (submitSucceeded ? <SuccessIcon /> : (
						<form name="request"
									style={ isFetching ? formStyles.pending : null }
									className="modal-form"
									onSubmit={this.handleFormSubmit}
									noValidate="novalidate">
							<FormGroup validationState={ userName.error ? userName.error : null}>
								<input
										type="text"
										value={ userName.value }
										onBlur={this.handleBlur('userName')}
										onFocus={this.handleFocus('userName')}
										onChange={this.handleInputChange('userName')}
										className={'modal-form__input'}
										name={userNameDefault.name}
										required={userNameDefault.required}
										placeholder={userNameDefault.placeholder}
										id={userNameDefault.id}/>
								{ userName.touched && userName.error &&
								<div className="modal-form__error">{userNameDefault.error}</div> }
							</FormGroup>
							<FormGroup validationState={ userEmail.error ? userEmail.error : null}>
								<input
										type="email"
										value={ userEmail.value }
										onFocus={this.handleFocus('userEmail')}
										onBlur={this.handleBlur('userEmail')}
										onChange={this.handleInputChange('userEmail')}
										className={'modal-form__input'}
										name={userEmailDefault.name}
										required={userEmailDefault.required}
										placeholder={userEmailDefault.placeholder}
										rows={userEmailDefault.rows}
										id={userEmailDefault.id}/>
								{ userEmail.touched && userEmail.error &&
								<div className="modal-form__error">{userEmailDefault.error}</div> }
							</FormGroup>
							<FormGroup validationState={ requestText.error ? requestText.error : null }>
                <textarea
										value={ requestText.value }
										onFocus={this.handleFocus('requestText')}
										onBlur={this.handleBlur('requestText')}
										onChange={this.handleInputChange('requestText')}
										className={'modal-form__input modal-form__input_textarea'}
										name={requestTextDefault.name}
										required={requestTextDefault.required}
										placeholder={requestTextDefault.placeholder}
										rows={requestTextDefault.rows}
										id={requestTextDefault.id}/>
								{ requestText.touched && requestText.error &&
								<div className="modal-form__error">{requestTextDefault.error}</div> }
							</FormGroup>
							{submitFailed ? <div className="modal-form__error modal-form__error_global">{errorMessage}</div> : null}
							<button disabled={ this.getButtonStatus() }
											className={'btn btn-md modal-form__button'}>{buttonText}</button>
						</form>
				)
		)
	}
}


export default connect((state) => ({
	formFields: state.form.get('formFields').toJS(),
	formStatus: state.form.get('formStatus'),
	isFetching: state.form.get('isFetching'),
	submitSucceeded: state.form.get('submitSucceeded'),
	submitFailed: state.form.get('submitFailed'),
	isFormValid: state.form.get('isFormValid')
}), {
	handleInput, handleBlur, handleFocus, formReset, submitFormData
})(RequestForm);