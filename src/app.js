const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { rateLimitPreHandler } = require("./middleware/rate");
const { requestValidationPreHandler } = require("./middleware/request-validation");
const { responseValidationPostHandler } = require("./middleware/response-validation");
const morgan = require("morgan");
const { COOKIES } = require("./constants/cookies");

// initialize app
const app = express();

// apply middleware
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(requestValidationPreHandler);
app.use(rateLimitPreHandler);

// apply routes
app.get("/", (req, res) => {
   res.json({
      ok: true,
      data: req.metadata,
      token: req.metadata.token,
   });
});

app.get("/delete", (req, res) => {
   res.clearCookie(COOKIES.AUTHENTICATION);
   res.json({
      ok: true,
      cookie: req.cookies[COOKIES.AUTHENTICATION],
      token: req.metadata.token,
   });
});

app.use(responseValidationPostHandler);

module.exports = app;
