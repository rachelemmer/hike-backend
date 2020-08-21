
exports.up = function(knex) {
    return knex.schema.createTable("hike", hike => {
        hike.increments()
        hike.string("title")
        hike.text("description")
        hike.string("image")
        hike.integer("user_id").references("id").inTable("user")
        hike.integer("mountain_id").references("id").inTable("mountain")
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("hike")
};
