import { Router } from 'express';
import { addCar, deleteCar, getCars } from '../controllers';

const router = Router();

router.post('/', addCar);
router.get('/', getCars);
router.delete('/:carId', deleteCar);

export default router;
