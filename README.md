# Finalizer API - Kullanıcı Yönetimi

Node.js ve Express.js öğrenme sürecinde, backend geliştirme pratiği kazanmak amacıyla geliştirilmiş basit bir REST API projesidir.

## 📋 Proje Özellikleri

- ✅ Node.js ve Express.js kullanılarak geliştirildi
- ✅ CRUD (Create, Read, Update, Delete) işlemleri
- ✅ JSON dosyası ile veri saklama
- ✅ Middleware kullanımı
- ✅ Error handling
- ✅ Route'ları dosyalara ayırma

## 🚀 Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Sunucuyu başlatın:
```bash
npm start
```

Sunucu `http://localhost:3000` adresinde çalışacaktır.

## 📡 API Endpoints

### Ana Endpoint
- **GET** `/` - API bilgileri ve endpoint listesi

### Kullanıcı Endpoints

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/users` | Tüm kullanıcıları listele |
| GET | `/api/users/:id` | Belirli bir kullanıcıyı getir |
| POST | `/api/users` | Yeni kullanıcı ekle |
| PUT | `/api/users/:id` | Kullanıcı güncelle |
| DELETE | `/api/users/:id` | Kullanıcı sil |

## 🧪 Postman ile Test

Geliştirilen API endpoint'leri Postman üzerinden test edilmiştir.

### Test Adımları

#### 1. Tüm Kullanıcıları Listele
- **Method:** GET
- **URL:** `http://localhost:3000/api/users`
- **Body:** Yok

#### 2. Belirli Bir Kullanıcıyı Getir
- **Method:** GET
- **URL:** `http://localhost:3000/api/users/1`
- **Body:** Yok

#### 3. Yeni Kullanıcı Ekle
- **Method:** POST
- **URL:** `http://localhost:3000/api/users`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "name": "Ali Veli",
  "email": "ali@example.com",
  "age": 27
}
```

#### 4. Kullanıcı Güncelle
- **Method:** PUT
- **URL:** `http://localhost:3000/api/users/1`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "name": "Ahmet Yılmaz Güncellendi",
  "age": 26
}
```

#### 5. Kullanıcı Sil
- **Method:** DELETE
- **URL:** `http://localhost:3000/api/users/1`
- **Body:** Yok

## 📁 Proje Yapısı

```
FinalizerApi/
├── app.js              # Ana server dosyası
├── package.json        # Proje bağımlılıkları
├── routes/
│   └── users.js       # Kullanıcı route'ları
├── data/
│   └── users.json     # Kullanıcı verileri (JSON dosyası)
└── README.md          # Proje dokümantasyonu
```

## 💡 Örnek Response'lar

### Başarılı Response
```json
{
  "success": true,
  "data": [...],
  "message": "İşlem başarılı"
}
```

### Hata Response
```json
{
  "success": false,
  "error": "Hata mesajı"
}
```

## 🔧 Teknolojiler

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **JSON** - Veri saklama formatı

## 📝 Notlar

- Veriler `data/users.json` dosyasında saklanmaktadır
- Her işlem sonrası JSON dosyası güncellenir
- ID'ler otomatik olarak oluşturulur

