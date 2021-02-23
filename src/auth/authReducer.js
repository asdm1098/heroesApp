import { types } from "../types/types";

/*const state = {
    name: 'Stiven',
    logged: true
}*/


export const authReducer = (state = {}, action) => {

    switch (action.type) {
        case types.login:        
            return{
                ...action.payload, //todo lo que venga en el payload del usuario, nom y email
                logged: true  //autenticacion del usuario, si pasa
            }
        
        case types.logout:
            return{
                logged: false
            }

        default:
            return state;
    }
}