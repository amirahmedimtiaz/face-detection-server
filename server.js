const express =require('express');
const bcrypt =require('bcrypt-nodejs');
const app =express();
const cors=require('cors');

app.use(cors());

app.use(express.json());

const database = {
    users: [
        {
            id:'123',
            name:'John',
            email:'john@gmail.com',
            password:'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id:'124',
            name:'Sally',
            email:'sally@gmail.com',
            password:'bananas',
            entries: 0,
            joined: new Date()
        }
    ],
    login : [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/',(req,res)=>{
    res.send(database.users);
})

app.post('/signin',(req,res) =>{
    bcrypt.compare("apples",'$2a$10$lsEpMjF0CCo7IGqxyOfR9ub0thAQFXJCN7B.Ub9Cr0B391oB/74Xe',(err,hash) => {
        //console.log('first guess',hash);
    });
    bcrypt.compare("veggies",'$2a$10$lsEpMjF0CCo7IGqxyOfR9ub0thAQFXJCN7B.Ub9Cr0B391oB/74Xe',(err,hash) => {
        //console.log('second guess',hash);
    });

    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json(database.users[0]);
    }
    else{
        res.status(400).json('Wrong email Id or Password');
    }
})

app.post('/register', (req,res) =>{
    const{email,name,password} =req.body;
    
    database.users.push({
        id:'125',
        name: name,
        email:email,
        //password:password,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length-1]);
})

app.put('/image', (req,res)=>{
    const {id} = req.body;
    let found = false;
    database.users.forEach(user =>{
        if(user.id === id){
            found=true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if(!found){
        res.status(400).json("Not found");
    }
})

app.get('/profile/:id',(req,res) =>{
    const {id} = req.params;
    let found = false;
    database.users.forEach(user =>{
        if(user.id === id){
            found=true;
            return res.json(user);
        }
    })
    if(!found){
        res.status(400).json("Not found");
    }
})

app.listen(3001,() =>{
    console.log('app is running on port 3001');
});

/*
/-->res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user 

*/