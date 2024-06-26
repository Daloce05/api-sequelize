
const router = require ('express').Router();
const {connectClient} = require("../db/postgres");
const todoModel = require('../src/models/todomodels');

router.get("/",async(req,res)=>{
   const client =await connectClient();
    try{
        const result =await client.query("SELECT * FROM todos");
        res.render("todos/index",{todos:result.rows}); 

    } catch (error) {
        res.status(500).send(error.messages);
    }finally{
        await client.end();
    }
})



//post
router.post("/",async (req,res)=> {
    console.log(req.body);
    try{
        const {title,completed} = req.body;
        await Todo.create ({  title,completed: completed == 'on' ? true:false
        })
        res.redirect('/todospanel');
    }catch (error){
        res.status(500).send(error.messages)
    }
})
module.exports = router;