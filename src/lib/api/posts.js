import client from "./client";
import qs from 'qs';

export const writePost = ({ title, body, tags }) => client.post('/api/posts', { title, body, tags });
export const readPost = id => client.get(`/api/posts/${id}`);
export const listPosts = ({ page, userName, tag }) => {
  const queryString = qs.stringify({
    page,
    userName,
    tag,
  });
  console.log(queryString);
  return client.get(`/api/posts?${queryString}`);
}