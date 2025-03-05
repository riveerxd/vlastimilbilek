const bcrypt = require('bcryptjs');

// Replace 'your-new-password' with the password you want to use
const password = process.argv[2] || 'your-new-password';

// Generate a salt and hash the password
bcrypt.genSalt(10, function(err, salt) {
  bcrypt.hash(password, salt, function(err, hash) {
    console.log('Your hashed password:');
    console.log(hash);
    console.log('\nUpdate this in lib/auth.ts');
  });
}); 