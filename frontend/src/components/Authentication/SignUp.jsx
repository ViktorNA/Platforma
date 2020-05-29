import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import styles from './FormStyles.css';
import { signUp } from '../../utils/AuthService.jsx';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [isNameError, setIsNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      setIsUsernameError(true);
      return;
    }
    if (!email) {
      setIsEmailError(true);
      return;
    }
    if (!name) {
      setIsNameError(true);
      return;
    }
    if (!password) {
      setIsPasswordError(true);
      return;
    }
    if (isPasswordError || isUsernameError || isNameError || isEmailError)
      return;
    setIsLoading(true);
    const res = await signUp(username, email, name, password);
    if (res.status === 200) {
      history.push('/test');
    } else {
      setErrorMessage(res.message);
      setIsError(true);
    }
    setIsLoading(false);
  };

  const usernameOnChange = (e) => {
    const newUsername = e.target.value;
    setIsUsernameError(false);
    setUsername(newUsername);
    if (newUsername.length < 3 || newUsername.length > 15) {
      setIsUsernameError(true);
      setUsernameErrorMessage('Username length must be 3...15 symbols');
      return;
    }
  };

  const emailOnChange = (e) => {
    const newEmail = e.target.value;
    setIsEmailError(false);
    setEmail(newEmail);
    if (!newEmail.length) {
      setIsEmailError(true);
      setEmailErrorMessage("Enter can't be empty");
      return;
    }
    if (newEmail.length > 40) {
      setIsEmailError(true);
      setEmailErrorMessage('Email length must be less then 40 symbols');
      return;
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(newEmail).toLowerCase())) {
      setIsEmailError(true);
      setEmailErrorMessage('Wrong email format');
      return;
    }
  };
  const nameOnChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    setIsNameError(false);
    if (newName.length < 4 || newName.length > 40) {
      setNameErrorMessage('Full name must be 4...40 symbols');
      setIsNameError(true);
    }
  };
  const passwordOnChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsPasswordError(false);
    if (newPassword.length < 6 || newPassword.length > 20) {
      setPasswordErrorMessage('Password must be 6...20 symbols');
      setIsPasswordError(true);
    }
  };
  useEffect(() => {
    setIsError(false);
  }, [username, email, name, password]);
  return (
    <div className={styles.FormContainer}>
      <Form className={styles.Form} noValidate onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={usernameOnChange}
            required
            isInvalid={isUsernameError}
          />
          <Form.Control.Feedback type="invalid">
            {usernameErrorMessage}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={email}
            onChange={emailOnChange}
            required
            isInvalid={isEmailError}
          />
          <Form.Control.Feedback type="invalid">
            {emailErrorMessage}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Full name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={nameOnChange}
            required
            isInvalid={isNameError}
          />
          <Form.Control.Feedback type="invalid">
            {nameErrorMessage}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={passwordOnChange}
            required
            isInvalid={isPasswordError}
          />
          <Form.Control.Feedback type="invalid">
            {passwordErrorMessage}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type={'submit'} disabled={isLoading}>
          Sign up
        </Button>
      </Form>
      {isError && <p className={styles.ErrorMessage}>{errorMessage}</p>}
    </div>
  );
};

export default SignUp;
