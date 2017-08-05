import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Checkbox, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { authActions } from '../../../core/auth';

const Column = Grid.Column;
const Row = Grid.Row;
const Field = Form.Field;
const Input = Form.Input;

class SignupPage extends Component {
    static propTypes = {
        signup: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
        };
    }

    handleSubmit = () => {
        const { username, email, password } = this.state;
        this.props.signup(username, email, password);
    }

    handleChangeUsername = (e) => {
        this.setState({ username: e.target.value });
    }

    handleChangeEmail = (e) => {
        this.setState({ email: e.target.value });
    }

    handleChangePwd = (e) => {
        this.setState({ password: e.target.value });
    }

    handleChangePwdConfirm = (e) => {
        this.setState({ passwordConfirm: e.target.value });
    }

    render() {
        const { username, email, password, passwordConfirm } = this.state;
        return (
            <Grid centered columns={ 4 }>
                <Row>
                    <Column>
                        <div>
                            <Form onSubmit={ this.handleSubmit }>
                                <Input label="Username" placeholder="Username" value={ username } onChange={ this.handleChangeUsername } required />
                                <Input label="Email" type="email" placeholder="Email" value={ email } onChange={ this.handleChangeEmail } required />
                                <Input label="Password" type="password" placeholder="Password" value={ password } onChange={ this.handleChangePwd } required />
                                <Input label="PasswordConfirm" type="password" placeholder="Password Confirm" value={ passwordConfirm } onChange={ this.handleChangePwdConfirm } required />
                                <Field>
                                    <Checkbox label="I agree to the Terms and Conditions" />
                                </Field>
                                <Button type="submit">Submit</Button>
                            </Form>
                        </div>
                    </Column>
                </Row>
            </Grid>
        );
    }
}

export default connect(null, authActions)(SignupPage);
