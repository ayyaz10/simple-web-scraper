const PORT = 3333;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();
const url =
  "https://www.amazon.com/s?i=specialty-aps&bbn=16225007011&rh=n%3A16225007011%2Cn%3A172456&ref=nav_em__nav_desktop_sa_intl_computer_accessories_and_peripherals_0_2_6_2#nav-top";

axios(url)
  .then((res) => {
    const html = res.data;
    // console.log(html);
    const $ = cheerio.load(html);
    const articles = [];
    $(".s-line-clamp-4", html).each(function () {
      const title = $(this).text();
      const url = $(this).find("a").attr("href");
      articles.push({
        title,
        url,
      });
    });
    console.log(articles);
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Servr is running on PORT ${PORT}`);
});
