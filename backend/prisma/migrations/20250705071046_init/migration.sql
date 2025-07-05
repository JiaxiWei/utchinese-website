-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title_en" TEXT NOT NULL,
    "title_zh" TEXT NOT NULL,
    "description_en" TEXT NOT NULL,
    "description_zh" TEXT NOT NULL,
    "imageUrl" TEXT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "location_en" TEXT,
    "location_zh" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "link" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "role" TEXT NOT NULL DEFAULT 'staff',
    "canManageEvents" BOOLEAN NOT NULL DEFAULT false,
    "canReviewProfiles" BOOLEAN NOT NULL DEFAULT false,
    "canManageStaff" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "lastLogin" DATETIME
);

-- CreateTable
CREATE TABLE "StaffProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "staffId" INTEGER NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_zh" TEXT NOT NULL,
    "position_en" TEXT NOT NULL,
    "position_zh" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "bio_en" TEXT,
    "bio_zh" TEXT,
    "avatarUrl" TEXT,
    "email" TEXT,
    "linkedin" TEXT,
    "github" TEXT,
    "wechat" TEXT,
    "phone" TEXT,
    "mbti" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "reviewedAt" DATETIME,
    "reviewedBy" TEXT,
    "reviewNote" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isVisible" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "StaffProfile_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StaffProfileHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "staffId" INTEGER NOT NULL,
    "profileData" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "actionBy" TEXT,
    "actionNote" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Staff_username_key" ON "Staff"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_email_key" ON "Staff"("email");

-- CreateIndex
CREATE UNIQUE INDEX "StaffProfile_staffId_key" ON "StaffProfile"("staffId");
