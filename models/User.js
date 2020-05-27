const { Model } = require("objection")
const database = require("./database-connection.js")
Model.knex(database)

module.exports = class User extends Model {
    static get tableName() {
        return 'user';
    }
    static get relationMappings() {
        const Mountain = require('./Mountain')
        return {
            mountains: {
                modelClass: Mountain,
                relation: Model.ManyToManyRelation,
                join: {
                    from: "user.id",
                    through: {
                        modelClass: Hike,
                        from: "hike.user_id",
                        to: "hike.mountain_id",
                        extra: ["title", "description", "image"]
                    },
                    to: "mountain.id"
                }
            }
        }
    }
}