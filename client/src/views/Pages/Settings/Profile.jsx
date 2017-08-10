import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Checkbox, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { authActions } from '../../../core/auth';

const Column = Grid.Column;
const Row = Grid.Row;
const Field = Form.Field;
const Input = Form.Input;

class ProfilePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid columns={ 8 }>
                <Row>
                    <Column>
                        <div>
                            Profile
                        </div>
                    </Column>
                </Row>
            </Grid>
        );
    }
}

export default connect(null, authActions)(ProfilePage);
