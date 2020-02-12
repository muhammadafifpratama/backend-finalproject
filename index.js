const mysql = require('mysql');
const axios = require('axios');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://asd:asd@pwdjc11-by9ng.mongodb.net/test?retryWrites=true&w=majority";
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'afif',
    password: 'asd123',
    database: 'finalproject'
});
var tampung = []
function getdata() {
    return axios.post("https://api-v3.igdb.com/games", {
        headers: {
            'Accept': 'application/json',
            'user-key': '2cde79ae740ae030142c85eba55de81f'
        },
        data: "fields cover,name; where cover>0; limit 10;"
    })
    .then(function (response) {
        console.log(response);
        })
        // .catch(function(error){
            //     console.log(error);
            // });
        }
        
        lempardata = async (req,res) => {
            let response = await axios.get("http://api.steampowered.com/ISteamApps/GetAppList/v0002")
                // console.log(response.data.applist.apps);
                let data = response.data.applist.apps.map((item)=> {
                    return item.appid
                })
                let lempar = data[3]
                // console.log(data[3]);
                let anotherresponse = await axios.get(`https://store.steampowered.com/api/appdetails/?appids=${lempar}`)
                // console.log(anotherresponse.data);
                // let apaan = [anotherresponse.data]
                MongoClient.connect(url, function (err, db) {
                    if (err) throw err;
                    let dbo = db.db("tugasakhir").collection("tampung")
                    dbo.insertMany([anotherresponse.data], function (err, res) {
                        if (err) throw err;
                        console.log("Number of documents inserted: " + res.insertedCount);
                        db.close();
                    });
                });
            }

tarikdata = async (req,res) => {
        MongoClient.connect(url, (err, client) => {
            if (err) throw err;
            var dbo = client.db("tugasakhir").collection("datagame")
            // var moviesCol = client.db('sample_mflix').collection('movies')
            dbo.find().limit(6).toArray(function (err, result) {
                if (err) throw err;
                // console.log(result[0].nama);
                client.close();
                res.status(200).send(result)
                // console.log(result);
            })
        moviesCol.find({
            title: {
                '$regex': req.query.title,
                '$options': 'i'
            }
        }, obj).limit(parseInt(req.query.limit)).toArray((err, docs) => {
            client.close()
            if (err) res.status(500).send(err)

            //console.log(docs)
            res.status(200).send(docs)
        })
        })
}

tes = async (req, res) => {
    let response = await axios({
        method: 'post',
        url: 'https://api-v3.igdb.com/games',
        headers: {
            'Accept': 'application/json',
            'user-key': '2cde79ae740ae030142c85eba55de81f',
            "Access-Control-Allow-Origin": "*"
        },
        data: "fields cover,name; where cover>0; limit 10;"
    })
    let data = response.data.map((item) => {
        return item
    })
    // console.log(item);
    console.log(response.data.length);
    console.log(response.data[1]);
    const query = "insert into tes set ?;"
    for (var i = 0; i < response.data.length; i++) {
        connection.query(query, response.data[i], (error, result) => {
            if (error) {
                console.log(error);
            }
            console.log(result);
        })
    }
}


console.log(tarikdata())

