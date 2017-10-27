import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { authActions } from '../../../core/auth';

const Column = Grid.Column;
const Row = Grid.Row;

class SecurityPage extends Component {
    render() {
        return (
            <Grid columns={ 8 }>
                <Row>
                    <Column>
                        <div>
                            Security
                        </div>
                    </Column>
                </Row>
            </Grid>
        );
    }
}

export default connect(null, authActions)(SecurityPage);
