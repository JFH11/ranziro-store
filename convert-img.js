const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Path ke folder input (PNG) dan folder output (WebP)
const inputFolder = path.join(__dirname, 'public/img');
const outputFolder = path.join(__dirname, 'public/img-webp');

// Pastikan folder output ada, jika tidak buat
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

// Fungsi untuk mengonversi gambar PNG ke WebP
const convertPNGtoWebP = async () => {
  try {
    // Baca semua file di folder input
    const files = fs.readdirSync(inputFolder);

    // Loop melalui setiap file di folder input
    for (const file of files) {
      const inputFilePath = path.join(inputFolder, file); // Path file input
      const outputFilePath = path.join(
        outputFolder,
        file.split('.').slice(0, -1).join('.') + '.webp' // Ganti ekstensi ke .webp
      );

      // Proses konversi jika file adalah PNG
      if (file.toLowerCase().endsWith('.png')) {
        await sharp(inputFilePath)
          .toFormat('webp', { quality: 80 }) // Konversi ke WebP dengan kualitas 80
          .toFile(outputFilePath);
        console.log(`Converted: ${file} -> ${outputFilePath}`);
      } else {
        console.log(`Skipped: ${file} (bukan file PNG)`);
      }
    }

    console.log('Semua file PNG berhasil dikonversi ke WebP!');
  } catch (error) {
    console.error('Terjadi kesalahan saat mengonversi gambar:', error);
  }
};

// Jalankan fungsi
convertPNGtoWebP();
