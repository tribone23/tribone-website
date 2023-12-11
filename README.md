# Tribone Website 🚀

Website Portal Mahasiswa Teknologi Rekayasa Internet PENS 2023 build with ReactJS

![Tribone Portal](https://i.ibb.co/wYVg7hH/image.png)

## 🐧 Live Site
[https://www.tribone.my.id](https://www.tribone.my.id)

## 🕷️ Deployment
### `Backend`
Github repository untuk rest api backend dapat diakses di [https://github.com/tribone23/tribone-api](https://github.com/tribone23/tribone-api)

### 💻 Setup

Silahkan clone repository ke local 
```
git clone https://github.com/tribone23/tribone-website.git
```

Sesuaikan URL API dengan menambahkan environment variable `VITE_API_BASE_URL`
```
VITE_API_BASE_URL = .....(cont. http://127.0.0.1/tribone-api)
```

atau sesuaikan pada file *App.jsx*
```
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost/tribone-api";
```

Jalankan development server
```
npm install
# then
npm run dev
```

### 👋 Contributing

 *Feel free to contribute to this project*
 __Bersama-sama kita bangun Teknologi Rekayasa Internet menjadi lebih baik lagi__
 
### 💕 Thanks to all Teknologi Rekayasa Internet Family
