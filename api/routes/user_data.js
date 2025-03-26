const createRouter = require('../services/routing');
const db = require('../utility/database')

module.exports = createRouter((router)=>{

    router.post('/' , (req,res)=>{
        db.query('select * from users' , (err,result)=>{
            if(err){
                res.send(err.message);
            }else{
                res.json(result);
            }
        })
    })

})
