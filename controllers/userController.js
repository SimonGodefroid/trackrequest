// CONTROLLERS
(() => {
  'use strict';
  const Request = require('../models/Request'),
    Comment = require('../models/Comment'),
    User = require('../models/User'),
    keys = Object.keys(Request.schema.paths),
    mongoose = require('mongoose'),
    _ = require('lodash');
  module.exports = acl => {
    return {
      list: (req, res) => {
        console.log('list requests');
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
        User.aggregate(
          [
            {
              $match: q,
            },
          ],
          (err, count) => {
            User.count({}, (err, total) => {
              User.aggregate(query, (err, requests) => {
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
                    count: requests.length,
                    message: requests,
                  });
                }
              });
            });
          },
        );
      },
      read: (req, res) => {
        console.log('read request');
        let query = [
          {
            $match: {
              _id: mongoose.Types.ObjectId(req.params.id),
            },
          },
        ];
        User.aggregate(query, (err, object) => {
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
    };
  };
})();
