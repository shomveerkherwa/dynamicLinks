const axios = require('axios');

function dynamicLinkService(){
    function getDynamicLinkWithPromise(data){
        console.log("data "+data);
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
          }
        return new Promise((resolve, reject) => {
            axios
                .post('https://api-dev.wifiesta.com/v1/places/dynamiclink', data, config)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    var getDynamicLinkAsync = async function (data){
        console.log("I am way to cool");
        console.log("data "+data);
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
          }
        const response = await axios.post('https://api-dev.wifiesta.com/v1/places/dynamiclink', data, config);  
        console.log(response.data);
        return response.data;
    }
    return {getDynamicLinkWithPromise, getDynamicLinkAsync};
}

module.exports = dynamicLinkService();