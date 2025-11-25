ALTER TABLE "tread_history" ADD COLUMN "created_at" timestamp;--> statement-breakpoint
ALTER TABLE "account_balance" ADD CONSTRAINT "account_balance_symbol_user_id_unique" UNIQUE("symbol","user_id");