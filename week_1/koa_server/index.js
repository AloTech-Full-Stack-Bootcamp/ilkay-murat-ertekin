// Koa and Router imported

const Koa=require('koa')
const Router=require('koa-router')



const app= new Koa()
const router= new Router
const port=5000

// Middleware funct is defined.
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });


router.get('/',(ctx,next)=>{
    ctx.body='<h1>İndex</h1>'
})
router.get('/about',(ctx,next)=>{
    ctx.body='<h1>About</h1>'
})

router.get('/contact',(ctx,next)=>{
    ctx.body='<h1>Contact</h1>'
})


app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})