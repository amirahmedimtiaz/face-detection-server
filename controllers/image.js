const Clarifai =require('clarifai');

//Use your own API key here
const app = new Clarifai.App({
    apiKey: '6e0be356a0644790af23e79843907893'
  });

const handleAPICall = (req,res)=>{
    app.models.predict("f76196b43bbd45c99b4f3cd8e8b40a8a",req.body.input)
    .then(data =>{
        res.json(data);
    })
    .catch(err => res.status(400).json("unable to work with API"))
}

const handleImage =(req,res,db) =>{
    const {id} = req.body;
    db('users').where('id','=',id)
        .increment('entries',1)
        .returning('entries')
        .then(entries =>{
            res.json(entries[0]);
        })
            .catch(err => res.status(400).json("unable to get entries"))
}

module.exports ={
    handleImage:handleImage,
    handleAPICall
}