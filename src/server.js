const app = require("./app");
const { CONFIG } = require("./config");

app.listen(CONFIG.APP.PORT, () => {
   console.log(`Server is running on port ${CONFIG.APP.PORT}`);
});
