const express = require('express')
const mongoose=require('mongoose')
const app = express()  
const Article=require('./model/article')
const articleRouter = require('./routes/articles')

mongoose.connect('mongodb://localhost/blog')
// setting the view engine
app.set('view engine', 'ejs')


app.use(express.urlencoded({extended:false}))
app.use('/articles', articleRouter)
app.get('/', async(req, res) => {
    const articles = await Article.find()
    res.render('articles/index', { text: articles })
})
app.listen(5000)