// CONTROLLERS
(() => {
  'use strict';
  const Request = require('../models/Request'),
    Comment = require('../models/Comment'),
    Reply = require('../models/Reply'),
    User = require('../models/User'),
    keys = Object.keys(Request.schema.paths),
    mongoose = require('mongoose'),
    _ = require('lodash');
  module.exports = acl => {
    return {
      list: (req, res) => {
        console.log('list replies');
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
        Reply.aggregate(
          [
            {
              $match: q,
            },
          ],
          (err, count) => {
            Reply.count({}, (err, total) => {
              Reply.aggregate(query, (err, replies) => {
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
                    count: replies.length,
                    message: replies,
                  });
                }
              });
            });
          },
        );
      },
      read: (req, res) => {
        console.log('read reply');
        let query = [
          {
            $match: {
              _id: mongoose.Types.ObjectId(req.params.id),
            },
          },
        ];
        Reply.aggregate(query, (err, object) => {
          if (err) {
            console.log('An error occurred' + err);
            return res.status(500).json({
              success: false,
              message: err,
            });
          } else {
            console.log('object', object);
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
      create: (req, res) => {
        console.log('create reply');
        const reply = new Reply(req.body);
        reply.request = req.params.requestid;
        reply.comment = req.params.commentid;
        reply.author = req.params.userid;
        reply
          .save()
          .then(reply => {
            const query = {
              _id: mongoose.Types.ObjectId(req.params.commentid),
            };
            const update = {
              $push: { replies: mongoose.Types.ObjectId(reply._id) },
            };
            const options = { new: true };
            Comment.findOneAndUpdate(query, update, options)
              .exec()
              .then(reply =>
                res.status(200).json({
                  success: true,
                  message: 'You created a reply',
                }),
              )
              .catch(err => {
                console.log('err', err);
                return res.status(500).json({
                  success: false,
                  message: err,
                });
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
      update: (req, res) => {
        Reply.findOneAndUpdate(
          {
            _id: req.params.id,
          },
          req.body,
          { new: true },
        )
          .exec()
          .then(reply =>
            res.status(200).json({
              success: true,
              message: reply,
            }),
          )
          .catch(err => {
            console.log('err', err);
            return res.status(500).json({
              success: false,
              message: err,
            });
          });
      },
      //needs changes
      delete: (req, res) => {
        console.log('deleting reply');
        Reply.findByIdAndRemove(req.params.id)
          .exec()
          .then(() => {
            return res.status(200).json({
              success: true,
              message: 'You deleted that track request',
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
            // if we find it and it voted for that request already
            if (user.repliesVotes.upvotes[req.params.id]) {
              // we remove the key from his vote collection
              operation = 'unvote';
              _.unset(user, `repliesVotes.upvotes[${req.params.id}]`);
              // if it had already downvoted
            } else if (user.repliesVotes.downvotes[req.params.id]) {
              operation = 'update_vote';
              // we undo the downvote
              _.unset(user, `repliesVotes.downvotes[${req.params.id}]`);
              // and we do the upvote
              user.repliesVotes.upvotes[req.params.id] = true;
              console.log('new user value', user);
            } else if (!user.repliesVotes.upvotes[req.params.id]) {
              operation = 'upvote';
              // if it hadn't voted for the request yet, we add the key and set it to true
              user.repliesVotes.upvotes[req.params.id] = true;
            }
            // then we update the user entry with the new value of 'votes'
            const query = { _id: req.params.userid };
            const update = { repliesVotes: user.repliesVotes };
            const options = { new: true };
            User.findOneAndUpdate(query, update, options)
              .exec()
              .then(user => {
                // if this operation succeeds, we now go to update the requests...
                // we find the request by its id
                Reply.findById(req.params.id)
                  .exec()
                  .then(reply => {
                    console.log('reply', reply);
                    console.log(req.params.id);
                    if (reply.votes.upvotes[req.params.userid]) {
                      // if already upvoted we undo
                      _.unset(reply, `votes.upvotes[${req.params.userid}]`);
                    } else if (reply.votes.downvotes[req.params.userid]) {
                      // if already downvoted we undo the downvote
                      _.unset(reply, `votes.downvotes[${req.params.userid}]`);
                      reply.votes.upvotes[req.params.userid] = true;
                    } else if (!reply.votes.upvotes[req.params.userid]) {
                      // if it wasn't downvoted nor upvoted we downvote
                      reply.votes.upvotes[req.params.userid] = true;
                    }
                    const query = { _id: req.params.id };
                    const update = {
                      votes: reply.votes,
                      upvotes: Object.keys(reply.votes.upvotes).length,
                      downvotes: Object.keys(reply.votes.downvotes).length,
                    };
                    const options = { new: true };
                    Reply.findOneAndUpdate(query, update, options)
                      .exec()
                      .then(reply => {
                        return res.status(200).json({
                          success: true,
                          message: 'You upvoted that reply',
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
        console.log('downvoting');
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
            // if we find it and it downvoted for that request already
            if (user.repliesVotes.downvotes[req.params.id]) {
              // we undo the downvote
              console.log('undo vote');
              operation = 'unvote';
              _.unset(user, `repliesVotes.downvotes[${req.params.id}]`);
              // if the user had upvoted that track
            } else if (user.repliesVotes.upvotes[req.params.id]) {
              console.log('update vote');
              operation = 'update_vote';
              // we undo the upvote
              _.unset(user, `repliesVotes.upvotes[${req.params.id}]`);
              // and we downvote
              user.repliesVotes.downvotes[req.params.id] = true;
              //
            } else if (!user.repliesVotes.downvotes[req.params.id]) {
              operation = 'downvote';
              // if it hadn't voted for the request yet, we add the key and set it to true
              user.repliesVotes.downvotes[req.params.id] = true;
            }
            // then we update the user entry with the new value of 'votes'
            const query = { _id: req.params.userid };
            const update = { repliesVotes: user.repliesVotes };
            const options = { new: true };
            User.findOneAndUpdate(query, update, options)
              .exec()
              .then(user => {
                // if this operation succeeds, we now go to update the requests...
                // we find the request by its id
                Reply.findById(req.params.id)
                  .exec()
                  .then(reply => {
                    console.log('user id is ', req.params.userid);
                    if (reply.votes.downvotes[req.params.userid]) {
                      // if already downvoted we undo
                      _.unset(reply, `votes.downvotes[${req.params.userid}]`);
                    } else if (reply.votes.upvotes[req.params.userid]) {
                      // if already upvoted we undo the upvote
                      _.unset(reply, `votes.upvotes[${req.params.userid}]`);
                      // and we downvote
                      reply.votes.downvotes[req.params.userid] = true;
                    } else if (!reply.votes.downvotes[req.params.userid]) {
                      // if it wasn't downvoted nor upvoted we downvote
                      reply.votes.downvotes[req.params.userid] = true;
                    }
                    const query = { _id: req.params.id };
                    const update = {
                      votes: reply.votes,
                      upvotes: Object.keys(reply.votes.upvotes).length,
                      downvotes: Object.keys(reply.votes.downvotes).length,
                    };
                    const options = { new: true };
                    Reply.findOneAndUpdate(query, update, options)
                      .exec()
                      .then(reply => {
                        return res.status(200).json({
                          success: true,
                          message: 'You downvoted that reply',
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
