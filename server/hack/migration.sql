CREATE EXTENSION "uuid-ossp";

CREATE TABLE "categories" (
  "id" uuid DEFAULT uuid_generate_v4(), 
  "name" varchar(255), 
  PRIMARY KEY ("id")
);

CREATE TABLE "courses" (
  "id" uuid DEFAULT uuid_generate_v4(), 
  "title" text NOT NULL, 
  "description" text, 
  "image_url" text, 
  "price" decimal DEFAULT null, 
  "category_id" uuid, 
  "level" text, 
  "is_published" boolean NOT NULL DEFAULT false, 
  PRIMARY KEY ("id"), 
  CONSTRAINT "fk_courses_category" FOREIGN KEY ("category_id") REFERENCES "categories"("id")
);

CREATE TABLE "users" (
  "id" text, 
  "facebook_id" text, 
  "created_at" timestamptz, 
  "updated_at" timestamptz, 
  "deleted_at" timestamptz, 
  "username" varchar(20) NOT NULL, 
  "email" text NOT NULL, 
  "password_hash" text, 
  "is_verified" boolean DEFAULT false, 
  PRIMARY KEY ("id"), 
  CONSTRAINT "uni_users_facebook_id" UNIQUE ("facebook_id"), 
  CONSTRAINT "uni_users_username" UNIQUE ("username"), 
  CONSTRAINT "uni_users_email" UNIQUE ("email")
);

CREATE INDEX IF NOT EXISTS "idx_users_deleted_at" ON "users" ("deleted_at");

CREATE TABLE "user_courses" (
  "user_id" text, 
  "course_id" uuid DEFAULT uuid_generate_v4(), 
  PRIMARY KEY ("user_id", "course_id"), 
  CONSTRAINT "fk_user_courses_user" FOREIGN KEY ("user_id") REFERENCES "users"("id"), 
  CONSTRAINT "fk_user_courses_course" FOREIGN KEY ("course_id") REFERENCES "courses"("id")
);

CREATE TABLE "sections" (
  "id" uuid DEFAULT uuid_generate_v4(), 
  "course_id" uuid, 
  "title" varchar(255), 
  PRIMARY KEY ("id"), 
  CONSTRAINT "fk_courses_sections" FOREIGN KEY ("course_id") REFERENCES "courses"("id")
);

CREATE TABLE "chapters" (
  "id" uuid DEFAULT uuid_generate_v4(), 
  "title" varchar(255), 
  "description" varchar(1000), 
  "video_url" varchar(500), 
  "is_published" boolean, 
  "is_free" boolean, 
  PRIMARY KEY ("id")
);

CREATE TABLE "chart_data" (
  "id" uuid DEFAULT uuid_generate_v4(), 
  "name" text, 
  "value" bigint, 
  PRIMARY KEY ("id")
);

CREATE TABLE "purchases" (
  "id" uuid DEFAULT uuid_generate_v4(), 
  "created_at" timestamptz, 
  "updated_at" timestamptz, 
  "deleted_at" timestamptz, 
  "user_id" text, 
  "course_id" text, 
  PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "idx_purchases_deleted_at" ON "purchases" ("deleted_at");

CREATE TABLE "questions" (
  "id" uuid DEFAULT uuid_generate_v4(), 
  "created_at" timestamptz, 
  "updated_at" timestamptz, 
  "deleted_at" timestamptz, 
  "question_name" varchar(255), 
  "question_text" varchar(1000), 
  "status" varchar(50), 
  "default_mark" decimal, 
  "usage" bigint, 
  "question_data" jsonb, 
  PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "idx_questions_deleted_at" ON "questions" ("deleted_at");

CREATE TABLE "question_choices" (
  "id" uuid DEFAULT uuid_generate_v4(), 
  "question_id" uuid, 
  "text" varchar(255), 
  "grade_percent" decimal, 
  "feedback" varchar(1000), 
  PRIMARY KEY ("id"), 
  CONSTRAINT "fk_questions_question_choices" FOREIGN KEY ("question_id") REFERENCES "questions"("id"), 
  CONSTRAINT "fk_questions_student_responses" FOREIGN KEY ("question_id") REFERENCES "questions"("id")
);

CREATE TABLE "refresh_tokens" (
  "id" uuid, 
  "value" varchar(255) NOT NULL, 
  "expires_at" timestamptz NOT NULL, 
  "created_at" timestamptz NOT NULL DEFAULT current_timestamp, 
  "revoked_at" timestamptz, 
  "user_id" text NOT NULL, 
  PRIMARY KEY ("id"), 
  CONSTRAINT "fk_users_refresh_tokens" FOREIGN KEY ("user_id") REFERENCES "users"("id"), 
  CONSTRAINT "uni_refresh_tokens_value" UNIQUE ("value")
);

CREATE INDEX IF NOT EXISTS "idx_refresh_tokens_user_id" ON "refresh_tokens" ("user_id");

CREATE TABLE "student_responses" (
  "id" uuid DEFAULT uuid_generate_v4(), 
  "student_id" text, 
  "question_id" text, 
  "question_choice_id" uuid, 
  PRIMARY KEY ("id"), 
  CONSTRAINT "fk_users_question_choices" FOREIGN KEY ("student_id") REFERENCES "users"("id"), 
  CONSTRAINT "fk_question_choices_student_responses" FOREIGN KEY ("question_choice_id") REFERENCES "question_choices"("id")
);

CREATE TABLE "topics" (
  "id" uuid DEFAULT uuid_generate_v4(), 
  "section_id" uuid, 
  "title" varchar(255), 
  "type" varchar(50), 
  "url" text, 
  PRIMARY KEY ("id"), 
  CONSTRAINT "fk_sections_topics" FOREIGN KEY ("section_id") REFERENCES "sections"("id")
);

CREATE TABLE "user_progresses" (
  "id" uuid DEFAULT uuid_generate_v4(), 
  "user_id" text, 
  "chapter_id" uuid, 
  "is_completed" boolean NOT NULL DEFAULT false, 
  "completed_at" timestamptz DEFAULT null, 
  PRIMARY KEY ("id"), 
  CONSTRAINT "fk_users_user_progresses" FOREIGN KEY ("user_id") REFERENCES "users"("id"), 
  CONSTRAINT "fk_chapters_user_progress" FOREIGN KEY ("chapter_id") REFERENCES "chapters"("id")
);

CREATE TABLE "verify_tokens" (
  "id" bigserial, 
  "created_at" timestamptz, 
  "updated_at" timestamptz, 
  "deleted_at" timestamptz, 
  "token" varchar(255) NOT NULL, 
  "expires_at" timestamptz NOT NULL, 
  "user_id" text NOT NULL, 
  PRIMARY KEY ("id"), 
  CONSTRAINT "fk_users_verify_tokens" FOREIGN KEY ("user_id") REFERENCES "users"("id"), 
  CONSTRAINT "uni_verify_tokens_token" UNIQUE ("token")
);

CREATE INDEX IF NOT EXISTS "idx_verify_tokens_user_id" ON "verify_tokens" ("user_id");

CREATE INDEX IF NOT EXISTS "idx_verify_tokens_deleted_at" ON "verify_tokens" ("deleted_at");

CREATE TABLE "attached_files" (
  "id" uuid DEFAULT uuid_generate_v4(), 
  "course_id" uuid, 
  "cloud_url" varchar(500), 
  PRIMARY KEY ("id"), 
  CONSTRAINT "fk_courses_resources" FOREIGN KEY ("course_id") REFERENCES "courses"("id")
);

