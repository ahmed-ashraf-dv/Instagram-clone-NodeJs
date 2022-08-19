const generateToken = (num) => {
  let result = "";

  while (result.length < num) {
    const rndMath = Math.random()
      .toString(36)
      .substring(2, num / 2);

    const rndDate = Math.ceil(Date.now() * Math.random())
      .toString(30)
      .substring(-1, num / 2);

    result += rndMath + rndDate;
  }

  return result.slice(0, num);
};

module.exports = generateToken;
