import React from 'react';
import Notice from './Notice';

const GuestNotice = () => (
  <Notice
  title={'Browsing as guest'}
  content={
    'You are currently browsing as guest' +
    " so you won't be able to vote for requests, comment, vote for comments, reply or vote for replies"
  }
/>
)

export default GuestNotice;
