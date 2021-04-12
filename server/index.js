const { db } = require("./db");
const app = require("./api");
const PORT = 3000;

db.sync() // if you update your db schemas, make sure you drop the tables first and then recreate them
  .then(() => {
    console.log("db synced");
    app.listen(PORT, () =>
      console.log(`Express server listening at http://localhost:${PORT}`)
    );
  });
