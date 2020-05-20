import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { signIn } from '../../utils/AuthService.jsx';
import styles from './FormStyles.css';

const SignIn = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Bad credentials');
  const history = useHistory();

  const handleUsernameOnChange = (e) => {
    setIsError(false);
    setUsernameOrEmail(e.target.value);
    setIsValidUsername(!!e.target.value);
  };

  const handlePasswordOnChange = (e) => {
    setIsError(false);
    setPassword(e.target.value);
    setIsPasswordValid(!!e.target.value);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsPasswordValid(!!password);
    setIsValidUsername(!!usernameOrEmail);
    setIsLoading(true);
    if (!!password && !!usernameOrEmail) {
      const res = await signIn(usernameOrEmail, password);
      if (res.status === 200) {
        history.push('/images');
      } else {
        setIsError(true);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.FormContainer}>
      <Form className={styles.Form} noValidate onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label>Username or email:</Form.Label>
          <Form.Control
            type="text"
            name="usernameOrEmail"
            value={usernameOrEmail}
            onChange={handleUsernameOnChange}
            required
            isInvalid={!isValidUsername}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a username.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordOnChange}
            required
            isInvalid={!isPasswordValid}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a password.
          </Form.Control.Feedback>
        </Form.Group>
        {isError && <p className={styles.ErrorMessage}>{errorMessage}</p>}
        <Form.Group>
          <Button
            className={styles.RightMargin}
            type={'submit'}
            disabled={isLoading}
          >
            Sign in
          </Button>
          <Link to={'/signUp'}>
            <Button variant="outline-primary" disabled={isLoading}>
              Sign up
            </Button>
          </Link>
        </Form.Group>
      </Form>
    </div>
  );
};

export default SignIn;
