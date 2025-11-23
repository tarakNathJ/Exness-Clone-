CREATE TYPE "public"."tread_type" AS ENUM('long', 'short');--> statement-breakpoint
CREATE TABLE "account_balance" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "account_balance_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"balance" double precision NOT NULL,
	"symbol" varchar(50) NOT NULL,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE "tread" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tread_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"price" double precision NOT NULL,
	"symbol" varchar(50) NOT NULL,
	"user_id" integer,
	"tread_type" "tread_type" NOT NULL,
	"quantity" double precision NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tread_history" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tread_history_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"stream" varchar(50) NOT NULL,
	"e" varchar(50) NOT NULL,
	"E" bigint NOT NULL,
	"s" varchar(20) NOT NULL,
	"p" double precision NOT NULL,
	"P" double precision NOT NULL,
	"w" double precision NOT NULL,
	"x" double precision NOT NULL,
	"c" double precision NOT NULL,
	"Q" double precision NOT NULL,
	"b" double precision NOT NULL,
	"B" double precision NOT NULL,
	"a" double precision NOT NULL,
	"A" double precision NOT NULL,
	"o" double precision NOT NULL,
	"h" double precision NOT NULL,
	"l" double precision NOT NULL,
	"v" double precision NOT NULL,
	"q" double precision NOT NULL,
	"O" bigint NOT NULL,
	"C" bigint NOT NULL,
	"F" bigint NOT NULL,
	"L" bigint NOT NULL,
	"n" bigint NOT NULL,
	created_at TIMESTAMPTZ GENERATED ALWAYS AS (TO_TIMESTAMP(E/1000)) STORED
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account_balance" ADD CONSTRAINT "account_balance_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tread" ADD CONSTRAINT "tread_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;



SELECT create_hypertable("tread_history" ,"created_at");

CREATE INDEX idx_tread_history_symbol_time on public.tread_history(s , created_at DESC);
CREATE MATERIALIZED VIEW mv_tread_1min
WITH (timescaledb.continuous) as 
SELECT 
	s AS symbol,
	time_bucket("1 minute" , created_at) AS bucket,
	AVG(p) AS avg_price,
    SUM(v) AS total_volume,
    COUNT(*) AS trades_count

FROM public.tread_history
GROUP BY symbol , bucket
WITH NO DATA;

REFRESH MATERIALIZED VIEW mv_tread_1min;

CREATE MATERIALIZED VIEW mv_tread_5min
WITH (timescaledb.continuous) as 
SELECT 
	s AS symbol,
	time_bucket("5 minute" , created_at) AS bucket,
	AVG(p) AS avg_price,
    SUM(v) AS total_volume,
    COUNT(*) AS trades_count

FROM public.tread_history
GROUP BY symbol , bucket
WITH NO DATA;


REFRESH MATERIALIZED VIEW mv_tread_5min;

CREATE MATERIALIZED VIEW mv_tread_30min
WITH (timescaledb.continuous) as 
SELECT 
	s AS symbol,
	time_bucket("30 minute" , created_at) AS bucket,
	AVG(p) AS avg_price,
    SUM(v) AS total_volume,
    COUNT(*) AS trades_count

FROM public.tread_history
GROUP BY symbol , bucket
WITH NO DATA;


REFRESH MATERIALIZED VIEW mv_tread_30min;

