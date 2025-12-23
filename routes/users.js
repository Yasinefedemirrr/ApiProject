const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// JSON dosya yolu
const DATA_FILE = path.join(__dirname, '../data/users.json');

// JSON dosyasından veri okuma fonksiyonu
function readUsers() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// JSON dosyasına veri yazma fonksiyonu
function writeUsers(users) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), 'utf8');
}

// GET /api/users - Tüm kullanıcıları listele
router.get('/', (req, res) => {
  try {
    const users = readUsers();
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Kullanıcılar yüklenirken hata oluştu!'
    });
  }
});

// GET /api/users/:id - Belirli bir kullanıcıyı getir
router.get('/:id', (req, res) => {
  try {
    const users = readUsers();
    const user = users.find(u => u.id === parseInt(req.params.id));
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Kullanıcı bulunamadı!'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Kullanıcı getirilirken hata oluştu!'
    });
  }
});

// POST /api/users - Yeni kullanıcı ekle
router.post('/', (req, res) => {
  try {
    const { name, email, age } = req.body;
    
    // Basit validasyon
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Name ve email alanları zorunludur!'
      });
    }
    
    const users = readUsers();
    
    // Yeni ID oluştur
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    
    // Yeni kullanıcı oluştur
    const newUser = {
      id: newId,
      name,
      email,
      age: age || null,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    writeUsers(users);
    
    res.status(201).json({
      success: true,
      message: 'Kullanıcı başarıyla eklendi!',
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Kullanıcı eklenirken hata oluştu!'
    });
  }
});

// PUT /api/users/:id - Kullanıcı güncelle
router.put('/:id', (req, res) => {
  try {
    const users = readUsers();
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Kullanıcı bulunamadı!'
      });
    }
    
    const { name, email, age } = req.body;
    
    // Güncelleme
    if (name) users[userIndex].name = name;
    if (email) users[userIndex].email = email;
    if (age !== undefined) users[userIndex].age = age;
    
    users[userIndex].updatedAt = new Date().toISOString();
    
    writeUsers(users);
    
    res.json({
      success: true,
      message: 'Kullanıcı başarıyla güncellendi!',
      data: users[userIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Kullanıcı güncellenirken hata oluştu!'
    });
  }
});

// DELETE /api/users/:id - Kullanıcı sil
router.delete('/:id', (req, res) => {
  try {
    const users = readUsers();
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Kullanıcı bulunamadı!'
      });
    }
    
    const deletedUser = users.splice(userIndex, 1)[0];
    writeUsers(users);
    
    res.json({
      success: true,
      message: 'Kullanıcı başarıyla silindi!',
      data: deletedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Kullanıcı silinirken hata oluştu!'
    });
  }
});

module.exports = router;

