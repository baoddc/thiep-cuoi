/**
 * Cloudflare R2 Upload Script (Node.js)
 * Uploads all images from /img directory to Cloudflare R2 bucket.
 * 
 * Requirements:
 *   npm install @aws-sdk/client-s3 dotenv
 * 
 * Usage:
 *   node scripts/upload-r2.js
 */

const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

// Load config from scripts/r2_config.json or environment variables
const configPath = path.join(__dirname, 'r2_config.json');
let config = {};
if (fs.existsSync(configPath)) {
  try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch (e) {}
}

const ACCOUNT_ID = process.env.R2_ACCOUNT_ID || config.AccountId;
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || config.AccessKeyId;
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || config.SecretAccessKey;
const BUCKET_NAME = process.env.R2_BUCKET_NAME || config.BucketName;
const IMG_DIR = path.join(__dirname, '..', 'img');

if (!ACCOUNT_ID || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY || !BUCKET_NAME) {
  console.error('[LỖI] Thiếu thông tin R2: Vui lòng cung cấp AccountId, AccessKeyId, SecretAccessKey, BucketName!');
  console.error('Bạn có thể cấu hình trong file scripts/r2_config.json hoặc biến môi trường.');
  process.exit(1);
}

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

async function uploadAll() {
  if (!fs.existsSync(IMG_DIR)) {
    console.error(`[LỖI] Không tìm thấy thư mục: ${IMG_DIR}`);
    return;
  }

  const files = fs.readdirSync(IMG_DIR).filter(file => /\.(jpe?g|png)$/i.test(file));
  console.log(`Tìm thấy ${files.length} ảnh trong thư mục ${IMG_DIR}. Đang tải lên R2 bucket '${BUCKET_NAME}'...`);

  let success = 0;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(IMG_DIR, file);
    const fileBuffer = fs.readFileSync(filePath);
    const sizeMb = (fileBuffer.length / (1024 * 1024)).toFixed(2);

    process.stdout.write(`[${i + 1}/${files.length}] Uploading ${file} (${sizeMb} MB)... `);
    try {
      await s3.send(new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: file,
        Body: fileBuffer,
        ContentType: 'image/jpeg',
      }));
      console.log('OK');
      success++;
    } catch (err) {
      console.log(`LỖI: ${err.message}`);
    }
  }

  console.log(`\nHoàn thành ${success}/${files.length} ảnh lên Cloudflare R2!`);
}

uploadAll();
