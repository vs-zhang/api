import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Grid } from 'semantic-ui-react';

const Column = Grid.Column;
const Row = Grid.Row;

export default class ProfilePage extends Component {
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
