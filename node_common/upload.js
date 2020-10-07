import * as Environment from "~/node_common/environment";
import * as AWS from "aws-sdk";

import B from "busboy";

// NOTE(jim): Timeout must be set
const Bucket = new AWS.S3({
  accessKeyId: Environment.IAM_USER_KEY,
  secretAccessKey: Environment.IAM_USER_SECRET,
  httpOptions: { timeout: 15 * 60 * 1000, connectTimeout: 15 * 60 * 1000 },
});

const AMAZON_MINIMUM_PART_SIZE = 1024 * 1024 * 20;

export const formMultipart = async (req, res) => {
  let data = null;

  const upload = () =>
    new Promise(async (resolve, reject) => {
      let form = new B({
        headers: req.headers,
        highWaterMark: AMAZON_MINIMUM_PART_SIZE,
      });

      form.on("file", async function(fieldname, stream, filename, encoding, mime) {
        const params = {
          Bucket: Environment.BUCKET_NAME,
          Key: "test" + "-" + filename,
          Body: stream,
        };

        try {
          console.log("[upload] stream");
          data = await Bucket.upload(params, { partSize: AMAZON_MINIMUM_PART_SIZE, queueSize: 4 })
            .on("httpUploadProgress", (progress) => {
              console.log("[ progress ]", progress.loaded);
            })
            .promise();
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
