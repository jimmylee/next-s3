import * as Upload from "~/node_common/upload";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const response = await Upload.formMultipart(req, res);

  if (!response) {
    return res.status(404).send({ decorator: "SERVER_UPLOAD_ERROR", error: true });
  }

  if (response.error) {
    return res.status(500).send({ decorator: response.decorator, error: response.error });
  }

  return res.status(200).send({
    decorator: "SERVER_UPLOAD",
    data: response.data,
  });
};
