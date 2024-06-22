const fs = require("fs");

module.exports = async (req, res) => {
  //  Url'in yol kısmını al.
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/"));

  // Url'i parçalara ayır ve id parametresini al.
  const id = req.url.split("/")[3];

  if (req.url === "/api/movies") {
    //1) Durum kodunu belirle.
    res.status = 200;

    //2) Headerları belirle.
    res.setHeader("Content-Type", "application/json");

    //3) Json dosyasından film verilerini al.
    const movies = fs.readFileSync("./data/movies.json", "utf-8");

    //4) Cevabı gönder.
    res.end(movies);
  } else if (baseUrl === "/api/movies" && id) {
    // Bütün filmleri al.
    let data = fs.readFileSync("./data/movies.json", "utf-8");

    // Json fomatındaki veriyi js formatına çevir.
    data = JSON.parse(data);

    // Filmlerin arsasından id'sini bildiğimiz filmi seç.
    const movie = data.movies.find((item) => item.id == id);

    if (movie) {
      // Eğerki film bulunduysa filmi gönder.
      // Cevap ayarlarını belirle.
      res.writeHead(200, { "Content-Type": "application/json" });

      // Cevabı gönder.
      res.end(JSON.stringify(movie));
    } else {
      // Film bulunamadıysa.
      res.writeHead(404, {
        "Content-Type": "application/json",
      });

      // Cevabı gönder.
      res.end(
        JSON.stringify({
          message: "Gönderidiğiniz id ile eşleşen film bulunamadı",
        })
      );
    }
  } else {
    // doğru url'ye istek atmadıysa hata gönder
    res.writeHead(404, { "Content-Type": "application/json" });

    res.end(
      JSON.stringify({
        title: "Bulunamadı",
        message: "İstek attığınız yol geçersiz",
      })
    );
  }
};
