import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

test('should render Header correctly', () => {
    const startLogoutSpy = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogoutSpy}/>);
    expect(wrapper).toMatchSnapshot();
})

test('should call startlog out with button call', () => {
    const startLogoutSpy = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogoutSpy} />);
    wrapper.find('button').simulate('click');
    expect(startLogoutSpy).toHaveBeenCalled();
})