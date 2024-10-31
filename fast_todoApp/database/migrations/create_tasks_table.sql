CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    dueDate DATE NOT NULL,
    priority ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'low'
);
