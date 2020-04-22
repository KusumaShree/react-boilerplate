import React from 'react';
import authReducer from '../../reducers/auth';

test('should set uid login correctly', () => {
    const action  = {
        type: 'LOGIN',
        uid: 'abc123'
    };
    const state = authReducer({}, action);
    expect(state.uid).toBe(action.uid);
})

test('should set clear logout correctly', () => {
    const action  = {
        type: 'LOGOUT',
        uid: 'abc123'
    };
    const state = authReducer({uid: 'abc123'}, action);
    expect(state.uid).toBeUndefined()
})

test('should set default correctly', () => {
    const state = authReducer({}, {});
    expect(state.uid).toBeUndefined()
})