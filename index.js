const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/command/:codeno", (req, res) => {
  const { codeno } = req.params;
  console.log(codeno);

  if (codeno == "walk") {
    res.json(
      {'codeno': '걷는다.'}
    );
  } else if (codeno == "talk") {
    res.send(
      {'codeno': '말한다.'}
    );
  } else if (codeno == "feed") {
    res.send(
      {'codeno': '사료를 준다.'}
    );
  } else if (codeno == "video") {
    res.send(
      {'codeno': '비디오를 플레이한다..'}
    );
  } else {
    res.send(
      {'codeno': '알수없는 명령입니다.'}
    );
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});