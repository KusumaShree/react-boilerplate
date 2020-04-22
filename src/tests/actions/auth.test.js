import { login, logout } from '../../actions/auth';

test('should set login action', () => {
    const action = login("abc123");
    expect(action).toEqual({
        type: 'LOGIN',
        uid: 'abc123'
    })
})

test('should set logout action', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    })
})