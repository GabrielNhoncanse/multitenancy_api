-- migrate:up
ALTER TABLE companies ADD COLUMN CNPJ TEXT NOT NULL UNIQUE;

-- migrate:down
ALTER TABLE companies DROP COLUMN CNPJ;
