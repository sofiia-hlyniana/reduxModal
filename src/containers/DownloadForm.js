import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormGroup } from 'react-bootstrap';
import { handleInput, handleFocus, handleBlur, formReset, submitCompanyFormData } from '../AC/form';
import { formStyles } from '../constants';

import '../assets/request-modal.styl';
import '../assets/modal-form.styl';

class DownloadForm extends Component {

	constructor(props) {
		super(props)
	}

	static PropTypes = {
		inputs: PropTypes.object.isRequired,
		handleInput: PropTypes.func.isRequired,
		handleFocus: PropTypes.func.isRequired,
		handleBlur: PropTypes.func.isRequired,
		submitFormData: PropTypes.func,
		formReset: PropTypes.func,
		submitSucceeded: PropTypes.bool,
		submitFailed: PropTypes.bool,
		downloadUrl: PropTypes.string
	};

	handleFocus = (input) => (ev) => {
		this.props.handleFocus(input, ev.target.value, ev.target.type)
	};

	handleInput = (input) => (ev) => {
		this.props.handleInput(input, ev.target.value, ev.target.type)
	};

	handleBlur = (input) => (ev) => {
		this.props.handleBlur(input, ev.target.value, ev.target.type)
	};

	handleFormSubmit = (ev) => {
		ev.preventDefault();
		this.props.submitCompanyFormData(this.props.ajaxUrl);
	};

	getButtonStatus() {
		const { formFields: { companyName, companyEmail } } = this.props;
		const isEveryFieldTouched = [ companyName, companyEmail ].every((field) => (field.touched));
		const isEveryFieldValid = [ companyName, companyEmail ].every((field) => (field.valid));
		return !(isEveryFieldTouched && isEveryFieldValid)
	};

	getButton() {
		const { buttonText, downloadUrl, fileName, isDownloadAllowed } = this.props;
		if (isDownloadAllowed) return (<a href={downloadUrl} target='_blank' download={fileName} className='btn btn-md modal-form__button'>{buttonText.allowed}</a>);
		return (<button type="submit" disabled={ this.getButtonStatus() } className='btn btn-md modal-form__button'>{buttonText.notAllowed}</button>)
	};

	getFormFields = () => {

	const {
				formFields: {
						companyName,
						companyEmail
				},
				inputs: {
						companyNameDefault,
						companyEmailDefault
				},
				isDownloadAllowed,
				submitFailed,
				errorMessage
		} = this.props;

		if (isDownloadAllowed) return null;

		return (
				<div>
					<FormGroup validationState={ companyName.error ? companyName.error : null}>
						<input
								type="text"
								value={ companyName.value }
								onBlur={this.handleBlur('companyName')}
								onFocus={this.handleFocus('companyName')}
								onChange={this.handleInput('companyName')}
								className={'modal-form__input'}
								name={companyNameDefault.name}
								required={companyNameDefault.required}
								placeholder={companyNameDefault.placeholder}
								id={companyNameDefault.id}/>
						{ companyName.touched && companyName.error && <div className="modal-form__error">{companyNameDefault.error}</div> }
					</FormGroup>
					<FormGroup validationState={ companyEmail.error ? companyEmail.error : null}>
						<input
								type="email"
								value={ companyEmail.value }
								onFocus={this.handleFocus('companyEmail')}
								onBlur={this.handleBlur('companyEmail')}
								onChange={this.handleInput('companyEmail')}
								className={'modal-form__input'}
								name={companyEmailDefault.name}
								required={companyEmailDefault.required}
								placeholder={companyEmailDefault.placeholder}
								id={companyEmailDefault.id}/>
						{ companyEmail.touched && companyEmail.error && <div className="modal-form__error">{companyEmailDefault.error}</div> }
					</FormGroup>
					{submitFailed ? <div className="modal-form__error modal-form__error_global">{errorMessage}</div> : null}
				</div>
		)
	};

	render() {

		const { isFetching, isDownloadAllowed } = this.props;

		return (
				<form
						name="downloadForm"
						className="modal-form"
						style={ isFetching ? formStyles.pending : null }
						onSubmit={isDownloadAllowed ? null : this.handleFormSubmit}
						noValidate="novalidate">
					{this.getFormFields()}
					{this.getButton()}
				</form>)
	}
}


export default connect((state) => ({
	formFields: state.form.get('formFields').toJS(),
	formStatus: state.form.get('formStatus'),
	isFetching: state.form.get('isFetching'),
	submitSucceeded: state.form.get('submitSucceeded'),
	submitFailed: state.form.get('submitFailed'),
	isFormValid: state.form.get('isFormValid'),
	isDownloadAllowed: state.form.get('isDownloadAllowed'),
	downloadUrl: state.form.get('downloadUrl')
}), {
	handleInput, handleBlur, handleFocus, formReset, submitCompanyFormData
})(DownloadForm);