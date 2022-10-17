import React from 'react';
import {Route} from 'react-router-dom';
import AppBar from './AppBar';
import Footer from './Footer';

function LayoutRoute(props) {
    return(
        <React.Fragment>

            <AppBar/>
            <Route path={props.path} exact={props.exact} component={props.component}/>
            <Footer/>
        </React.Fragment>
    )
}

export default LayoutRoute