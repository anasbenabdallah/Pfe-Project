const bcrypt = require("bcrypt");
const UserSchema = require("../models/user.model");

module.exports = function createAdminUser() {
  UserSchema.findOne({ email: "admin@admin.com", role: "admin" })
    .then((adminUser) => {
      if (!adminUser) {
        const password = "52525875"; // Replace with actual password
        bcrypt.hash(password, 10, function (err, hash) {
          if (err) {
            console.error(err);
          } else {
            const newAdminUser = new UserSchema({
              firstname: "admin",
              lastname: "admin",
              email: "admin@admin.com",
              password: hash,
              role: "admin",
              country: "tunisia",
            });

            newAdminUser
              .save()
              .then((savedUser) => {
                console.log("Admin user created:", savedUser);
              })
              .catch((err) => {
                console.error(err);
              });
          }
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
