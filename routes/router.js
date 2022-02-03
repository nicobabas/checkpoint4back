import securityController from '../controllers/securityController.js';
import adminController from '../controllers/adminController.js';
import titleController   from '../controllers/pageController.js'
import bookController from '../controllers/bookController.js';

export const setupRoutes = (app) => {
    app.use('/security', securityController);
    app.use('/admin', adminController);
    app.use('/addpage', titleController);
    app.use('/books', bookController);
}