const iso = require("isomorphic-fetch")
const GelenVeri = require("../database/GelenVeri")
class VeriIslemleri {

    async get(url) {
        const response = await fetch(url)
        const data = await response.json()

        return data
    }
}

module.exports.veriKaydet = (req, res) => {
    const show = new VeriIslemleri()
    show.get("https://jsonplaceholder.typicode.com/users")
        .then(data => {
            for (let i = 0; i <= data.length; i++) {
                let kaydet = new GelenVeri({
                    id: data[i].id,
                    name: data[i].name,
                    username: data[i].username,
                    email: data[i].email,
                    website: data[i].website
                })
                let promise = kaydet.save()
            }
        })
}

module.exports.veriGoster = (req, res) => {
    GelenVeri.find((err, results) => {
        res.render("yemekTarifleri", {
            kullanicilar: results
        })
        res.json(kullanicilar)
    }).sort("id")
}