const { db } = require("./db");
const PORT = process.env.PORT || 8080;
const app = require("./app");

const init = async () => {
  try {
    await db.sync();
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () =>
      console.log(`Listening at http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

init();
