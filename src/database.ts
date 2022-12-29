import mongoose from "mongoose";
class Database {
  constructor() {
    this.connect();
  }

  connect() {
    console.log(process.env.dbUri);

    mongoose
      .connect(process.env.dbUri!)
      .then(() => {
        console.log("database connection successful");
      })
      .catch((err) => {
        console.log("database connection error " + err);
      });
  }
}

export default Database;
