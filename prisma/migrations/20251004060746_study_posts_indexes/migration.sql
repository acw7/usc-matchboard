-- This is an empty migration.
CREATE INDEX IF NOT EXISTS studypost_goals_gin      ON "StudyPost" USING GIN ("goals");
CREATE INDEX IF NOT EXISTS studypost_days_gin       ON "StudyPost" USING GIN ("preferredDays");
CREATE INDEX IF NOT EXISTS studypost_timeblocks_gin ON "StudyPost" USING GIN ("timeBlocks");