CREATE TABLE karyawan (
    _id CHAR(36) NOT NULL,
    fullName VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    position VARCHAR(100),
    department VARCHAR(100),
    role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    avatarUrl TEXT,
    csrfToken CHAR(64),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_karyawan_username (username),
    UNIQUE KEY uq_karyawan_email (email),
    UNIQUE KEY uq_karyawan_csrf (csrfToken)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

