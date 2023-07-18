'use strict';

const BUCKET_NAME = process.env.BUCKET_NAME;
const S3 = require("aws-sdk/clients/s3")
const s3 = new S3();

module.exports.getS3presignedURL = async (event) => {


  try {

    // const { key, action} = event.body;
    const key = JSON.parse(event.body).key;
    const action = JSON.parse(event.body).action;
    const signedURLExpireSeconds = 60 * 10;

    const url = await s3.getSignedUrl(action, {
      Bucket: BUCKET_NAME,
      Key: key,
      Expires: signedURLExpireSeconds
    });

    return {
      statusCode: 200,
      body: JSON.stringify(url)
    }

    
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    }
    
  }

};
