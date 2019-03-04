exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('images').insert([
    {"title": "Image title 1", "alt": "Image alt tag 1", "url": "https://imageurl1.com", "created_at": new Date, "updated_at": new Date}, {"title": "Image title 2", "alt": "Image alt tag 2", "url": "https://imageurl2.com", "created_at": new Date, "updated_at": new Date}, {"title": "Image title 3", "alt": "Image alt tag 3", "url": "https://imageurl3.com", "created_at": new Date, "updated_at": new Date}, {"title": "Image title 4", "alt": "Image alt tag 4", "url": "https://imageurl4.com", "created_at": new Date, "updated_at": new Date}
  ]);
};
