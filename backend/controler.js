const client = require("../backend/db");
const bcrypt = require('bcrypt');

const getPassport = (req,res) => {
    const params = req.body;
    if(!params && !params.value){
        return res.status(400).send("нет значения");
    }
    client.query(`SELECT * FROM passports`, function(err, results) {
        if(err) console.log(err);
        const passport = results.rows
        for(let i=0; i < passport.length; i++){
            const name = passport[i].name.toLowerCase()
            if(name.includes(params.value.toLowerCase())){
                return res.status(200).send(passport[i])
            }
          }
        return res.status(400).send('не найдено')
    });   
}

const createPassport = async (req, res) => {
    const params = req.body;
    if(!params){
        return res.status(400).send("не найдено");
    }
    const {name, age, serial} = params.passport
    if(!name && !age && !serial){
        return res.status(400).send('заполните все поля')
    }
    const hash = await bcrypt.hash(name, 7)
    const sql = `INSERT INTO passports(name, age, serial, hash) VALUES('${name}','${age}', ${serial},'${hash}')`;
    client.query(sql, function(err, results) {
        if(err) console.log(err);
        console.log(results);
    });
    return res.status(200).send('паспорт создан')
}


module.exports = { createPassport, getPassport };