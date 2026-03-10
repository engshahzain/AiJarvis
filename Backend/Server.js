require("dotenv").config();

const App = require("./src/App");
const Db = require("./src/config/DB");
const Port = process.env.PORT;
Db();
App.listen(Port, () => {
  console.log(`server running on http://localhost:${Port}`);
});
