const express = require('express');
const usersRouter = require('./routes/users');

const app = express();
const PORT = 3000;

// Middleware - JSON verilerini parse etmek için
app.use(express.json());

// Middleware - Basit logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Route'ları kullan
app.use('/api/users', usersRouter);

// Ana endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Finalizer API - Kullanıcı Yönetimi',
    endpoints: {
      'GET /api/users': 'Tüm kullanıcıları listele',
      'GET /api/users/:id': 'Belirli bir kullanıcıyı getir',
      'POST /api/users': 'Yeni kullanıcı ekle',
      'PUT /api/users/:id': 'Kullanıcı güncelle',
      'DELETE /api/users/:id': 'Kullanıcı sil'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Bir hata oluştu!',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint bulunamadı!'
  });
});

// Server'ı başlat
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portunda çalışıyor...`);
  console.log(`📍 http://localhost:${PORT}`);
});

