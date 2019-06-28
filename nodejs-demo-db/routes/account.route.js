import { Router } from 'express';
import db from '../db';

const router = Router();

router.get('/', (req, res) => {

    db.pool.getConnection()
    .then(conn => {

      conn.query("SELECT * FROM commerce.account")
        .then((rows) => {
          let data = rows;
          return data;
        })
        .then((data) => {
            res.render('partials/account/index', {
                title: 'Account List',
                accounts: data
            });
          conn.end();
        })
        .catch(err => {
          console.log(err);
          conn.end();
        })
    }).catch(err => {
      console.log('not connected');
    });
});

export default router;