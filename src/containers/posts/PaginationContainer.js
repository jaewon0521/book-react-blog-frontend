import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/posts/Pagination';

const PaginationContainer = () => {
  const { userName } = useParams();
  const [searchParams] = useSearchParams();

  const tag = searchParams.get('tag')
  const page = parseInt(searchParams.get('page'), 10) || 1;

  const { lastPage, posts, loading } = useSelector(({ posts, loading }) => ({
    lastPage: posts.lastPage,
    posts: posts.posts,
    loading: loading['posts/LIST_POSTS'],
  }));

  if (!posts || loading) return null;

  return (
    <Pagination
      tag={tag}
      userName={userName}
      page={parseInt(page, 10)}
      lastPage={lastPage}
    />
  );
};

export default PaginationContainer;