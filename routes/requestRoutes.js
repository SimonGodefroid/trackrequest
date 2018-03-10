const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
module.exports = app => {
  const Ctrl = require("../controllers/requestController")();
  app.get("/api/requests/", Ctrl.list);
  app.get("/api/requests/:id([a-fA-F\\d]{24})", Ctrl.read);
  app.post("/api/requests", requireLogin, Ctrl.create);
  app.post(
    "/api/:userid([a-fA-F\\d]{24})/requests/:id([a-fA-F\\d]{24})/upvote",
    Ctrl.upvote
  );
  app.post(
    "/api/:userid([a-fA-F\\d]{24})/requests/:id([a-fA-F\\d]{24})/downvote",
    Ctrl.downvote
  );
  // app.get('/api/surveys/:surveyId/:choice', (req, res) => {
  // 	res.send('Thanks for voting !');
  // });
  // app.post('/api/surveys/webhooks', (req, res) => {
  // 	const p = new Path('/api/surveys/:surveyId/:choice');

  // 	_.chain(req.body)
  // 		.map(({ email, url }) => {
  // 			const match = p.test(new URL(url).pathname);
  // 			if (match) {
  // 				return { email, surveyId: match.surveyId, choice: match.choice };
  // 			}
  // 		})
  // 		.compact()
  // 		.uniqBy('email', 'surveyId')
  // 		.each(({ surveyId, email, choice }) => {
  // 			Survey.updateOne(
  // 				{
  // 					_id: surveyId,
  // 					recipients: {
  // 						$elemMatch: { email: email, responded: false }
  // 					}
  // 				},
  // 				{
  // 					$inc: { [choice]: 1 },
  // 					$set: { 'recipients.$.responded': true },
  // 					lastResponded: new Date()
  // 				}
  // 			).exec();
  // 		})
  // 		.value();
  // 	res.send({});
  // });
  // app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
  // 	const { title, subject, body, recipients } = req.body;

  // 	const survey = new Survey({
  // 		title,
  // 		subject,
  // 		body,
  // 		recipients: recipients.split(',').map(email => ({ email: email.trim() })),
  // 		_user: req.user.id,
  // 		dateSent: Date.now()
  // 	});
  // 	// Great place to send an email !
  // 	const mailer = new Mailer(survey, surveyTemplate(survey));
  // 	try {
  // 		await mailer.send();
  // 		await survey.save();
  // 		req.user.credits -= 1;
  // 		const user = await req.user.save();
  // 		res.send(user);
  // 	} catch (err) {
  // 		res.status(422).send(err);
  // 	}
  // });
};
