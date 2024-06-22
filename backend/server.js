const http = require("http");
const getRequest = require("./methods/get-request");
const postRequest = require("./methods/post-request");
const deleteRequest = require("./methods/delete-request");

// 1) Http server oluştur.
const server = http.createServer((req, res) => {
  // Bütün isteklerde gönderilecek header ekle.
  // Frontend'in erişimine engel olmaz. cors hatasını önler
  res.setHeader("Access-Control-Allow-Origin", "*");

  switch (req.method) {
    // Frontend'den bir post/delete/patch isteği atıldığı zaman
    // tarayıcı öncelikle server'ı kontrol etme amaçlı post isteği
    // atmak yerine options atıyor. Bizimde bu isteği ele alıp
    // server'ın desteklediği http methodlarını aşağıdaki header'la
    // göndermemiz gerekti. Bu header'ları içeren bir cevap gönderdiğimiz
    // zaman tarayıcı bu sefer doğru methodla istek atıyor.
    case "OPTIONS":
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
      );

      res.end();
      break;

    case "GET":
      getRequest(req, res);
      break;

    case "POST":
      postRequest(req, res);
      break;

    case "DELETE":
      deleteRequest(req, res);
      break;

    default:
      // Cevabın durum kodunu güncelle.
      res.statusCode = 404;

      // Gönderilen cevaba yeni header ekle.
      res.setHeader("Content-Type", "application/json");

      // Gönderilecek cevabın içeriğini belirle.
      res.write(
        JSON.stringify({
          message: "Sayfa bulunamadı",
        })
      );

      // Cevabı client'a gönder.
      res.end();
  }
});

// 2) Belirli porta gelen istekleri dinle.
const port = 5001;

server.listen(port, () => {
  console.log(`Server ${port}'a gelen istekleri dinlemeye başladı.`);
});
