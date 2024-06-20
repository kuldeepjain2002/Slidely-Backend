import { Router } from 'express';
import { ping, submit, read, deleteSubmission,updateSubmission} from '../controller/submissionsController';

const router = Router();

router.get('/ping', ping);
router.post('/submit', submit);
router.get('/read', read);
router.delete('/delete', deleteSubmission);
router.put('/update', updateSubmission); 



export default router;