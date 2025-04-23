-- migrate:up
ALTER TABLE tasks ADD status TEXT NOT NULL CHECK (status IN ('to do', 'doing', 'done'));

-- migrate:down
ALTER TABLE tasks DROP COLUMN status;
