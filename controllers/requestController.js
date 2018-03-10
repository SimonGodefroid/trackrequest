// CONTROLLERS
(() => {
  "use strict";
  const Request = require("../models/Request"),
    User = require("../models/User"),
    keys = Object.keys(Request.schema.paths),
    mongoose = require("mongoose"),
    _ = require("lodash");
  module.exports = acl => {
    return {
      list: (req, res) => {
        let query = [];
        let skip = "";
        let limit = "";
        let sort = {};
        let match = {};
        let q = {};
        let matchKeys = req.query
          ? _.without(Object.keys(req.query), "limit", "page", "sort")
          : [];
        if (matchKeys.length > 1) {
          q.$and = [];
          for (let i in matchKeys) {
            match = {};
            if (req["query"][matchKeys[i]] !== "") {
              match[matchKeys[i]] = {};
              match[matchKeys[i]]["$in"] = [];
              let values = req["query"][matchKeys[i]].split(",");
              console.log("values", req["query"][matchKeys[i]]);
              values.map(val => {
                return match[matchKeys[i]]["$in"].push(parseInt(val) || val);
              });
              q.$and.push(match);
            }
          }
        } else if (matchKeys.length === 1) {
          if (req["query"][matchKeys[0]] !== "") {
            q[matchKeys[0]] = {};
            q[matchKeys[0]]["$in"] = [];
            let values = req["query"][matchKeys[0]].split(",");
            values.map(val => {
              return q[matchKeys[0]]["$in"].push(parseInt(val) || val);
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
          (req.query.sort !== "" || Object.keys(req.query.sort).length > 0)
        ) {
          for (let i in Object.keys(req.query.sort)) {
            sort[Object.keys(req.query.sort)[i]] = parseInt(
              _.values(req.query.sort)[i]
            );
          }
          query.push({ $sort: sort });
        }
        query.push(
          { $match: q },
          { $skip: (skip - 1) * limit },
          { $limit: limit }
        );
        Request.aggregate([{ $match: q }], (err, count) => {
          Request.count({}, (err, total) => {
            Request.aggregate(query, (err, requests) => {
              if (err) {
                console.log("An error occurred" + err);
                return res.status(500).json({ success: false, message: err });
              } else {
                res.status(200).json({
                  success: true,
                  limit: limit,
                  total: total,
                  results: count.length,
                  count: requests.length,
                  message: requests
                });
              }
            });
          });
        });
      },
      read: (req, res) => {
        let query = [
          { $match: { _id: mongoose.Types.ObjectId(req.params.id) } }
        ];
        Request.aggregate(query, (err, object) => {
          if (err) {
            console.log("An error occurred" + err);
            return res.status(500).json({ success: false, message: err });
          } else {
            let result = object;
            if (object.length > 0) {
              result = object[0];
            }
            res.status(200).json({
              success: true,
              message: result
            });
          }
        });
      },
      create: (req, res) => {
        const request = new Request(req.body);
        request.save((err, request) => {
          if (err) {
            return res.status(500).json({ success: false, message: err });
          }
          res.status(200).json({
            success: true,
            message: request
          });
        });
      },
      upvote: (req, res) => {
        let value;
        const query = { _id: req.params.userid };
        const options = { new: true };
        User.findById(req.params.userid, (err, user) => {
          if (user === null) {
            return res.status(400).json({ success: false, message: null });
          }
          if (err) {
            console.log("got an error");
            return res.status(500).json({ success: false, message: err });
          }
          if (user.votes[req.params.id]) {
            user.votes[req.params.id] === !user.votes[req.params.id];
          } else {
            user.votes[req.params.id];
          }
          const update = { votes: { [req.params.id]: value } };
          User.findOneAndUpdate(query, update, options, function(err, person) {
            if (err) {
              console.log("got an error");
              return res.status(500).json({ success: false, message: err });
            }
            // Request.findById(req.params.id, (err, request) => {
            //   if (err) {
            //     return res.status(500).json({ success: false, message: err });
            //   } else {
            //     let upvoteUpdate;
            //     console.log("request.upvotes", request.upvotes);
            //     if (value === 0) {
            //       upvoteUpdate = request.upvotes - 1;
            //     }
            //     if (value === 1) {
            //       upvoteUpdate = request.upvotes + 1;
            //     }
            //     Request.findOneAndUpdate(
            //       { _id: req.params.id },
            //       { upvotes: parseInt(upvoteUpdate) },
            //       { new: true },
            //       (err, requestUpdated) => {
            //         if (err) {
            //           return res
            //             .status(500)
            //             .json({ success: false, message: err });
            //         } else {
            //           return res.status(200).json({
            //             success: true,
            //             message: "You upvoted that track"
            //           });
            //         }
            //       }
            //     );
            //   }
            // });
            return res.status(200).json({
              success: true,
              message: "You upvoted that track"
            });
          });
        });
      },
      downvote: (req, res) => {
        let value;
        const query = { _id: req.params.userid };
        const options = { new: true };
        User.findById(req.params.userid, (err, user) => {
          if (user === null) {
            return res.status(400).json({ success: false, message: null });
          }
          if (err) {
            console.log("got an error");
            return res.status(500).json({ success: false, message: err });
          }
          if (user.votes[req.params.id] === -1) {
            value = 0;
          } else {
            value = -1;
          }
          const update = { votes: { [req.params.id]: value } };
          User.findOneAndUpdate(query, update, options, function(err, person) {
            if (err) {
              console.log("got an error");
              return res.status(500).json({ success: false, message: err });
            }
            Request.findById(req.params.id, (err, request) => {
              if (err) {
                return res.status(500).json({ success: false, message: err });
              } else {
                let downvoteUpdate;
                console.log("request.downvotes", request.downvotes);
                if (value === 0) {
                  console.log("on decremente");
                  downvoteUpdate = request.downvotes + 1;
                }
                if (value === 1) {
                  console.log("on incremente");
                  downvoteUpdate = request.downvotes - 1;
                }
                console.log("downvoteUpdate", downvoteUpdate);
                Request.findOneAndUpdate(
                  { _id: req.params.id },
                  { downvotes: parseInt(downvoteUpdate) },
                  { new: true },
                  (err, requestUpdated) => {
                    if (err) {
                      return res
                        .status(500)
                        .json({ success: false, message: err });
                    }
                    return res.status(200).json({
                      success: true,
                      message: "You downvoted that track"
                    });
                  }
                );
              }
            });
          });
        });
      }
    };
  };
})();
