import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types';

//protección de rutas
export const PrivateRoute = ({
    isAutenticated,
    component: Component,
    ...rest //resto de los elementos de esa manera puedo pasarselo al componente de la manera que quiero
}) => {

    //console.log(rest.location.pathname);
    localStorage.setItem('lastPath', rest.location.pathname);

    return (
        <Route { ...rest }

            component={ (props) => (
                (isAutenticated )
                    ? ( <Component { ...props } /> ) 
                    : ( <Redirect to="/login" /> )
            )
            }

        />
    )
}

PrivateRoute.propTypes = {
    isAutenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
