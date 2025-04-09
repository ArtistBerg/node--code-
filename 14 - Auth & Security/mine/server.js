const fs = require("fs");
const path = require("path");
const https = require("https");
const helmet = require("helmet");
const express = require("express");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const session = require("express-session");
const { configDotenv } = require("dotenv");

require("dotenv").config();

const PORT = 3000;

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.CLIENT_KEY_1,
  COOKIE_KEY_2: process.env.CLIENT_KEY_2,
};
const AUTH_OPTIONS = {
  callbackURL: "/auth/google/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log("Google Profile", profile);
  done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// Save the session to COOKIE
passport.serializeUser((user, done) => {
  done(null, user);
});
// Read the session from COOKIE
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// express instance & helmet
const app = express();
app.use(helmet());

// cookies & passport initialisation
app.use(
  session({
    secret: config.COOKIE_KEY_1 || "some-default-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

function checkLoggedIn(req, res, next) {
  console.log(`USER: `, req.user);
  const isLoggedIn = req.isAuthenticated() && req.user;
  if (!isLoggedIn) {
    return res.status(401).json({
      message: "You must log in now!",
    });
  }

  next();
}
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: true, // was false because of API key
  })
  /*
  (req, res) => {
     console.log("Google Called us back");
     // this fn wouldn't be called bcz failureRedirect & sucessRedirect are already there
  } */
);

app.get("/auth/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  });
});

app.get("/secret", checkLoggedIn, (req, res) => {
  return res.status(200).json({
    message: "Your personal secret value is 42!",
    user: req.user["id"],
  });
});

app.get("/failure", (req, res) => {
  return res.send("Failed to Log in!");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/current-user", (req, res) => {
  res.send(req.user ? req.user : "No user logged in");
});

// app.get("/logout-success", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "logout-success.html"));
// });

const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
