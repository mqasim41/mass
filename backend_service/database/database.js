const mongoose = require("mongoose");

const DBConnect = async () => {
  const uri =
    'mongodb+srv://mqasim41:lA983MUT87GJCSEB@mass0.acsrwmt.mongodb.net/?retryWrites=true&w=majority';
  await mongoose.connect(uri);
  console.log("🛢️ [mongodb]: Connected to MongoDB");
};

module.exports = { DBConnect };
