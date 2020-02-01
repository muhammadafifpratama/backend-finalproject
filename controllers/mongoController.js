let { MongoClient, ObjectID, url } = require('../database').mongodb

module.exports = {
    getGame: (req, res) => {
        MongoClient.connect(url, (err, client) => {
            if (err) throw err;
            var dbo = client.db("tugasakhir").collection("datagame")
            // var moviesCol = client.db('sample_mflix').collection('movies')
            dbo.find().limit(6).toArray(function (err, result) {
                if (err) throw err;
                console.log(result[0].nama);
                client.close();
                res.status(200).send(result)
                console.log(result);
            })
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
        })
    }
}