import multer from 'multer';
import path from 'path';
import { Request } from 'express';
class File{
	storage = multer.diskStorage({
        destination: path.join(__dirname, '..', 'uploads'),
        filename: (req: Request, file, cb) => {
            const fileName = `${file.originalname}-${Date.now()}`;

            cb(null, fileName);
        },
    });
}
export default new File;
