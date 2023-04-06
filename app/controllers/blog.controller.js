const BlogModel = require("../models/blog.model");

//create new blog and save
exports.create = async (req, res) => {
  if (req.body.title && req.body.description) {
    const blog = new BlogModel({
      title: req.body.title,
      description: req.body.description,
    });
    await blog.save().then((data) => {
      res.send({
        message: "Blog created successfully",
        blog: data,
      });
    }).catch(err=>{
        console.log('Error in saving blog',err);
         res.status(400).send({ message: `Error in saving blog ${err}` });
      });
  } else {
    res.status(400).send({ message: "fileds are empty" });
  }
};

//find all the blogs
exports.findAll = async (req, res) => {
  // const blog = await BlogModel.find();
  BlogModel.find().then((data) => {
    res.send({ message: "Blogs data", blogs: data });
  }).catch(err=>{
    console.log('Error in fetching data',err);
    res.status(400).send({ message: `Error in fetching  blog ${err}` });

  });
};


//find one base on id
exports.findOne = (req,res)=>{
    const id = req.params.id;
    BlogModel.findById(id)
    .then(data=>{
        if(!data)
            res.status(400).send({message:"No blog found with id : "+id})
        else
            res.send({message:"Data found", blog:data})
    })
    .catch(err=>{
        res.status(500).send({message:err.message||"Some issue in fetching data with blog id :"+id})
    })
}

//update based on id
exports.update = (req,res)=>{
    if(!req.body){
        return res.status(400).send({message:'Please provide data to update'})
    }
    const id = req.params.id;
    BlogModel.findByIdAndUpdate(id, req.body,{ useFindAndModify:false})
    .then(data=>{
        if(!data)
            res.status(400).send({message:"No blog found with id : "+id})
        else
            res.send({message:"Blog updated sucessfully"})
    })
    .catch(err=>{
        res.status(500).send({message:err.message||"Some issue in Updating data with blog id :"+id})
    })

}

//delete
exports.update = (req,res)=>{
    const id = req.params.id;
    BlogModel.findByIdAndRemove(id)
    .then(data=>{
        if(!data)
            res.status(400).send({message:"No blog found with id : "+id})
        else
            res.send({message:"Blog deleted sucessfully"})
    })
    .catch(err=>{
        res.status(500).send({message:err.message||"Some issue in deleting data with blog id :"+id})
    })
}