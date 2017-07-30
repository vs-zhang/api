import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

const Column = Grid.Column;

class LoginPage extends Component {
    render() {
        return (
            <Grid centered columns={ 3 }>
                <Column>
                    <div>
                        Login
                    </div>
                </Column>
            </Grid>
        );
    }
}

export default LoginPage;
