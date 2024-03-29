import React from 'react';
import { mount } from 'enzyme';
import { AppRouter } from '../../routes/AppRouter';
import { AuthContext } from '../../auth/AuthContext';

describe('Pruebas en <AppRouter />', () => {
    //simulación de obj para el contexto
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false,
        }
    }
    

    test('debe mostrar el login si no está autenticado ', () => {

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();

    });

    test('debe de mostrar el componente mavel si está autenticado', () => {
        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: 'Stive'
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect( wrapper.find('.navbar').exists() ).toBe(true);

       // console.log(wrapper.html());
    })
    
    
})
