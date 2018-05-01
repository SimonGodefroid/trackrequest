const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const cors = require('cors');

require('./models/User');
require('./models/Request');
require('./models/Comment');
require('./models/Reply');
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true });

const app = express();

// express middlewares
// they do pre-process operations
app.use(bodyParser.json());
app.use(cors());
app.use(
  // sets the life expentancy of cookies
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
    keys: [keys.cookieKey],
  }),
);
// tells passport to initialize for config
app.use(passport.initialize());
// tells passport to use session
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/requestRoutes')(app);
require('./routes/commentRoutes')(app);
require('./routes/replyRoutes')(app);
// require("./routes/billingRoutes")(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file !
  //
  app.use(express.static('client/build'));
  // Express will serve up the index.html file if
  // it doesn't recognize the route
  const path = require('path');
  // catch all case
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
