const mysql = require("mysql");


const pool = mysql.createPool({
    connectionLimit : 100,
    host            :  process.env.DB_HOST,
    user            :  process.env.DB_USER,
    password        :  process.env.DB_PASS,
    database        :  process.env.DB_NAME
   
   });

exports.view = (req,res)=>{
       pool.getConnection((err,connection)=>{
        if(err) throw err;
        
         connection.query("select * from labours", (err,rows)=>{
            connection.release();
            if(!err){
                res.render("home",{rows});
            }else{
                console.log("ERROR", err);
            }

        });
    });
    
 };

 //For Search 
exports.find = (req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        
        let searchForm = req.body.search; 
        connection.query("select * from labours WHERE NAME LIKE ? OR ID LIKE? OR AGE LIKE? OR LICENSE LIKE?",["%" + searchForm +"%", "%" + searchForm +"%", "%" + searchForm +"%", "%" + searchForm +"%" ], (err,rows)=>{
         connection.release();

            if(!err){
                res.render("home",{rows});
            }else{
                console.log("ERROR", err);
            }

        });
    });
    
 };

 exports.adduser = (req,res)=>{
    res.render("adduser");
 }


 exports.save = (req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err;

        const {name,license,dob,age} = req.body;
  
        connection.query("insert into labours (NAME,LICENSE,DOB,AGE) values (?, ?, ?, ?)", [name,license,dob,age], (err,rows)=>{
            connection.release();
            if(!err){
                res.render("adduser",{msg:"User Details Added Successfully!!!"});
            }
             else{
                console.log("ERROR", err);
            }
       
            
        
        });
    });
    
 };

 
 exports.edituser = (req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        let id = req.params.id;

        connection.query("select * from labours where id=?", [id], (err,rows)=>{
            connection.release();
            if(!err){
                res.render("edituser",{rows});
            }else{
                console.log("ERROR", err);
            }

        });
    });
    
 };
  
 
 exports.edit = (req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        const {name,license,dob,age} = req.body;
        let id = req.params.id;


        connection.query("update labours set NAME=?,LICENSE=?,DOB=?,AGE=? where ID=?", [name,license,dob,age,id], (err,rows)=>{
            connection.release();
            if(!err){
                res.render("edituser",{msg:"User Details Updated Successfully!!!"});
            }else{
                console.log("ERROR", err);
            }

        });
    });
    
 };

 exports.delete=(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        let id = req.params.id;
        connection.query("delete from labours where id=?",[id],(err,rows)=>{
            connection.release();
            if(!err){
                res.redirect("/");
            }else{
                console.log(err);
            }
        });
    });
 };


 