const express = require('express')
const router = express.Router()
const Article=require('./../model/article')

// router.get('/', (req, res) => {
//     res.send('In articles')
// })

router.get('/new', (req, res) => {
    res.render('articles/new', {article: new Article()})
})

router.get('/:slug', async(req, res)=>{
    const article = await Article.findOne({slug:req.params.slug})
    if(article==null) res.redirect('/')
    res.render('article/show', {article:article})
}
)

router.post('/', async(req, res)=>{
    const article=new Article({
        title:req.body.title,
        description:req.body.description,
        markdown:req.body.markdown
    })
    try{
        article=await article.save()
        res.redirect(`/article/${article.slug}`)
    }
    catch(e){
        res.render('article/new', {article:article})
    }
    // res.render('articles/new')
} )


module.exports = router 