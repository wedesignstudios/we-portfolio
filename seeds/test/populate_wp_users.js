exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('wp_users').insert([
    {"user_login": "Design", "user_email": "myemail@email.com", "display_name": "Full Name", "created_at": new Date, "updated_at": new Date}
  ]);
};
