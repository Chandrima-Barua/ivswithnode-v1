import * as AWS from "@aws-sdk/client-medialive";
let creds = {
    accessKeyId: process.env.REACT_APP_AccessKey,
    secretAccessKey: process.env.REACT_APP_SecretKey
};
const medialive = new AWS.MediaLive({region: "us-east-1" , credentials: creds});
console.log(medialive)
export default medialive;