import multer from 'multer';
import path from 'path';
import { Request } from 'express';
class File{
	storage = multer.diskStorage({
        destination: path.join(__dirname, '..', 'uploads'),
        filename: (request: Request, file, callback) => {
            const fileName = `${Date.now()}-${file.originalname}`;

            callback(null, fileName);
        },
    });
}
export default new File;
