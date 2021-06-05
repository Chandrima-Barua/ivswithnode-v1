var AWS = require("@aws-sdk/client-ivs");
let creds = {
    accessKeyId: process.env.REACT_APP_AccessKey,
    secretAccessKey: process.env.REACT_APP_SecretKey
};
const config = new AWS.Ivs({
    apiVersion: "2020-07-14",
    region: 'us-east-1',
    credentials: creds
});
export default config;