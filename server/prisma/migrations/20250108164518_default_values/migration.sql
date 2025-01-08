-- AlterTable
CREATE SEQUENCE orders_id_seq;
ALTER TABLE "orders" ALTER COLUMN "id" SET DEFAULT nextval('orders_id_seq'),
ALTER COLUMN "status" SET DEFAULT 'PENDING';
ALTER SEQUENCE orders_id_seq OWNED BY "orders"."id";

-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "status" SET DEFAULT 'PENDING';
