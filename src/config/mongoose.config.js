const { default: mongoose } = require('mongoose');

require('dotenv').config();

mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log('Connection Established! 🚀✅');
    })
    .catch(err => {
        console.log(
            err?.message ?? err ?? 'Sth went wrong when connecting to DB',
        );
    });
