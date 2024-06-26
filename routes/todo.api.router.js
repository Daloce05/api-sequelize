const router = require('express').Router()
const client = require('../db/postgres') 
const todoModel= require('../src/models/todomodels')
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

//index
router.get('/', async (req, res) => {
    //console.log('GET /api/v1/todos')
    //obtener todos los "todos" de la BD
    try{
        const todos = await todoModel.findAll();
        res.json(todos);
    }
    
    catch(error){
        res.status(500).send(error.message);
    } 

    
})

// Crear una nueva tarea
router.post('/id', async (req, res) => {
    try {
        const { taskId } = req.body;
        const todo = await todoModel.findByPk(taskId);
        if (!todo) {
            return res.status(404).json({ errorMessage: 'Tarea no encontrada' });
        }
        res.status(200).json({ todo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: 'Error al buscar la tarea' });
    }
});



//show
// router.get('/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const todo = await todoModel.findByPk(id);
        
//         if (todo) {
//             res.json(todo);
//         } else {
//             res.status(404).send('no existe');
//         }
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

// Ruta para buscar un todo por ID
router.post('/id', async (req, res) => {
    try {
        const { taskId } = req.body;
        const todo = await todoModel.findByPk(taskId);
        if (!todo) {
            const todos = await todoModel.findAll();
            return res.render('todos/index', { todos, todo: null, errorMessage: 'Tarea no encontrada' });
        }
        const todos = await todoModel.findAll();
        res.render('todos/index', { todos, todo, errorMessage: null });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al buscar la tarea');
    }
});
//store
router.post('/',async(req,res)=> {
   // const Client = await client.connectClient();
   try {
    const { title, completed } = req.body;

    // Crea un nuevo registro en la base de datos usando Sequelize
    const newTodo = await todoModel.create({ title, completed });
     
    res.redirect("/api/v1/todospanel"); //redireccion todos panel
} catch (error) {
    res.status(500).send(error.message);
}



})


//Update
router.put('/:id', async (req, res) => {
    try {
        const { title, completed } = req.body;
        const todo = await todoModel.findByPk(req.params.id);
        if (!todo) {
            return res.status(404).send('Tarea no encontrada');
        }
        await todo.update({ title, completed: completed || false });
        res.redirect('/api/v1/todospanel');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar la tarea');
    }
});
    
//Delete
router.post('/delete', async (req, res) => {
    try {
        const id = req.body.id;

        // Busca el registro "todo" por ID
        const todo = await todoModel.findByPk(id);

        if (!todo) {
            return res.status(404).send('Todo not found');
        }

        // Elimina el "todo" de la base de datos
        await todo.destroy();

        res.redirect("/api/v1/todospanel"); //redireccion todos panel
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router 