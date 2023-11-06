import { CognitoUserPool } from "amazon-cognito-identify-js";

const poolData = {
  UserPoolId: "us-east-1_6yW8uFaIM",
  ClientId: "3ctcc7m5jerrasjmbec0p0haqk",
};

export default new CognitoUserPool(poolData);
