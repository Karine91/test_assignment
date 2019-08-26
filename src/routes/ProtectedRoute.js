import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProtectedRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (<Route {...rest} component={(props) => (
    isAuthenticated ? (
        <div>
            {/* <Header /> */}
            <Component {...props} />
        </div>
    ) : (
            <Redirect to="/login" />
        )
)} />
    )

ProtectedRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.token,

});

export default connect(mapStateToProps)(ProtectedRoute)
