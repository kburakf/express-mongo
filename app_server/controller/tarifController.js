const iso = require("isomorphic-fetch")
const GelenVeri = require("../database/GelenVeri")
const Albums = require("../database/Albums")
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
            for (let i = 0; i < data.length; i++) {
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
    }).sort("id")
}

module.exports.photos = (req,res)=>{
    const showPhoto = new VeriIslemleri()
    showPhoto.get("https://jsonplaceholder.typicode.com/photos")
    .then(data=>{
        for(let i=0;i<10;i++){
            let kaydet = new Albums({
                id:data[i].id,
                title:data[i].title,
                imgURL:data[i].thumbnailUrl
            })
            let promise = kaydet.save()
        }
    })
}

module.exports.photosShow = (req, res) => {
    Albums.find((err, photos) => {
        res.render("albums", {
            kullanicilar: photos
        })
    }).sort("id")
}
