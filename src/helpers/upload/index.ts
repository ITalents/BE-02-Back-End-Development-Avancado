import multer from "multer";
import { resolve, dirname } from "path";
import { v4 as uuid } from "uuid";

export default {
  upload(folder: string) {
    const __dirname = dirname(new URL(import.meta.url).pathname);

    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (req, file, callback) => {
          const fileHash = uuid();
          const fileName = `${fileHash}-${file.originalname}`;
          return callback(null, fileName);
        },
      }),
    };
  },
};
