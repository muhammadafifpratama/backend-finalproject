let { MongoClient, ObjectID, url } = require('../database').mongodb
const axios = require('axios');


module.exports = {
    getGame: (req, res) => {
        axios({
            method: 'post',
            url: 'https://api-v3.igdb.com/games',
            headers: {
                'Accept': 'application/json',
                'user-key': '2cde79ae740ae030142c85eba55de81f',
                "Access-Control-Allow-Origin": "*"
            },
            data: "fields cover,name; where cover>0; limit 10;"
        })
            .then((res1) => {
                // res.status(200).send(res1.data)
                res1.data.map((val,index) => {
                    if (index.length-1) {var id = `${val.cover}`}
                    else {var id = `${val.cover},`}
                    console.log(id);
                    axios({
                        method: 'post',
                        url: 'https://api-v3.igdb.com/covers',
                        headers: {
                            'Accept': 'application/json',
                            'user-key': '2cde79ae740ae030142c85eba55de81f',
                            "Access-Control-Allow-Origin": "*"
                        },
                        data: `fields url; where id = (${id});`
                        // data: `fields url; where id = (34231,
                        //     82483,
                        //     27639,
                        //     22634,
                        //     86159,
                        //     22963,
                        //     38355,
                        //     89260,
                        //     82558,
                        //     44650);`
                        // (' + val.cover.join(',') + ');"
                    })
                    .then((res2) => {
                        // console.log(res2.data);
                        res.status(200).send(res2.data)
                    })
            })
            .catch(err => {
                res.status(500).send(err)
            })

        // MongoClient.connect(url, (err, client) => {
        //     if (err) throw err;
        //     var dbo = client.db("tugasakhir").collection("datagame")
        //     // var moviesCol = client.db('sample_mflix').collection('movies')
        //     dbo.find().limit(6).toArray(function (err, result) {
        //         if (err) throw err;
        //         // console.log(result[0].nama);
        //         client.close();
        //         res.status(200).send(result)
        //         // console.log(result);
        //     })
        // moviesCol.find({
        //     title: {
        //         '$regex': req.query.title,
        //         '$options': 'i'
        //     }
        // }, obj).limit(parseInt(req.query.limit)).toArray((err, docs) => {
        //     client.close()
        //     if (err) res.status(500).send(err)

        //     //console.log(docs)
        //     res.status(200).send(docs)
        // })
        // })
    }
}
}