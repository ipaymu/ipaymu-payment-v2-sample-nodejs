import fetch from 'node-fetch'; // npm install crypto-js
import CryptoJS from 'crypto-js'; // npm install node-fetch --save

// adjust with your iPaymu api key & va 
var apikey          = "QbGcoO0Qds9sQFDmY0MWg1Tq.xtuh1";
var va              = "1179000899";
var url             = 'https://sandbox.ipaymu.com/api/v2/payment/direct'; // development mode
// var url             = 'https://my.ipaymu.com/api/v2/payment/direct'; // for production mode

var body            = {
    "name":"Putu",
    "phone":"08123456789",
    "email": "putu@gmail.com",
    "amount": 10000,
    "comments":"Payment to XYZ Store",
    "notifyUrl":"https://your-website.com/callback-url", // your callback url
    "referenceId":"1234", // your reference id or transaction id
    "paymentMethod":"va",
    "paymentChannel":"bca",
} 
// generate signature
var bodyEncrypt     = CryptoJS.SHA256(JSON.stringify(body));
var stringtosign    = "POST:"+va+":"+bodyEncrypt+":"+apikey;
var signature       = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(stringtosign, apikey));
// request
fetch(
    url,
    {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            va: va,
            signature: signature,
            timestamp: '20150201121045'
        },
        body: JSON.stringify(body)
    }
)
.then((response) => response.json())
.then((responseJson) => {
    // response
    console.log(responseJson)
})