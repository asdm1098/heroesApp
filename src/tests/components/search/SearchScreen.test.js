import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';


describe('Pruebas en el componente <SearchScreen />', () => {


    test('debe de mostrarse correctamente con valores por defecto ', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );

        expect( wrapper ).toMatchSnapshot();
        //el alert debe tener este texto al tener por defecto los valores del url de search
        expect( wrapper.find('.alert-info').text().trim() ).toBe('Search a hero');
    });
    
    //Simular que estoy en una ruta y asegurarme que la caja de texto tenga el valor
    test('debe de mostar a Batman y el input con el valor del queryString', () => {
    
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );

        expect( wrapper.find('input').prop('value') ).toBe('batman');

        expect( wrapper ).toMatchSnapshot();
    });

    test('debe de mostrar un error si no se encuentra el Hero ', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );

        expect( wrapper.find('.alert-danger').text().trim() ).toBe('There is no a hero with batman123');
        expect( wrapper ).toMatchSnapshot();

    });

    test('debe de llamar el push del history', () => {
        
        const history = {
            push: jest.fn()
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route 
                    path="/search" 
                    component={ () => <SearchScreen history={history} />} 
                />
            </MemoryRouter>
        );

        //simulando acciones cambio de caja de texto
        wrapper.find('input').simulate('change', { 
            target: {
                name: 'searchText',
                value: 'batman'
            }
        });

        //simular el submit del formulario
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

        expect(history.push).toHaveBeenCalledWith(`?q=batman`);

    });
    
    
    
    
})
