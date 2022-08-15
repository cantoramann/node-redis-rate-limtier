const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { rateLimitPreHandler } = require("./middleware/rate");
const {
  requestValidationPreHandler,
} = require("./middleware/request-validation");
const {
  responseValidationPostHandler,
} = require("./middleware/response-validation");
const morgan = require("morgan");

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
  res.clearCookie("authentication");
  res.json({
    ok: true,
    cookie: req.cookies["authentication"],
    token: req.metadata.token,
  });
});

app.use(responseValidationPostHandler);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
