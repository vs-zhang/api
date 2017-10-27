import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { authActions } from '../../../core/auth';

const Column = Grid.Column;
const Row = Grid.Row;

class ProfilePage extends Component {
    render() {
        return (
            <DocumentTitle title="Profile">
                <Grid columns={ 8 }>
                    <Row>
                        <Column>
                            <div>
                                Profile
                            </div>
                        </Column>
                    </Row>
                </Grid>
            </DocumentTitle>
        );
    }
}

export default connect(null, authActions)(ProfilePage);
