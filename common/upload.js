export const upload = async ({ file, context }) => {
  let formData = new FormData();

  formData.append("data", file);

  const _privateUploadMethod = (path, file) =>
    new Promise((resolve, reject) => {
      const XHR = new XMLHttpRequest();
      XHR.open("post", path, true);
      XHR.onerror = (event) => {
        console.log(event);
      };

      // NOTE(jim): UPLOADS ONLY.
      XHR.upload.addEventListener(
        "progress",
        (event) => {
          if (!context) {
            return;
          }

          if (event.lengthComputable) {
            console.log("FILE UPLOAD PROGRESS", event);
            context.setState({
              fileLoading: {
                ...context.state.fileLoading,
                [`${file.lastModified}-${file.name}`]: {
                  name: file.name,
                  loaded: event.loaded,
                  total: event.total,
                },
              },
            });
          }
        },
        false
      );

      XHR.onloadend = (event) => {
        console.log("FILE UPLOAD END", event);
        try {
          return resolve(JSON.parse(event.target.response));
        } catch (e) {
          return resolve({
            error: "SERVER_UPLOAD_ERROR",
          });
        }
      };
      XHR.send(formData);
    });

  let json = await _privateUploadMethod(`/api/data/${file.name}`, file);

  if (!json || json.error || !json.data) {
    if (context) {
      context.setState({
        fileLoading: {
          ...context.state.fileLoading,
          [`${file.lastModified}-${file.name}`]: {
            name: file.name,
            failed: true,
          },
        },
      });
    }

    return !json ? { error: "NO_RESPONSE" } : json;
  }

  return { file, json };
};
