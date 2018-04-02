import React from 'react';
const Reply = reply => {
  if(reply.reply_author){
    return <p key={reply._id}>{`${reply.reply_author.username}: ${reply.content}`}</p>;
  }
  return null;
}

export default Reply;
