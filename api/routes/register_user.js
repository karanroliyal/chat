const createRouter = require('../services/routing');
const { body, validationResult } = require('express-validator')
const db = require('../utility/database')
const uploadImage = require('../middlewares/upload')


module.exports = createRouter((router) => {

    router.use(uploadImage);

    router.post('/',
        [
            body("name").notEmpty().matches(/^[a-zA-Z\s]+$/).withMessage("Name must contain only letters and spaces"),
            body("email").notEmpty().isEmail().withMessage("Invalid email"),
            body("password").notEmpty().isStrongPassword().withMessage("Weak password"),
            body("phone").matches(/^[0-9]+$/).withMessage("Phone number only contain number"),
            body("profile").notEmpty().withMessage('Profile picture is required'),
        ],
        async (req, res) => {
            const { name, phone, email, profile, password } = req.body;

            // Basic validation
            if (!name || !phone || !email || !profile || !password) {
                return res.json({ statusCode: 400, message: 'All fields are required' });
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({ statusCode: 400, message: errors.array()[0].msg })
            }

            // SQL query with placeholders (prevents SQL injection)
            const query = `INSERT INTO users (id, name, phone, email, profile, password)
            VALUES (NULL, ?, ?, ?, ?, ?)`;

            // Execute query safely
            db.query(query, [name, phone, email, profile, password], (err, result) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    return res.json({ statusCode: 400, message: `${err.message}` });
                }
                res.status(201).json({
                    statusCode: 200,
                    message: 'Registered successfully',
                    userId: result.insertId,
                });
            });
        });

})


