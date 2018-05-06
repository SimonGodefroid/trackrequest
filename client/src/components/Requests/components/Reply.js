import React from 'react';
import CustomizedChip from './CustomizedChip';
const Reply = (reply) => {
	if (reply.reply_author) {
		return (
      <div>
				<span key={reply._id}>{`${reply.reply_author.username}: ${reply.content}`}</span>
			</div>
		);
	}
	return null;
};

export default Reply;
