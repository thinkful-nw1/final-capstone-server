BEGIN;

TRUNCATE
  users
  RESTART IDENTITY CASCADE;

INSERT INTO users (email, username, password) 
  VALUES
  ('testuser@gmail.com', 'testuser', '$2a$12$QUHCYSD.c0cGyHMzgrGyl.1v4hV0Th0NXGZLGpqdJeAhWzgisb6MG'),
  ('sheba.m.mathew@gmail.com', 'shebamathew',  '$2a$12$fx4BFJnLVKRnVWGgdLFHx.oCj5abDrjAuZQcVhIPm8KG0ih8UkDg2'),
  ('jordanepps@gmail.com', 'jordanepps', '$2a$12$tR.Zs7/TgyzJvmY4mw4oZuzlNG5tzGl2nd7dnN1ihhNa7vfhLDXBe');

COMMIT;