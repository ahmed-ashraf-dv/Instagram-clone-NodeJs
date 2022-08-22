const imgFilter = (base64Data) => {
  let response = { isValid: true, msg: "" };

  const filetypes = /jpeg|jpg|png|webp/;
  const maxFileSize = 1; //MB
  const type = base64Data.split(";")[0].split("/")[1];
  const buffer = Buffer.from(base64Data.substring(base64Data.indexOf(",") + 1));
  const MB = buffer.length / 1e6;

  // check is file is img
  if (!filetypes.test(type)) {
    response = { isValid: false, msg: "imgs only !" };

    return response;
  }

  // check img size < 2MB
  if (MB > maxFileSize) {
    response = { isValid: false, msg: "img too large" };

    return response;
  }

  return response;
};

module.exports = imgFilter;
