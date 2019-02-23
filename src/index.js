const express = require('express')
const app = express()
const bodyParser = require('body-parser')
let port = null;
if (process.argv[2] === 'local') {
    port = 13000;
} else {
    port = 3000;
}

const BASE_URL = `/api/v1`;

const CB = require('../src/model/couchbaseUtil');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get(`${BASE_URL}/companies/`, (req, res) => {

    let query = "SELECT * FROM QWayDB where type = 'company'";
    CB.getAll(query)
        .then(rows => res.send(rows.map(val => val.QWayDB)))
        .catch(err => console.log(err));

})

app.get(`${BASE_URL}/company/:id`, (req, res, next) => {

    CB.get(`COMPANY::${req.params.id}`)
        .then(result => {
            let data = {
                status: 'success',
                data: result.value,
                cas: result.cas
            }

            res.send(data)
        })
        .catch(
            err => {

                let errorMessage = {
                    status: 'error',
                    message: err.message
                }

                console.log(err);
                res.status(500);
                res.send(errorMessage);
            }
        );

})

app.get(`${BASE_URL}/company/email/:emailId`, (req, res, next) => {

    console.log(`Calling ${BASE_URL}/company/email/${req.params.emailId}`)
    let query =
        `SELECT * FROM QWayDB AS bucketQWDB WHERE bucketQWDB.type='company' AND ANY userQ IN bucketQWDB.users SATISFIES userQ.email = '${req.params.emailId}' END`
        ;
    CB.getAll(query)
        .then(rows => { // FIXME NOT SURE HOW TO HANDLE MULTIPLE RESPONSE...
            rows.map(val => {
                let resp = {};
                resp.status = "success"
                resp.data = val.bucketQWDB;

                res.send(resp);
            })
        })
        .catch(err => console.log(err));
})

app.put(`${BASE_URL}/company`, (req, res, next) => {
    // check if param is valid FIRST

    let aCompany = req.body.data;
    let cas = req.body.cas;

    if (aCompany.id != undefined && aCompany.id != null) {
        aCompany.id - undefined;
    }
    console.log('aCompany');
    console.log(aCompany);
    console.log('cas');
    console.log(cas);
    CB.update(aCompany.id, aCompany, cas);
    res.send('Updated');
}
);

app.get(`${BASE_URL}/FastDoneNext`, (req, res, next) => {
    res.status = 200
    res.send('FAST - DONE - NEXT')
})
// app.post(`${BASE_URL}/companies`, (req, res) => {
//     console.log('POST IS CALLED')
//     console.log(req.body)
//     res.status = 200
//     res.send('All good!')
// })


app.listen(port, () => console.log(`Example app listening on port ${port}!`))