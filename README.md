# ระบบขายหน้าร้านและจัดการสต๊อกสินค้า (POS & Stock Management System)

ระบบเว็บแอปพลิเคชันบริหารจัดการการขายหน้าร้าน (Point of Sale) และคลังสินค้า (Inventory Management) แบบครบวงจร ออกแบบ UI ทันสมัย ใช้งานง่าย รองรับภาษาไทย 100% สามารถเปิดใช้งานได้ทันทีบนเว็บเบราว์เซอร์ทุกชนิด (Chrome, Edge, Safari, Firefox) โดยไม่ต้องติดตั้งโปรแกรมหรือเซิร์ฟเวอร์เพิ่มเติม

---

## 🚀 วิธีการเปิดใช้งาน (Quick Start)

1. เข้าไปที่โฟลเดอร์โครงการ `ว4`
2. ดับเบิ้ลคลิกที่ไฟล์ **`index.html`** หรือคลิกขวาแล้วเลือก **Open with Google Chrome / Microsoft Edge**
3. ระบบจะเปิดขึ้นมาพร้อมข้อมูลตัวอย่าง (Sample Data) ให้สามารถทดลองขายและจัดการสต๊อกได้ทันที

---

## 🌟 ฟังก์ชันหลักของระบบ (Key Features)

### 1. 📊 แดชบอร์ดภาพรวมและการเงิน (Financial & Stock Dashboard)
- **การเงินและความคุ้มค่าแบบ Real-time**:
  - **ยอดขายรวม**: คำนวณยอดขายตามช่วงเวลา พร้อมจำนวนบิลที่สำเร็จ
  - **ราคาต้นทุน (Cost of Goods Sold)**: คำนวณต้นทุนสินค้าที่ขายได้จริงตามประวัติการขาย
  - **กำไรสุทธิ (Net Profit)**: คำนวณกำไรจากการขายสุทธิ (ยอดขาย - ต้นทุน) พร้อมแสดงอัตรากำไร (% Profit Margin)
  - **สต๊อกคงคลังและแจ้งเตือน**: ดูจำนวนคงเหลือ, จำนวนชนิดสินค้า, มูลค่าเงินทุนที่จมในสต๊อก และจำนวนสินค้าที่ต้องเติมด่วน
- **ตัวเลือกกรองช่วงเวลา (Period Filter Dropdown)**: สามารถสลับดูสรุปยอดและวิเคราะห์กราฟได้ 4 รูปแบบ:
  - 📅 **วันนี้ (Today)**
  - 📆 **รายอาทิตย์ (7 วันล่าสุด - Weekly)**
  - 🗓️ **รายเดือน (30 วันล่าสุด - Monthly)**
  - 📈 **ยอดรวมทั้งหมด (All Time)**
- **กราฟวิเคราะห์ยอดขายและกำไร (Sales & Profit Comparison Chart)**: กราฟแท่งคู่เปรียบเทียบยอดขาย (สีคราม) กับกำไรสุทธิ (สีเขียว) ตามช่วงเวลาที่เลือก
- **กราฟสัดส่วนหมวดหมู่ (Category Doughnut Chart)**: ดูสัดส่วนสินค้าแต่ละกลุ่ม
- **รายการแจ้งเตือนสต๊อกด่วน**: แจ้งเตือนสินค้าที่เหลือน้อยกว่าจุดสั่งซื้อซ้ำ (Reorder point) พร้อมปุ่มกดเติมสต๊อกทันที

### 2. 🛒 จุดขายหน้าร้าน (Point of Sale - POS)
- **สแกนบาร์โค้ดผ่านกล้อง (Camera Barcode & QR Scanner)**: กดปุ่มสแกนเพื่อเปิดกล้องมือถือ/เว็บแคม สแกนสินค้าลงบิลได้ทันที พร้อมเสียง Beep แจ้งเตือน
- **ค้นหา & บาร์โค้ด**: ค้นหาตามชื่อสินค้า หรือจำลองการยิงบาร์โค้ด (กด Enter เพื่อเพิ่มลงตะกร้าอัตโนมัติ)
- **โหมดใช้งานบนมือถือ (Mobile Friendly)**:
  - สลับระหว่างมุมมอง "เลือกสินค้า" และ "ตะกร้าบิล" ได้อย่างสะดวก
  - แถบสรุปยอดตะกร้าลอยด้านล่าง (Floating Cart Bar) สำหรับแตะเพื่อเปิดบิลชำระเงินได้ทันที
- **กรองตามหมวดหมู่**: คลิกเลือกดูเฉพาะหมวดหมู่ที่ต้องการ
- **ระบบตะกร้าสินค้า (Cart)**:
  - เพิ่ม/ลดจำนวนสินค้า ตรวจสอบสต๊อกคงเหลือแบบ Real-time (ป้องกันการขายเกินสต๊อก)
  - กำหนดส่วนลดเงินสด (Discount)
  - สลับเปิด/ปิด การคิดภาษีมูลค่าเพิ่ม (VAT 7%)
  - คำนวณยอดสุทธิอัตโนมัติ
- **ระบบชำระเงิน (Checkout Modal)**:
  - **เงินสด**: มีปุ่มลัดธนบัตร (฿20, ฿50, ฿100, ฿500, ฿1,000, พอดีเป๊ะ) พร้อมคำนวณเงินทอนอัตโนมัติ
  - **QR Code พร้อมเพย์**: แสดงยอดชำระสำหรับสแกนจ่าย
  - **บัตรเครดิต / โอนเงิน**
- **สลิปใบเสร็จรับเงิน (Receipt)**: ดีไซน์มาตรฐานขนาด 80mm รองรับการกด **สั่งพิมพ์ใบเสร็จ (Print)** ออกเครื่องพิมพ์ความร้อนหรือบันทึกเป็น PDF ได้ทันที

### 3. 📦 จัดการคลังสินค้า (Inventory & Stock Control)
- **ปุ่มสแกนบาร์โค้ดด้วยกล้อง**: สแกนที่ตัวสินค้าเพื่อค้นหาในสต๊อกได้ทันที (ไม่ต้องพิมพ์)
- **มุมมองการ์ดสินค้าสำหรับมือถือ (Mobile Card View)**: ปรับการแสดงผลเป็นการ์ดขนาดกะทัดรัด อ่านง่าย สัมผัสสะดวกบนจอมือถือ พร้อมสลับเป็นมุมมองตารางได้ตลอดเวลา
- ตารางแสดงรายการสินค้าพร้อมรูปภาพ/ไอคอน, รหัส SKU, บาร์โค้ด, ราคาทุน, ราคาขาย, กำไรต่อชิ้น (Profit Margin)
- แสดงป้ายสถานะสต๊อก (พร้อมขาย = เขียว, ใกล้หมด = ส้ม, หมดสต๊อก = แดง)
- **เพิ่ม / แก้ไข / ลบสินค้า**: จัดการข้อมูลสินค้าได้สะดวกรวดเร็ว (พร้อมปุ่มสแกนบาร์โค้ดเข้าฟอร์มอัตโนมัติ)
- **ส่งออกข้อมูล (Export CSV)**: ส่งออกข้อมูลสต๊อกทั้งหมดไปเปิดใช้งานใน Microsoft Excel หรือ Google Sheets

### 4. 📥 รับสินค้าเข้าสต๊อก (Stock In / สั่งซื้อเข้า)
- **สแกนเลือกสินค้า**: ใช้กล้องสแกนบาร์โค้ดกล่องสินค้าเพื่อเลือกรายการรับเข้าสต๊อกอัตโนมัติ
- บันทึกการรับสินค้าเข้าคลังเพื่อเพิ่มจำนวนคงเหลือ
- ปรับปรุงราคาทุนต่อหน่วยรอบใหม่
- ระบุซัพพลายเออร์, เลขที่ใบส่งสินค้า/ใบสั่งซื้อ (PO No.) และหมายเหตุ
- สต๊อกสินค้าจะถูกบวกเพิ่มอัตโนมัติ พร้อมบันทึกประวัติการรับเข้า

### 5. 📱 ออกแบบพิเศษสำหรับการใช้งานบนสมาร์ตโฟน (Mobile Optimized)
- **แถบเมนูด้านล่าง (Mobile Bottom Navigation Bar)**: สลับหน้าทำงาน (ภาพรวม, POS, คลังสต๊อก, รับเข้า) ได้สะดวกด้วยนิ้วโป้ง พร้อมปุ่มสแกนบาร์โค้ดกล้องกลมตรงกลาง
- **เมนูด้านข้างแบบสไลด์ (Drawer Menu)**: กดเปิดผ่านปุ่ม Hamburger (☰) พร้อมหน้ากากมืดป้องกันการกดพลาด
- **เสียง Beep สังเคราะห์**: ส่งเสียงเตือนเวลาสแกนสำเร็จเหมือนเครื่อง POS จริง โดยไม่ต้องโหลดไฟล์เสียงภายนอก
- **การสลับกล้องหน้า-หลัง**: รองรับการใช้งานกล้องหลังของมือถือเพื่อความคมชัดสูงสุดในการจับบาร์โค้ด

### 6. 🧾 ประวัติและรายงาน (History & Movement Log)
- **ประวัติการขาย (Orders History)**: ดูประวัติการเปิดบิลย้อนหลัง และกดเปิดดู/พิมพ์ใบเสร็จซ้ำได้
- **ความเคลื่อนไหวสต๊อก (Stock Movement Log)**: บันทึกทุกความเคลื่อนไหวอย่างโปร่งใส (ขายออก, รับเข้า, แก้ไขปรับปรุงสต๊อก)

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **HTML5 & CSS3**: โครงสร้าง Semantic HTML และ Responsive Web Design
- **Tailwind CSS**: การจัดสไตล์อินเทอร์เฟซที่ทันสมัย คลีน สบายตา
- **Google Fonts (Prompt)**: ฟอนต์สไตล์โมเดิร์น อ่านง่าย เข้ากับภาษาไทย
- **Font Awesome 6**: ไอคอนมาตรฐานสากล
- **Chart.js**: กราฟแสดงผลสถิติ Interactive
- **LocalStorage API**: บันทึกข้อมูลลงเบราว์เซอร์อัตโนมัติ ข้อมูลไม่หายเมื่อรีเฟรชหน้าเว็บ

---

## 🗄️ โครงสร้างฐานข้อมูลสำหรับต่อยอด (Database Schema)

หากต้องการนำระบบนี้ไปเชื่อมต่อฐานข้อมูลจริง เช่น **MySQL, PostgreSQL, Supabase, SQLite** สามารถนำโครงสร้างตารางด้านล่างไปใช้งานได้ทันที:

```sql
-- 1. ตารางสินค้า (products)
CREATE TABLE products (
    id VARCHAR(36) PRIMARY KEY,
    sku VARCHAR(50) UNIQUE NOT NULL,
    barcode VARCHAR(50),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    unit VARCHAR(50) DEFAULT 'ชิ้น',
    cost DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    stock INT NOT NULL DEFAULT 0,
    min_stock INT NOT NULL DEFAULT 5,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. ตารางบิลการขาย (orders)
CREATE TABLE orders (
    id VARCHAR(50) PRIMARY KEY, -- เช่น RC-2026-0001
    subtotal DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) DEFAULT 0.00,
    vat DECIMAL(10, 2) DEFAULT 0.00,
    grand_total DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('cash', 'promptpay', 'card') NOT NULL,
    cash_received DECIMAL(10, 2) DEFAULT 0.00,
    cash_change DECIMAL(10, 2) DEFAULT 0.00,
    cashier_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. ตารางรายการสินค้าในบิล (order_items)
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    qty INT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 4. ตารางบันทึกการเคลื่อนไหวสต๊อก (stock_movements)
CREATE TABLE stock_movements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(36) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'ขายหน้าร้าน', 'รับเข้าสินค้า', 'ปรับยอด'
    change_qty INT NOT NULL, -- เช่น -2 หรือ +20
    balance_qty INT NOT NULL,
    cost_per_unit DECIMAL(10, 2),
    ref_doc VARCHAR(100), -- อ้างอิงเลขบิลขาย หรือ เลข PO
    supplier VARCHAR(255),
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

---

## 💡 ปุ่มพิเศษในระบบ
- **ปุ่ม "คืนค่าข้อมูลตัวอย่าง" (Reset Sample Data)**: อยู่บริเวณมุมซ้ายล่างของแถบเมนู (Sidebar) สามารถกดเพื่อรีเซ็ตข้อมูลทดสอบให้กลับมาเริ่มต้นใหม่ได้ตลอดเวลา
- **ปุ่ม "Export CSV"**: อยู่ในหน้าคลังสินค้า เพื่อดาวน์โหลดข้อมูลสต๊อกทั้งหมดไปใช้งานต่อ
