-- Deploy sepraps:create_table_log_request to pg
BEGIN;

--
-- Create model LogRequest
--
CREATE TABLE "log_request" (
    "id" bigserial NOT NULL PRIMARY KEY,
    "endpoint" text NOT NULL,
    "username" varchar(150) NULL,
    "response_code" smallint NOT NULL CHECK ("response_code" >= 0),
    "method" varchar(10) NULL,
    "remote_address" varchar(20) NULL,
    "exec_time" integer NULL,
    "date" timestamp with time zone NOT NULL
);

COMMIT;
