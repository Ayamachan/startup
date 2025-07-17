// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');

const authController = {};

authController.register = (req, res) => {
  const { fullname, email, password, phone, gender, country, wilaya, user_type } = req.body;

  // التحقق من وجود جميع الحقول
  if (!fullname || !email || !password || !phone || !gender || !country || !wilaya) {
    return res.status(400).json({ message: 'الرجاء ملء جميع الحقول المطلوبة.' });
  }

  // يمكنك إضافة المزيد من عمليات التحقق هنا (مثل التحقق من صحة البريد الإلكتروني)

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'حدث خطأ أثناء تشفير كلمة المرور.' });
    }

    const newUser = {
      fullname: fullname,
      email: email,
      password: hashedPassword,
      phone: phone,
      gender: gender,
      country: country,
      wilaya: wilaya,
      user_type: user_type,
      //user_type: 'Patient' // يمكنك تعديل هذا بناءً على الواجهة
    };

    User.create(newUser, (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'هذا البريد الإلكتروني مسجل بالفعل.' });
        }
        console.error('Error creating user:', err);
        return res.status(500).json({ message: 'حدث خطأ أثناء إنشاء المستخدم.' });
      }
      return res.status(201).json({ message: 'تم إنشاء حسابك بنجاح!' });
    });
  });
};

authController.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'الرجاء إدخال البريد الإلكتروني وكلمة المرور.' });
  }

  User.findByEmail(email, (err, user) => {
    if (err) {
      console.error('Error finding user:', err);
      return res.status(500).json({ message: 'حدث خطأ أثناء تسجيل الدخول.' });
    }
    if (!user) {
      return res.status(401).json({ message: 'بريد إلكتروني أو كلمة مرور غير صحيحة.' });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ message: 'حدث خطأ أثناء تسجيل الدخول.' });
      }
      if (isMatch) {
        // يمكنك هنا إنشاء رمز JWT لتسجيل الدخول بشكل آمن
        return res.status(200).json({ message: 'تم تسجيل الدخول بنجاح!', userId: user.id });
      } else {
        return res.status(401).json({ message: 'بريد إلكتروني أو كلمة مرور غير صحيحة.' });
      }
    });
  });
};

module.exports = authController;