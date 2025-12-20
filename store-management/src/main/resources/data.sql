-- Insert default USER role if it doesn't exist
INSERT INTO role (id, name, created_date) 
SELECT 1, 'USER', NOW()
WHERE NOT EXISTS (SELECT 1 FROM role WHERE name = 'USER');

-- Insert ADMIN role if it doesn't exist
INSERT INTO role (id, name, created_date) 
SELECT 2, 'ADMIN', NOW()
WHERE NOT EXISTS (SELECT 1 FROM role WHERE name = 'ADMIN');
