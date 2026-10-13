CREATE TABLE IF NOT EXISTS cats (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  age VARCHAR(80) NULL,
  gender VARCHAR(40) NULL,
  description TEXT NULL,
  image_url VARCHAR(2048) NULL,
  status ENUM('disponivel', 'em_tratamento', 'adotado') NOT NULL DEFAULT 'disponivel',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_cats_status_created (status, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS projects (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(160) NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(2048) NULL,
  display_order SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS donations (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  donor_name VARCHAR(160) NOT NULL,
  email VARCHAR(254) NOT NULL,
  phone VARCHAR(40) NULL,
  donation_type ENUM('financeira', 'racao', 'lar_temporario') NOT NULL,
  amount DECIMAL(10, 2) NULL,
  description TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_donations_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contact_messages (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  email VARCHAR(254) NOT NULL,
  subject VARCHAR(200) NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_contact_messages_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO projects (title, description, display_order)
SELECT 'Resgate e acolhimento', 'Resgatamos gatos em situação de vulnerabilidade e oferecemos cuidado e proteção.', 1
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'Resgate e acolhimento');

INSERT INTO projects (title, description, display_order)
SELECT 'Saúde e bem-estar', 'Promovemos atendimento veterinário, alimentação e recuperação para os gatos acolhidos.', 2
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'Saúde e bem-estar');

INSERT INTO projects (title, description, display_order)
SELECT 'Adoção responsável', 'Conectamos cada gato a uma família preparada para oferecer um lar seguro e permanente.', 3
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'Adoção responsável');
