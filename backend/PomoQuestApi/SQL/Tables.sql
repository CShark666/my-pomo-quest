CREATE TABLE Users (
    Id TEXT PRIMARY KEY,
    Email TEXT NOT NULL UNIQUE,
    PasswordHash TEXT NOT NULL,
    CreatedAt DATETIME NOT NULL,
    IsActive BOOLEAN NOT NULL DEFAULT 1
);

CREATE TABLE Sessions (
    Id TEXT PRIMARY KEY,
    UserId TEXT NOT NULL,
    TokenHash TEXT NOT NULL,
    CreatedAt DATETIME NOT NULL,
    ExpiresAt DATETIME NOT NULL,
    RevokedAt DATETIME,
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);

CREATE INDEX IX_Sessions_UserId
ON Sessions(UserId);