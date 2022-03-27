const express = require('express');

const morgan = require('morgan');
const path = require('path');
const influencerRouter = require('./src/routers/influencerRouter');
const redirectHtmlRouter = require('./src/routers/redirectWithHtmlRouter');

// reading the details from environemnet and setting a PORT variable with fallback option of 3000
const PORT = process.env.PORT || 3000;


const app = express();
// setting to print minimum info like served GET page etc
//app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'/public/')));

//letting express know where to find views and what is the view engine.
app.set('views', './src/views/html');
app.set('view engine', 'ejs');

app.use('/influencer', influencerRouter);
app.use('/redirectHtml', redirectHtmlRouter);


app.get('/', (req, res) => {
   res.render('index',{title : 'som'});
})

app.listen(3000, ()=>{
    console.log(`listening always on port ${PORT}`);
})
