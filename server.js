const express = require("express");
const app = express();
const path = require("path");
const body_parser = require("body-parser");
const mongoose = require("mongoose");

app.use(express.static(path.join(__dirname,"client/dist/client")));
app.use(body_parser.json());
mongoose.connect("mongodb://localhost/pet-shelter");

const PetSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "pet name is required (back-end)."],
        minlength:[3,"pet name should be at least 3 characters long (bback-end)."]
    },
    pet_type:{
        type:String,
        required:[true, "pet type is required (back-end)."],
        minlength:[3,"pet type should be at least 3 characters long (bback-end)."]
    },
    description:{
        type:String,
        required:[true, "pet description is required (back-end)."],
        minlength:[3,"pet description should be at least 3 characters long (bback-end)."]
    },
    skill1:String,
    skill2:String,
    skill3:String,
    likes:{
        type:Number,
        default:0
    }
});

/* PetSchema.path("name").validate({
    isAsync:true,
    validator:function(val,res){
        mongoose.model("Pet",PetSchema).count({name:val},function(err,count){
            res(count == 0);//respond true if count equals zero (no other accounts with that email found).
        });
    },
    message: "an account with that name already exists - async custom validator (back-end)."
}); */
const Pet = mongoose.model("Pet",PetSchema);

/*create one*/
app.post("/api/pets",function(req,res){
    console.log("inside",req.body.name);
    Pet.find({name:req.body.name}, function(errors, users) {
            if(errors){
                res.json(errors);
            }else if(users.length > 0){
                let errors = {
                    description: {message:"an account with that name already exists - async custom validator (back-end)."}
                }
                res.json({message:"error",errors:errors});
            }else{
                Pet.create(req.body)
                    .then(pet => res.json(pet))
                    .catch(errors => res.json(errors));
            }
        });
    /* Pet.find({"name":req.body.name},function(errors,pet){
        if(errors){
            console.log("error....");
        }else if(pet.length > 0){
            console.log("already exists");
        }else{

        }
    }); */
    //Pet.create(req.body)
});
/* app.post("/api/pets",function(req,res){
    Pet.create(req.body)
        .then(pet => res.json(pet))
        .catch(errors => res.json(errors));
}); */
/*read one*/
app.get("/api/pets/:id",function(req,res){
    Pet.findById(req.params.id)
        .then(pet => res.json(pet))
        .catch(errors => res.json(errors));
});
/*update one*/
app.put("/api/pets/:id",function(req,res){
    Pet.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    .then(pet => {console.log("good"); res.json(pet)})
    .catch(errors => {console.log(errors); res.json(errors)});
    });
    
/*delete one*/
app.delete("/api/pets/:id",function(req,res){
    Pet.findByIdAndRemove(req.params.id)
        .then(pet => res.json(pet))
        .catch(errors => res.json(errors));
});
/*get all*/
app.get("/api/pets",function(req,res){
    Pet.find({})
        .sort("-pet_type")
        .then(pets => res.json(pets))
        .catch(errors => res.json(errors));
});

app.put("/api/pets/like/:id",function(req,res){
    Pet.update(
        {_id:req.params.id},
        { $inc:{"likes":req.body.like}},function(errors,pet){
            if(errors){
                res.json(errors)
            }else{
                res.json(pet);
            }
        }
    )
});
/**********************EVERYTHING ELSE*************************/
app.all("*", function(req,res,next){
    res.sendFile(path.resolve("./client/dist/client/index.html"));
});
/**************************START SERVER******************************/
app.listen(8000, function(){
    console.log("listening on port 8000...");
});