import B from "busboy";

const HIGH_WATER_MARK = 1024 * 1024 * 3;

export const formMultipart = async (req, res) => {
  let data = null;

  const upload = () =>
    new Promise(async (resolve, reject) => {
      let form = new B({
        headers: req.headers,
        highWaterMark: HIGH_WATER_MARK,
      });

      form.on("file", async function(fieldname, stream, filename, encoding, mime) {
        let push;
        try {
          console.log("[upload] stream");
        } catch (e) {
          return reject({
            decorator: "ERROR",
            error: true,
            message: e.message,
          });
        }

        return resolve({
          decorator: "SUCCESS",
          data: "",
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
