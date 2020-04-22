import React from 'react';
import { shallow } from 'enzyme';
import {LoginPage} from '../../components/LoginPage';

test('should render LoginPage correctly', () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
})

test('should call startLogin out with button call', () => {
    const startLogInSpy = jest.fn();
    const wrapper = shallow(<LoginPage startLogin={startLogInSpy} />);
    wrapper.find('button').simulate('click');
    expect(startLogInSpy).toHaveBeenCalled();
})