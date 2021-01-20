import * as express from 'express';
import * as faker from 'faker';

const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    {
      id: faker.random.uuid(),
      name: 'Tweety',
      age: '3',
      type: 'Bird',
    },
  ]);
});

export { router as pets };
