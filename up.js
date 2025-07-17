// upload-to-cloudinary.js
const cloudinary = require('cloudinary').v2;

// Konfigurasi akun kamu
cloudinary.config({
  cloud_name: 'dwgfox722',      // ganti
  api_key: '457357422127768',            // ganti
  api_secret: 'av2kfaV408_bJaim0nnAdS2ikVY'       // ganti
});

async function uploadImage(filePath) {
  try {
    // Upload ke folder 'my_uploads' dan generate thumbnail transform
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'my_uploads', 
      eager: [
        { width: 200, height: 200, crop: 'thumb' } // thumbnail
      ]
    });

    console.log('Original image URL:', result.secure_url);
    console.log('Thumbnail URL:', result.eager[0].secure_url);
  } catch (error) {
    console.error('Upload error:', error);
  }
}

// Contoh: upload file lokal
uploadImage('./hasil.png');
