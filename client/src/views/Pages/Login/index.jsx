import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Checkbox, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { authActions } from '../../../core/auth';

const Column = Grid.Column;
const Row = Grid.Row;
const Field = Form.Field;
const Input = Form.Input;

class LoginPage extends Component {
    static propTypes = {
        login: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            username: '',
            password: '',
        };
    }

    handleSubmit = () => {
        const { username, password } = this.state;
        this.props.login(username, password);
    }

    handleChangeUsername = (e) => {
        this.setState({ username: e.target.value });
    }

    handleChangePwd = (e) => {
        this.setState({ password: e.target.value });
    }

    render() {
        const { username, password } = this.state;
        const signUpText = 'Don\'t Have Account? Sign Up one.';
        return (
            <DocumentTitle title="Login">
                <Grid centered columns={ 4 }>
                    <Row>
                        <Column>
                            <div>
                                <Form onSubmit={ this.handleSubmit }>
                                    <Input label="Username" placeholder="Username" value={ username } onChange={ this.handleChangeUsername } required />
                                    <Input label="Password" type="password" placeholder="Password" value={ password } onChange={ this.handleChangePwd } required />
                                    <Field>
                                        <Checkbox label="I agree to the Terms and Conditions" />
                                    </Field>
                                    <Link to="/signup">{ signUpText }</Link>
                                    <Button type="submit">Submit</Button>
                                </Form>
                            </div>
                        </Column>
                    </Row>
                </Grid>
            </DocumentTitle>
        );
    }
}

export default connect(null, authActions)(LoginPage);
