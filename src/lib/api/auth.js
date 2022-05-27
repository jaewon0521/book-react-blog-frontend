import client from "./client";

export const login = ({ userName, password }) =>
  client.post('/api/auth/login', { userName, password });

export const register = ({ userName, password }) =>
  client.post('/api/auth/register', { userName, password });

export const check = () => client.get('/api/auth/check');

export const logout = () => client.post('/api/auth/logout');