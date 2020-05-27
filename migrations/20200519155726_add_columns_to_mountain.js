
exports.up = function(knex) {
    return knex.schema.table("mountain", mountain => {
        mountain.integer("gain")
        mountain.float("miles")
    })
};

exports.down = function(knex) {
    return knex.schema.table("mountain", mountain => {
        mountain.dropColumn("gain")
        mountain.dropColumn("miles")
    })
};
