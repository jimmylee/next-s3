import * as Environment from "~/node_common/environment";
import * as AWS from "aws-sdk";

import B from "busboy";

const Bucket = new AWS.S3({
  accessKeyId: Environment.IAM_USER_KEY,
  secretAccessKey: Environment.IAM_USER_SECRET,
});

const HIGH_WATER_MARK = 1024 * 1024 * 3;

const uploadToAmazonS3 = (params) =>
  new Promise((resolve, reject) => {
    Bucket.upload(params, function(err, data) {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });

export const formMultipart = async (req, res) => {
  let data = null;

  const upload = () =>
    new Promise(async (resolve, reject) => {
      let form = new B({
        headers: req.headers,
        highWaterMark: HIGH_WATER_MARK,
      });

      form.on("file", async function(fieldname, stream, filename, encoding, mime) {
        const params = {
          Bucket: Environment.BUCKET_NAME,
          Key: "test" + "-" + filename,
          Body: stream,
        };

        try {
          console.log("[upload] stream");
          data = await uploadToAmazonS3(params);
          console.log("[upload] finished");
        } catch (e) {
          return reject({
            decorator: "ERROR",
            error: true,
            message: e.message,
          });
        }

        return resolve({
          decorator: "SUCCESS",
          data,
        });
      });

      form.on("error", (e) => {
        return reject({
          decorator: "ERROR",
          error: true,
          message: e.message,
        });
      });

      req.pipe(form);
    });

  const response = await upload();

  if (response && response.error) {
    return response;
  }

  return { decorator: "SERVER_UPLOAD_SUCCESS", data: response.data };
};
