import React from 'react';
import { mount } from 'enzyme';
import { AuthContext } from '../../../auth/AuthContext';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';

describe('Pruebas en <LoginScreen />', () => {
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false,
        }
    }
    
    const historyMock = {
        replace: jest.fn()
    }

    const wrapper = mount(

        <AuthContext.Provider value={ contextValue }>
            <LoginScreen history = {historyMock } />
        </AuthContext.Provider>
    );

    test('debe de mostrarse correctamente ', () => {
        
        expect( wrapper ).toMatchSnapshot();

    });

    test('debe de realizar el dispatch y la navegacion', () => {
        
        const handleClick = wrapper.find('button').prop('onClick');
        handleClick();

        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: 'Stiven Diaz'
            }
        });

        expect( historyMock.replace ).toHaveBeenCalledWith('/');

        //Simular que guarde algo en el localStorage
        localStorage.setItem('lastPath', '/dc');
        handleClick();
        expect( historyMock.replace ).toHaveBeenCalledWith('/dc');
    });



    
    
    
})
