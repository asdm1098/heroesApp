import React from 'react';
import { mount } from 'enzyme';
import { PrivateRoute } from '../../routes/PrivateRoute';
import { MemoryRouter } from 'react-router-dom';


describe('Pruebas <PrivateRoute />', () => {

    const props = {
        location: {
            pathname: '/marvel'
        }
    }

    Storage.prototype.setItem = jest.fn(); 

    test('debe de mostrar el componente si está autenticado y guardar localstorage', () => {

        //renderizar el componente
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute 
                    isAutenticated={ true }
                    component = { () => <span>Listo!</span>}
                    {...props}
                />
            </MemoryRouter>
        );
        
        //console.log("=======" + wrapper.html() + "======"); autneticated en false
        expect( wrapper.find('span').exists() ).toBe(true);
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel' );
    });

    test('debe de bloquear el componente si no esta autenticado', () => {
        
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute 
                    isAutenticated={ false }
                    component = { () => <span>Listo!</span>}
                    {...props}
                />
            </MemoryRouter>
        );
        
        //console.log("=======" + wrapper.html() + "======"); autneticated en false
        expect( wrapper.find('span').exists() ).toBe(false);
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel' );

    });
    
    
    
})
