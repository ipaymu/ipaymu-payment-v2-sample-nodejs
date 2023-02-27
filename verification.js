
import fetch from 'node-fetch';
import CryptoJS from 'crypto-js';
import { readFile } from "node:fs/promises"
import { lookup } from "mime-types"


// adjust with your iPaymu api key & va 
var apikey          = "QbGcoO0Qds9sQFDmY0MWg1Tq.xtuh1";
var va              = "1179000899";
var url             = 'https://sandbox.ipaymu.com/api/v2/member-verification'; // development mode
// var url             = 'https://my.ipaymu.com/api/v2/member-verification'; // for production mode

const filePath = 'images/image.png';
const file = new Blob([await readFile(filePath)], { type: lookup(filePath) });

const bodyRequest = new FormData();

bodyRequest.append('account', "1179000899");
bodyRequest.append('birthday', "1995-01-01");
bodyRequest.append('birthplace', "Denpasar");
bodyRequest.append('gender', "L");
bodyRequest.append('national_id', "1234567890123456");
bodyRequest.append('province', "BALI");
bodyRequest.append('city', "KABUPATEN TABANAN");
bodyRequest.append('district', "MARGA");
bodyRequest.append('village', "CAU BELAYU");
bodyRequest.append('postal_code', "1234");
bodyRequest.append('address', "test");
bodyRequest.append('bank_code', "014");
bodyRequest.append('bank_number', "91231919100");
bodyRequest.append('bank_account', "Akun Demo IPAYMU");
bodyRequest.append('npwp_no', "12345");
bodyRequest.append('national_id_photo', file, "national_id_photo.jpg");
bodyRequest.append('selfie_photo', file, "national_id_photo.jpg");
bodyRequest.append('passbook_photo', file, "national_id_photo.jpg");


// generate signature
var bodyEncrypt     = CryptoJS.SHA256(JSON.stringify(bodyRequest));
var stringtosign    = "POST:"+va+":"+bodyEncrypt+":"+apikey;
var signature       = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(stringtosign, apikey));
// request

fetch(
    url,
    {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'va': va,
            'signature': signature,
            'timestamp': '20230201101010',
        },
        body: bodyRequest
    }
)
.then(function(res) {
    return res.json();
}).then(function(json) {
    console.log(json);
});