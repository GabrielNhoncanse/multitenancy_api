-- migrate:up
ALTER TABLE companies ADD COLUMN cnpj TEXT NOT NULL UNIQUE;

-- migrate:down
ALTER TABLE companies DROP COLUMN cnpj;
