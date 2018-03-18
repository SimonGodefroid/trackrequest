// CONTROLLERS
(() => {
  'use strict';
  const Comment = require('../models/Comment'),
    Request = require('../models/Request'),
    User = require('../models/User'),
    Reply = require('../models/Reply'),
    keys = Object.keys(Comment.schema.paths),
    mongoose = require('mongoose'),
    _ = require('lodash');
  module.exports = acl => {
    return {
      list: (req, res) => {
        console.log('comments list');
        let query = [];
        let skip = '';
        let limit = '';
        let sort = {};
        let match = {};
        let q = {};
        let matchKeys = req.query
          ? _.without(Object.keys(req.query), 'limit', 'page', 'sort')
          : [];
        if (matchKeys.length > 1) {
          q.$and = [];
          for (let i in matchKeys) {
            match = {};
            if (req['query'][matchKeys[i]] !== '') {
              match[matchKeys[i]] = {};
              match[matchKeys[i]]['$in'] = [];
              let values = req['query'][matchKeys[i]].split(',');
              console.log('values', req['query'][matchKeys[i]]);
              values.map(val => {
                return match[matchKeys[i]]['$in'].push(parseInt(val) || val);
              });
              q.$and.push(match);
            }
          }
        } else if (matchKeys.length === 1) {
          if (req['query'][matchKeys[0]] !== '') {
            q[matchKeys[0]] = {};
            q[matchKeys[0]]['$in'] = [];
            let values = req['query'][matchKeys[0]].split(',');
            values.map(val => {
              return q[matchKeys[0]]['$in'].push(parseInt(val) || val);
            });
          }
        }
        !req.query.page || isNaN(req.query.page)
          ? (skip = 1)
          : (skip = parseInt(req.query.page));
        !req.query.limit || isNaN(req.query.limit)
          ? (limit = 100)
          : (limit = parseInt(req.query.limit));

        if (
          req.query.sort &&
          (req.query.sort !== '' || Object.keys(req.query.sort).length > 0)
        ) {
          for (let i in Object.keys(req.query.sort)) {
            sort[Object.keys(req.query.sort)[i]] = parseInt(
              _.values(req.query.sort)[i],
            );
          }
          query.push({
            $sort: sort,
          });
        }
        query.push(
          {
            $match: q,
          },
          {
            $skip: (skip - 1) * limit,
          },
          {
            $limit: limit,
          },
        );
        Comment.aggregate(
          [
            {
              $match: q,
            },
          ],
          (err, count) => {
            Comment.count({}, (err, total) => {
              Comment.aggregate(query, (err, comments) => {
                if (err) {
                  console.log('An error occurred' + err);
                  return res.status(500).json({
                    success: false,
                    message: err,
                  });
                } else {
                  res.status(200).json({
                    success: true,
                    limit: limit,
                    total: total,
                    results: count.length,
                    count: comments.length,
                    message: comments,
                  });
                }
              });
            });
          },
        );
      },
      listByRequest: (req, res) => {
        console.log('comments listByRequest');
        let query = [
          {
            $match: {
              request: mongoose.Types.ObjectId(req.params.requestid),
            },
          },
        ];
        Comment.aggregate(query)
          .exec()
          .then(comments => {
            return res.status(200).json({
              success: true,
              count: comments.length,
              message: comments,
            });
          })
          .catch(err => {
            console.log('An error occurred', err);
            return res.status(500).json({
              success: false,
              message: err,
            });
          });
      },
      listByAuthor: (req, res) => {
        console.log('comments list by author');
        let query = [
          {
            $match: {
              author: mongoose.Types.ObjectId(req.params.userid),
            },
          },
        ];
        Comment.aggregate(query)
          .exec()
          .then(comments => {
            return res.status(200).json({
              success: true,
              message: comments,
            });
          })
          .catch(err => {
            console.log('An error occurred', err);
            return res.status(500).json({
              success: false,
              message: err,
            });
          });
      },
      create: (req, res) => {
        console.log('create comment');
        const comment = new Comment(req.body);
        comment.request = req.params.requestid;
        comment.author = req.params.userid;
        comment.save((err, comment) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: err,
            });
          }
          res.status(200).json({
            success: true,
            message: comment,
          });
        });
      },
      read: (req, res) => {
        console.log('read comment');
        let query = [
          {
            $match: {
              _id: mongoose.Types.ObjectId(req.params.id),
            },
          },
        ];
        Comment.aggregate(query, (err, object) => {
          if (err) {
            console.log('An error occurred' + err);
            return res.status(500).json({
              success: false,
              message: err,
            });
          } else {
            let result = object;
            if (object.length > 0) {
              result = object[0];
            }
            res.status(200).json({
              success: true,
              message: result,
            });
          }
        });
      },
      update: (req, res) => {
        console.log('update comment');
        Comment.findOneAndUpdate(
          {
            _id: req.params.id,
          },
          req.body,
          { new: true },
        )
          .exec()
          .then(request => {
            return res.status(200).json({
              success: true,
              message: request,
            });
          })
          .catch(err => {
            console.log('err', err);
            return res.status(500).json({
              success: false,
              message: err,
            });
          });
      },
      delete: (req, res) => {
        console.log('delete comment');
        Comment.findByIdAndRemove(req.params.id)
          .exec()
          .then(() => {
            Reply.deleteMany({ comment: req.params.id })
              .exec()
              .then(request => {
                return res.status(200).json({
                  success: true,
                  message: 'You deleted that comment',
                });
              });
          })
          .catch(err => {
            console.log('An error occurred', err);
            return res.status(500).json({
              success: false,
              message: err,
            });
          });
      },
      upvote: (req, res) => {
        console.log('upvote comment');
        // we find the user by its id
        let operation;
        User.findById(req.params.userid)
          .exec()
          .then(user => {
            // if not found, we return an error
            if (user === null) {
              return res.status(400).json({
                success: false,
                message: 'User not found',
              });
            }
            // if we find it and it voted for that comment already
            if (user.votes.upvotes[req.params.id]) {
              // we remove the key from his vote collection
              operation = 'unvote';
              _.unset(user, `commentsVotes.upvotes[${req.params.id}]`);
              // if it had already downvoted
            } else if (user.commentsVotes.downvotes[req.params.id]) {
              operation = 'update_vote';
              // we undo the downvote
              _.unset(user, `commentsVotes.downvotes[${req.params.id}]`);
              // and we do the upvote
              user.commentsVotes.upvotes[req.params.id] = true;
              console.log('new user value', user);
            } else if (!user.commentsVotes.upvotes[req.params.id]) {
              operation = 'upvote';
              // if it hadn't voted for the comment yet, we add the key and set it to true
              user.commentsVotes.upvotes[req.params.id] = true;
            }
            // then we update the user entry with the new value of 'votes'

            const query = { _id: req.params.userid };
            const update = { commentsVotes: user.commentsVotes };
            const options = { new: true };
            User.findOneAndUpdate(query, update, options)
              .exec()
              .then(user => {
                // if this operation succeeds, we now go to update the comments...
                // we find the comment by its id
                Comment.findById(req.params.id)
                  .exec()
                  .then(comment => {
                    if (comment.votes.upvotes[req.params.userid]) {
                      // if already upvoted we undo
                      _.unset(comment, `votes.upvotes[${req.params.userid}]`);
                    } else if (comment.votes.downvotes[req.params.userid]) {
                      // if already downvoted we undo the downvote
                      _.unset(comment, `votes.downvotes[${req.params.userid}]`);
                      comment.votes.upvotes[req.params.userid] = true;
                    } else if (!comment.votes.upvotes[req.params.userid]) {
                      // if it wasn't downvoted nor upvoted we downvote
                      comment.votes.upvotes[req.params.userid] = true;
                    }
                    const query = { _id: req.params.id };
                    const update = {
                      votes: comment.votes,
                      upvotes: Object.keys(comment.votes.upvotes).length,
                      downvotes: Object.keys(comment.votes.downvotes).length,
                    };
                    const options = { new: true };
                    Comment.findOneAndUpdate(query, update, options)
                      .exec()
                      .then(comment => {
                        return res.status(200).json({
                          success: true,
                          message: 'You upvoted that track',
                        });
                      })
                      .catch(err => {
                        console.log('An error occurred', err);
                        return res.status(500).json({
                          success: false,
                          message: err,
                        });
                      });
                  })
                  .catch(err => {
                    console.log('err', err);
                    return res
                      .status(500)
                      .json({ success: false, message: err });
                  });
              })
              .catch(err => {
                console.log('err', err);
                return res.status(500).json({ success: false, message: err });
              });
          })
          .catch(err => {
            console.log('err', err);
            return res.status(500).json({ success: false, message: err });
          });
      },
      downvote: (req, res) => {
        console.log('downvote comment');
        // we find the user by its id
        let operation;
        User.findById(req.params.userid)
          .exec()
          .then(user => {
            console.log('user',user.commentsVotes[req.params.id])
            // if not found, we return an error
            if (user === null) {
              return res.status(400).json({
                success: false,
                message: 'User not found',
              });
            }
            // if we find it and it downvoted for that comment already
            if (user.commentsVotes.downvotes[req.params.id]) {
              // we undo the downvote
              console.log('undo vote');
              operation = 'unvote';
              _.unset(user, `commentsVotes.downvotes[${req.params.id}]`);
              // if the user had upvoted that track
            } else if (user.commentsVotes.upvotes[req.params.id]) {
              operation = 'update_vote';
              // we undo the upvote
              _.unset(user, `commentsVotes.upvotes[${req.params.id}]`);
              // and we downvote
              user.commentsVotes.downvotes[req.params.id] = true;
              //
            } else if (!user.commentsVotes.downvotes[req.params.id]) {
              operation = 'downvote';
              // if it hadn't voted for the comment yet, we add the key and set it to true
              user.commentsVotes.downvotes[req.params.id] = true;
            }
            // then we update the user entry with the new value of 'votes'
            console.log('user for update',user)
            const query = { _id: req.params.userid };
            const update = { commentsVotes: user.commentsVotes };
            const options = { new: true };
            User.findOneAndUpdate(query, update, options)
              .exec()
              .then(user => {
                // if this operation succeeds, we now go to update the comments...
                // we find the comment by its id
                Comment.findById(req.params.id)
                  .exec()
                  .then(comment => {
                    if (comment.votes.downvotes[req.params.userid]) {
                      // if already downvoted we undo
                      _.unset(comment, `votes.downvotes[${req.params.userid}]`);
                    } else if (comment.votes.upvotes[req.params.userid]) {
                      // if already upvoted we undo the upvote
                      _.unset(comment, `votes.upvotes[${req.params.userid}]`);
                      // and we downvote
                      comment.votes.downvotes[req.params.userid] = true;
                    } else if (!comment.votes.downvotes[req.params.userid]) {
                      // if it wasn't downvoted nor upvoted we downvote
                      comment.votes.downvotes[req.params.userid] = true;
                    }
                    console.log(
                      'uppies',
                      Object.keys(comment.votes.upvotes).length,
                    );
                    console.log(
                      'downsies',
                      Object.keys(comment.votes.downvotes).length,
                    );
                    const query = { _id: req.params.id };
                    const update = {
                      votes: comment.votes,
                      upvotes: Object.keys(comment.votes.upvotes).length,
                      downvotes: Object.keys(comment.votes.downvotes).length,
                    };
                    const options = { new: true };
                    Comment.findOneAndUpdate(query, update, options)
                      .exec()
                      .then(comment => {
                        return res.status(200).json({
                          success: true,
                          message: 'You downvoted that comment',
                        });
                      })
                      .catch(err => {
                        console.log('An error occurred', err);
                        return res.status(500).json({
                          success: false,
                          message: err,
                        });
                      });
                  })
                  .catch(err => {
                    console.log('err', err);
                    return res
                      .status(500)
                      .json({ success: false, message: err });
                  });
              })
              .catch(err => {
                console.log('err', err);
                return res.status(500).json({ success: false, message: err });
              });
          })
          .catch(err => {
            console.log('err', err);
            return res.status(500).json({ success: false, message: err });
          });
      },
    };
  };
})();
