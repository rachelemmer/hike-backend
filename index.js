const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt")
const knex = require("knex")
const config = require("./knexfile")[process.env.NODE_ENV || "development"]
const database = knex(config)
const jwt = require("jsonwebtoken")
const cors = require("cors")
const { Model } = require("objection")
require("dotenv").config()

app.use(bodyParser.json())
app.use(cors())

Model.knex(database)

class Mountain extends Model {
    static get tableName() {
        return 'mountain';
    }
}

class User extends Model {
    static get tableName() {
        return 'user';
    }
    static relationMappings = {
        mountains: {
            modelClass: Mountain,
            relation: Model.ManyToManyRelation,
            join: {
                from: "user.id",
                through: {
                    from: "hike.user_id",
                    to: "hike.mountain_id",
                    extra: ["title", "description", "image"]
                },
                to: "mountain.id"
            }
        }
    }
}

app.post("/users", (request, response) => {
    const { username, password } = request.body
    bcrypt.hash(password, 12).then(hashedPassword => {
        database("user")
            .insert({
                username,
                password_hash: hashedPassword
            }).returning("*")
            .then(users => {
                response.status(201).json({...users[0]})
            })
    })
})

app.post("/login", async (request, response) => {
    const { username, password } = request.body
    const foundUser = await database("user")
        .select()
        .where("username", username)
        .first()
    if (!foundUser){
        response.sendStatus(401)
    }
    const isPasswordMatch = await bcrypt.compare(password, foundUser.password_hash)

    if (!isPasswordMatch){
        response.sendStatus(401)
    }
    const token = jwt.sign({
        id: foundUser.id,
        username: foundUser.username
    }, process.env.SECRET)
    
    response.json({ token, foundUser })
})

app.get("/mountain", async (request, response) => {
    database("mountain").select()
        .then(mountains => {
        response.json({mountains})
    })
})

app.post("/hike", (request, response) => {
    const { title, image, description, user_id, mountain_id } = request.body
    database('hike')
    .insert({title, image, description, user_id, mountain_id})
    .then(response.sendStatus(201))
})

// async function authenticate(request, response, next){
//     const token = request.headers.authorization.split(" ")[1]
//     if (!token){
//         response.sendStatus(401)
//     }
//     let id
//     try {
//         id = jwt.verify(token, process.env.SECRET).id
//     } catch(error){
//         response.sendStatus(403)
//     }
//     const user = await database("user")
//         .select()
//         .where("id", id)
//         .first()

//     request.user = user
    
//     next()
// }

app.listen(process.env.PORT || 4000)