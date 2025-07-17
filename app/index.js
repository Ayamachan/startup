const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const authRoutes = require('./routes/auth');
const hospitalRoutes = require('./routes/hospitals');
const patientRoutes = require('./routes/patients');
const hotelRoutes = require('./routes/hotels');
const hospital = require('./models/Hospital');
require('dotenv').config();
const PORT = 3000;

// Middleware
app.use(cors({
  origin: "http://127.0.0.1:5500", // أو http://localhost:5500 حسب Live Server
    methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json()); // ضروري لفهم req.body
app.use(bodyParser.json());

//app.use((req, res, next) => {
  //console.log(`${req.method} ${req.url}`);
  //next();
//});

//  conexربط المسارات

app.use('/api/auth', authRoutes);
app.use('/api/hospitals', hospitalRoutes);
// ربط مسار معلومات المرضى
app.use('/api/patients', patientRoutes);
app.use('/api/hotels', hotelRoutes);
// rsvhopital 
// مثال على مسار Express
//app.post('/api/hospitals/search', (req, res) => {
  // منطق البحث هنا
  //res.json({ message: "Search result" }); // أو إرجاع البيانات المطلوبة
//});
// get hopital 
//app.get('/api/hospitals', (req, res) => {
  //db.query('SELECT * FROM hospitals', (err, results) => {
   // if (err) return res.status(500).send(err);
   //res.json({ hospitals: results }); // ✅ الآن الاستجابة ستكون: { "hospitals": [...] }

  //});
//});

// تشغيل الخادم
app.listen(3000, () => {
  console.log(`Server running on http://127.0.0.1:3000`);
});
