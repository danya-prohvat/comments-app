import React from 'react';
import styles from "./Form.module.scss";
import classNames from 'classnames';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import axios from "axios";
import {useState} from "react";
import {formValidation} from "../../utils/formValidation";

const CommentForm = () => {
    const [status, setStatus] = useState('');

    const initialValues = {
        name: '',
        text: ''
    };

    const formSubmit = (value, {resetForm}) => {
        setStatus('submitting...')
        axios.post('https://jordan.ashton.fashion/api/goods/30/comments', value)
            .then(response => {
                setStatus('comment was added')
                resetForm();
            })
            .catch((error) => {
                setStatus('some error')
            })

        setTimeout(() => setStatus(''), 3000)
    };


    return (<div>
        <Formik
            initialValues={initialValues}
            validate={formValidation}
            onSubmit={formSubmit}>
            <Form className={classNames(styles.form)}>
                <div className={classNames(styles.form__filed)}>
                    <Field className={classNames(styles.form__input)} id="name" name="name" type="text"
                           placeholder="Your name..."/>
                    <ErrorMessage className={classNames(styles.form__inputError)} component="div" name="name"/>
                </div>

                <div className={classNames(styles.form__filed)}>
                    <Field className={classNames(styles.form__textarea)} id="text" name="text"
                           as="textarea" placeholder="Your comment..."/>
                    <ErrorMessage className={classNames(styles.form__textareaError)} component="div" name="text"/>
                </div>

                <div className={classNames(styles.form__submitting)}>
                    <button className={classNames(styles.form__btn)} type="submit">Add comment</button>
                    <span className={classNames(styles.form__status)}>
                    {status}
                </span>
                </div>
            </Form>
        </Formik>
    </div>);
}

export default CommentForm;