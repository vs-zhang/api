import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

const Column = Grid.Column;
const Row = Grid.Row;

export default class SecurityPage extends Component {
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
