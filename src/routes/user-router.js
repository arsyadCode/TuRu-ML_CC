const express = require('express');
const router = express.Router();
const db  = require('./dbConnection');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { customAlphabet } = require ('nanoid');
const nanoid = customAlphabet('1234567890', 6)

const signupValidation = [
    check('name', 'Nama harus diisi').not().isEmpty(),
    check('email', 'Masukan email yang valid!').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password minimal 8 karakter').isLength({ min: 8 })
]

const loginValidation = [
    check('email', 'Masukan email yang valid!').isEmail().normalizeEmail({ gmail_remove_dots: true }),
]

router.post('/register', signupValidation, 
    (req, res, next) => {
      db.query(
        `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(req.body.email
    )});`,
    (err, result) => {
      const errors = validationResult(req);
      if (result.length) {
        return res.status(409).send({
          msg: 'Email sudah digunakan!!!'
        });
      } 
      else if (!errors.isEmpty()) {
        return res.status(409).send({
            msg: errors
          });
      }
      else {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err
            });
          } else {
            // has hashed pw => add to database
            db.query(
              `INSERT INTO users (id, name, email, password) VALUES ('${nanoid(6)}','${req.body.name}', ${db.escape(
                req.body.email
              )}, ${db.escape(hash)})`,
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err
                  });
                }
                return res.status(201).send({
                  msg: 'Berhasil mendaftar!'
                });
              }
            );
          }
        });
      }
    }
  );
});

router.post('/login', loginValidation, (req, res, next) => {
    db.query(
      `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
      (err, result) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(409).send({
            msg: errors
          });
        }
        // user does not exists
        if (err) {
          throw err;
          return res.status(400).send({
            msg: err
          });
        }
        
        if (!result.length) {
          return res.status(401).send({
            msg: 'Email atau password salah!'
          });
        }
        // check password
        bcrypt.compare(
          req.body.password,
          result[0]['password'],
          (bErr, bResult) => {
            // wrong password
            if (bErr) {
              throw bErr;
              return res.status(401).send({
                msg: 'Email atau password salah!'
              });
            }
            if (bResult) {
              const token = jwt.sign({id:result[0].id},'bangkit-academy-token',{ expiresIn: '365d' });
              //token;
              db.query(
                `UPDATE users SET last_login = now(), token = '${token}' WHERE id = '${result[0].id}';`
              );
              return res.status(200).send({
                msg: 'Berhasil masuk!',
                user: result[0]
              });
            }
            return res.status(401).send({
              msg: 'Email atau password salah!'
            });
          }
        );
      }
    );
  });

  router.get('/users', (req,res,next) => {
    db.query(
        `SELECT * FROM users`,
        (err, result) => {
            if (err) {
                throw err;
                return res.status(400).send({
                  msg: err
                });
            }
            if (!result.length) {
                return res.status(401).send({
                  msg: 'No user'
                });
            }
            else {
                return res.status(201).send({
                    msg: 'Succes',
                    allUser: result
                })
            }

        }
    )
})

router.get('/users/:id', (req,res,next) => {
    const id = req.params.id;
    db.query(
        `SELECT * FROM users WHERE id = '${id}';`,
        (err, result) => {
            if (err) {
                throw err;
                return res.status(400).send({
                  msg: err
                });
            }
            if (!result.length) {
                return res.status(401).send({
                  msg: 'User tidak ditemukan!'
                });
            }
            else {
                return res.status(201).send({
                    msg: 'User ditemukan',
                    user: result
                })
            }

        }
        
    )
})
 
module.exports = router;