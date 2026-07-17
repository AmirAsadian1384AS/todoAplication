# 📝 برنامه مدیریت کارهای روزانه (Todo Application)

این پروژه یک برنامه مدیریت کارهای روزانه (Todo App) است که با **Angular 19** و **Bootstrap 5** توسعه داده شده است. کاربران می‌توانند دسته‌بندی‌های مختلف ایجاد کرده و برای هر دسته، وظایف روزانه خود را ثبت و مدیریت کنند.

> **توجه:** این پروژه صرفاً با هدف آموزشی توسعه داده شده است. به دلیل عدم دسترسی به اینترنت هنگام پیاده‌سازی، برای ارتباط با پایگاه داده از **JSON Server (Local REST API)** استفاده شده است.

---

## ✨ امکانات پروژه

- ایجاد دسته‌بندی‌های مختلف
- ویرایش و حذف دسته‌بندی‌ها
- افزودن وظایف جدید برای هر دسته
- نمایش لیست وظایف هر دسته
- ویرایش و حذف وظایف
- پیاده‌سازی کامل عملیات CRUD
- اعتبارسنجی فرم‌ها (Form Validation)
- طراحی واکنش‌گرا (Responsive)
- رابط کاربری مدرن با Bootstrap 5
- ارتباط با Local REST API از طریق Angular HttpClient

---

## 🛠️ تکنولوژی‌های استفاده شده

- Angular 19
- TypeScript
- Bootstrap 5
- RxJS
- Angular HttpClient
- JSON Server (Local REST API)

---


# 🚀 نحوه اجرای پروژه

### 1. دریافت پروژه

```bash
git clone https://github.com/AmirAsadian1384AS/advanced-todo-app.git
```

### 2. ورود به پوشه پروژه

```bash
cd todoAplication
```

### 3. نصب وابستگی‌ها

```bash
npm install
```

### 4. اجرای Local API (JSON Server)

ابتدا مطمئن شوید که **JSON Server** روی سیستم نصب شده است:

```bash
npm install -g json-server
```

سپس در پوشه پروژه دستور زیر را اجرا کنید:

```bash
json-server.cmd --watch db.json
```

> **نکته:** اگر از PowerShell استفاده می‌کنید و با خطای مربوط به Execution Policy مواجه شدید، می‌توانید به جای دستور بالا از دستور زیر استفاده کنید:

```bash
npx json-server --watch db.json
```

پس از اجرای موفق، API روی آدرس زیر در دسترس خواهد بود:

```text
http://localhost:3000
```

### 5. اجرای پروژه Angular

در یک ترمینال جدید دستور زیر را اجرا کنید:

```bash
ng serve
```

سپس پروژه را در مرورگر از طریق آدرس زیر مشاهده کنید:

```text
http://localhost:4200
```

---

## 👨‍💻 توسعه‌دهنده

**امیر اسدیان**

توسعه‌دهنده Frontend | متخصص Angular
