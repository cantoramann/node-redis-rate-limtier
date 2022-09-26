const { CONFIG_DEV } = require("./dev");

let CONFIG;
if (process.env.NODE_ENV == "dev") {
   CONFIG = CONFIG_DEV;
} else {
   // for now
   CONFIG = CONFIG_DEV;
}

exports.CONFIG = CONFIG;
