'use strict';

const bearer = require('./../../../auth/middleware/bearer-auth');
const { db, users } = require('./../../../models');

const fakeUser = {
  username: 'test2',
  password: 'foo',
  role: 'admin',
};

describe('Testing the auth middleware', () => {
  beforeAll(() => {
    db.sync()
      .then(async () => users.create(fakeUser))
      .then(createdUser => fakeUser.token = createdUser.token)
      .catch(e => console.log(e));
  });

  test('User should be return when a correct token is passed', async () => {
    const req = { headers: { authorization: `Bearer ${fakeUser.token}` } };
    const returnedUser = await bearer(req);
    expect(returnedUser.username).toEqual('test2');
    expect(returnedUser.password).toEqual('foo');
  });
});