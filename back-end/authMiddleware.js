// authMiddleware.js
const AWS = require("aws-sdk");
const { findUserIdByEmail } = require("./queries/userQueries"); // Make sure to implement this function

AWS.config.update({
  region: "us-east-1",
});

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();


const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const getUserParams = {
      AccessToken: token,
    };
    const userData = await cognitoIdentityServiceProvider
      .getUser(getUserParams)
      .promise();
    console.log(userData);
    // Extract the email claim from the token
    const email = userData.UserAttributes.find(
      (attr) => attr.Name === "email"
    ).Value;

    // Lookup the user ID in your database by email
    const userId = await findUserIdByEmail(email);
    if (!userId) {
      return res.status(404).json({ message: "User not found in database." });
    }

    // Store the user's information in the request object
    req.user = {
      email,
      userId,
    };

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Unauthorized: " + err.message });
  }
};

module.exports = authenticate;
