// İsteğin body kısmını oluştur.

module.exports = async (request) => {
  return new Promise((resolve, reject) => {
    try {
      // İsteğin body kısmını belirliyoruz.
      let body = "";

      // Aldığımız her parçayı body kısmına ekle.
      request.on("data", (chunk) => {
        body += chunk;
      });

      // Bütün parçaların bitme olayını izle.
      request.on("end", () => {
        resolve(JSON.parse(body));
      });
    } catch (err) {
      reject(err);
    }
  });
};
