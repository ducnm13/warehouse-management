## Danh mục hàng hóa

```sql
    CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

```

## Hàng hóa

```sql
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    category_id INT NOT NULL,
    unit VARCHAR(50),
    stock DECIMAL(15,2) DEFAULT 0,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

## Định mức nguyên liệu cho thành phẩm

```sql
CREATE TABLE product_recipe (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    material_id INT NOT NULL,
    quantity DECIMAL(15,4) NOT NULL, -- lượng nguyên liệu cho 1 đơn vị thành phẩm
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (material_id) REFERENCES products(id)
);
```

## Nhà cung cấp

```sql
CREATE TABLE suppliers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(20)
);
```

## Khách hàng

```sql
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(20)
);

```

## Nhân viên

```sql
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    status TINYINT DEFAULT 1,
    password_hash VARCHAR(255)
);
```

## Phiếu nhập

```sql
CREATE TABLE goods_receipts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    receipt_code VARCHAR(20) UNIQUE NOT NULL,
    date DATE NOT NULL,
    supplier_id INT,
    employee_id INT,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);
```

## Chi tiết phiếu nhập

```sql
CREATE TABLE goods_receipt_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    receipt_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity DECIMAL(15,2) NOT NULL,
    unit_price DECIMAL(15,2),
    FOREIGN KEY (receipt_id) REFERENCES goods_receipts(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

## Phiếu xuất

```sql
CREATE TABLE goods_issues (
    id INT AUTO_INCREMENT PRIMARY KEY,
    issue_code VARCHAR(20) UNIQUE NOT NULL,
    date DATE NOT NULL,
    customer_id INT,
    employee_id INT,
    reason VARCHAR(255),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);
```

## Chi tiết phiếu xuất

```sql
CREATE TABLE goods_issue_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    issue_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity DECIMAL(15,2) NOT NULL,
    FOREIGN KEY (issue_id) REFERENCES goods_issues(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

## Phiếu cân

```sql
CREATE TABLE scale_tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_code VARCHAR(20) UNIQUE NOT NULL,
    date DATE NOT NULL,
    employee_id INT NOT NULL,
    product_id INT NOT NULL, -- Thành phẩm cần sản xuất
    weight DECIMAL(15,2) NOT NULL, -- Số lượng thành phẩm cần sản xuất
    FOREIGN KEY (employee_id) REFERENCES employees(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

## Nguyên liệu dùng cho phiếu cân

```sql
CREATE TABLE scale_ticket_materials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    scale_ticket_id INT NOT NULL,
    material_id INT NOT NULL,
    quantity DECIMAL(15,2) NOT NULL,
    FOREIGN KEY (scale_ticket_id) REFERENCES scale_tickets(id),
    FOREIGN KEY (material_id) REFERENCES products(id)
);
```

```sql
-- Tạo Database
CREATE DATABASE warehouse_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE warehouse_db;

-- Bảng Danh mục hàng hóa
CREATE TABLE tbl_dmhanghoa (
    id_dm VARCHAR(50) PRIMARY KEY,
    ten_dm VARCHAR(255) NOT NULL COMMENT 'Tên danh mục: Thành phẩm, bao bì, nguyên liệu',
    mota VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

-- Bảng Hàng hóa
CREATE TABLE tbl_hanghoa (
    id VARCHAR(50) PRIMARY KEY,
    tenhanghoa VARCHAR(255) NOT NULL,
    id_dm VARCHAR(50) NOT NULL,
    dvt VARCHAR(50) NOT NULL,
    tonkho INT NOT NULL DEFAULT 0,
    FOREIGN KEY (id_dm) REFERENCES tbl_dmhanghoa(id_dm)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;

-- Bảng Phiếu nhập
CREATE TABLE tbl_phieunhap (
    id VARCHAR(50) PRIMARY KEY,
    ngaynhap DATE NOT NULL
) ENGINE=InnoDB;

-- Bảng Chi tiết phiếu nhập
CREATE TABLE tbl_ctphieunhap (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_nhanvien VARCHAR(50),
    id_phieunhap VARCHAR(50) NOT NULL,
    id_hanghoa VARCHAR(50) NOT NULL,
    soluong INT NOT NULL,
    mota VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_phieunhap) REFERENCES tbl_phieunhap(id)
        ON DELETE CASCADE,
    FOREIGN KEY (id_hanghoa) REFERENCES tbl_hanghoa(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- Bảng Phiếu xuất
CREATE TABLE tbl_phieuxuat (
    id VARCHAR(50) PRIMARY KEY,
    ngayxuat DATE NOT NULL,
    donvi INT,
    id_nhanvien VARCHAR(50)
) ENGINE=InnoDB;

-- Bảng Chi tiết phiếu xuất
CREATE TABLE tbl_ctphieuxuat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_phieuxuat VARCHAR(50) NOT NULL,
    id_hanghoa VARCHAR(50) NOT NULL,
    soluong INT NOT NULL,
    mota VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_phieuxuat) REFERENCES tbl_phieuxuat(id)
        ON DELETE CASCADE,
    FOREIGN KEY (id_hanghoa) REFERENCES tbl_hanghoa(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- Bảng Khách hàng
CREATE TABLE tbl_khachhang (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tendv VARCHAR(255) NOT NULL,
    diachi VARCHAR(255),
    sdt VARCHAR(20)
) ENGINE=InnoDB;

-- Bảng Nhân viên
CREATE TABLE tbl_nhanvien (
    id VARCHAR(50) PRIMARY KEY,
    ten VARCHAR(255) NOT NULL,
    password VARCHAR(255),
    role VARCHAR(50),
    status INT
) ENGINE=InnoDB;

-- Bảng Nhà cung cấp
CREATE TABLE tbl_ncc (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten VARCHAR(255),
    diachi VARCHAR(255),
    sdt VARCHAR(20)
) ENGINE=InnoDB;

-- Bảng Phiếu cân
CREATE TABLE tbl_phieucan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ngaycan DATE
) ENGINE=InnoDB;

-- Bảng Chi tiết phiếu cân
CREATE TABLE tbl_ctphieucan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_phieucan INT,
    id_hanghoa VARCHAR(50),
    khoiluong INT,
    FOREIGN KEY (id_phieucan) REFERENCES tbl_phieucan(id)
        ON DELETE CASCADE,
    FOREIGN KEY (id_hanghoa) REFERENCES tbl_hanghoa(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

```
