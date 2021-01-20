import * as express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    ssoToken: '8c342904-783c-4846-b639-59ca79a75fed',
  });
});

export { router as auth };
