
const response = require('express');
const express = require('express');
const influencerRouter = express.Router();
const dynamicLinkService = require('../services/dynamicLinkService');

function helloWorld(){
    console.log("hello");
}

influencerRouter.route('/').get((req,res) =>{
    // Access the provided  query parameters
    let type = req.query.type;
    let typeId = req.query.typeId;
    let uId = req.query.uId;
    let placeId = req.query.placeId;
    let branchId = req.query.branchId;
    let bpId = req.query.bpId;
    let refId = req.query.refId;
    
    const data = JSON.stringify({
        "type"   : type,
        "typeId" :typeId,
        "userId" : uId,
        "bpId" :bpId,
        "branchId" : branchId,
        "placeId" : placeId
      });
      
      const url = req.originalUrl;
      if(url.includes('?')){
        buildRedirectContent(req, res, data);
      }else{
        res.render('influencer');
      }
})

const buildRedirectContent = function(req, res, data) {
    const shortLink = dynamicLinkService.getDynamicLinkAsync(data);
    //res.render('influencer');
    shortLink.then(function(link) {
                console.log(link.entity)
                res.send(buildShareContent({
                deeplink: link.entity,
                title: 'Some title',
                description: 'Some description',}))
                })
            .catch((error) => {
                console.log(error);
            });
}

const buildShareContent = function(data) {
    return ('<!DOCTYPE html>' +
    '<html>' +
      '<head>' +
        '<meta property="fb:app_id" content="your_facebook_app_id" />' +
        '<meta property="al:android:package" content="your_app_package" />' +
        '<meta property="al:android:app_name" content="your_app_name" />' +
        '<meta property="al:android:url" content="'+ data.deeplink +'" />' +
        '<meta property="al:ios:url" content="'+ data.deeplink +'" />' +
        '<meta property="al:ios:app_store_id" content="your_app_store_id" />' +
        '<meta property="al:ios:app_name" content="your_app_name" />' +
        '<meta property="al:web:should_fallback" content="true" />' +
        '<meta property="al:web:url" content="some_url_to_view_when_fallback_is_needed" />' + // dont know if this is required
  
        '<meta property="og:title" content="'+ data.title + '" />' +
        '<meta property="og:description" content="'+ data.description +'" />' +
        '<meta property="og:image" content="'+ data.image_url + '" />' +
        '<meta property="og:image:width" content="'+(data.width || 640)+'" />' + // this is for the preview image to load on first share
        '<meta property="og:image:height" content="'+(data.height || 640)+'" />' + // this is for the preview image to load on first share
  
        '<meta name="twitter:card" content="summary" />' +
        '<meta name="twitter:site" content="@yourtag" />' +
        '<meta name="twitter:creator" content="@yourtag" />' +
        '<meta name="twitter:title" content="'+ data.title +'" />' +
      '</head>' +
      '<body>' +
            '<script>' +
            'window.location = "'+ data.deeplink +'"' +
            '</script>' +
      '</body>' +
    '</html>')
  }


module.exports = influencerRouter;
