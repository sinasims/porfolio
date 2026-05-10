// lib/db.ts
import mysql, { Pool } from 'mysql2/promise';

let pool: Pool | null = null;

async function initDatabaseAndTables(): Promise<void> {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    });

    const dbName = process.env.DB_NAME || 'task_manager_db';
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    console.log(`Database "${dbName}" is ready.`);
    await connection.query(`USE \`${dbName}\`;`);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS contacts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(50) NULL,
            subject VARCHAR(255) NULL,
            message TEXT NOT NULL,
            is_read BOOLEAN DEFAULT FALSE,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_created_at (created_at),
            INDEX idx_is_read (is_read)
        );
    `);
    console.log('Table "contacts" is ready.');

    await connection.query(`
        CREATE TABLE IF NOT EXISTS blog_posts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            upload_token CHAR(36) NULL,
            title VARCHAR(250) NOT NULL,
            en_title VARCHAR(250) NULL,
            slug VARCHAR(250) NOT NULL UNIQUE,
            excerpt TEXT NOT NULL,
            en_excerpt TEXT NULL,
            content LONGTEXT NOT NULL,
            en_content LONGTEXT NULL,
            image VARCHAR(500) NOT NULL,
            author VARCHAR(100) NOT NULL DEFAULT 'سینا رحمانی',
            en_author VARCHAR(100) NULL,
            publish_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            is_published BOOLEAN NOT NULL DEFAULT TRUE,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_slug (slug),
            INDEX idx_publish_date (publish_date),
            INDEX idx_is_published (is_published)
        );
    `);
    console.log('Table "blog_posts" is ready.');

    await connection.query(`
        CREATE TABLE IF NOT EXISTS projects (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(200) NOT NULL,
            en_title VARCHAR(200) NULL,
            description TEXT NOT NULL,
            en_description TEXT NULL,
            image VARCHAR(500) NOT NULL,
            tech_stack VARCHAR(500) NOT NULL,
            live_url VARCHAR(500) NULL,
            github_url VARCHAR(500) NULL,
            \`order\` INT NOT NULL DEFAULT 0,
            is_active BOOLEAN NOT NULL DEFAULT TRUE,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_order ( \`order\` ),
            INDEX idx_is_active (is_active)
        );
    `);
    console.log('Table "projects" is ready.');

    await connection.end();
}

export async function getDb(): Promise<Pool> {
    if (!pool) {
        await initDatabaseAndTables();
        pool = mysql.createPool({
            host: process.env.DB_HOST || '127.0.0.1',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'portfolio_db2',
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
            waitForConnections: true,
            connectionLimit: 10,
        });
    }
    return pool;
}