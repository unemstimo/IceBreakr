BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "User" (
	"userId"	INTEGER NOT NULL UNIQUE,
	"username"	TEXT NOT NULL UNIQUE,
	"password"	TEXT NOT NULL,
	"administrator"	BOOLEAN,
	PRIMARY KEY("userId" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Game" (
	"gameId"	INTEGER NOT NULL UNIQUE,
	"userId"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	"estimate"	INTEGER NOT NULL,
	"rules"	TEXT NOT NULL,
	"description"	TEXT NOT NULL,
	FOREIGN KEY("userId") REFERENCES "User"("userId"),
	PRIMARY KEY("gameId" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Playlist" (
	"playlistId"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT NOT NULL,
	"userId"	INTEGER NOT NULL,
	FOREIGN KEY("userId") REFERENCES "User"("userId"),
	PRIMARY KEY("playlistId" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Category" (
	"categoryId"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT NOT NULL,
	PRIMARY KEY("categoryId" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "GameInCategory" (
	"gameId"	INTEGER NOT NULL,
	"categoryId"	INTEGER NOT NULL,
	FOREIGN KEY("categoryId") REFERENCES "Category"("categoryId"),
	FOREIGN KEY("gameId") REFERENCES "Game"("gameId"),
	PRIMARY KEY("categoryId","gameId")
);
CREATE TABLE IF NOT EXISTS "GameInPlaylist" (
	"gameId"	INTEGER NOT NULL,
	"playlistId"	INTEGER NOT NULL,
	PRIMARY KEY("gameId","playlistId"),
	FOREIGN KEY("playlistId") REFERENCES "Game"("gameId"),
	FOREIGN KEY("gameId") REFERENCES "Playlist"("playlistId")
);
CREATE TABLE IF NOT EXISTS "UserFavouritedGame" (
	"userId"	INTEGER NOT NULL,
	"gameId"	INTEGER NOT NULL,
	FOREIGN KEY("userId") REFERENCES "User"("userId"),
	PRIMARY KEY("userId","gameId"),
	FOREIGN KEY("gameId") REFERENCES "Game"("gameId")
);
CREATE TABLE IF NOT EXISTS "UserReportedGame" (
	"userId"	INTEGER NOT NULL,
	"gameId"	INTEGER NOT NULL,
	"reason"	TEXT,
	FOREIGN KEY("gameId") REFERENCES "Game"("gameId"),
	PRIMARY KEY("userId","gameId"),
	FOREIGN KEY("userId") REFERENCES "User"("userId")
);
CREATE TABLE IF NOT EXISTS "GameRating" (
	"ratingId"	INTEGER NOT NULL UNIQUE,
	"userId"	INTEGER NOT NULL,
	"gameId"	INTEGER NOT NULL,
	"starRating"	INTEGER NOT NULL,
	"reviewText"	TEXT NOT NULL,
	FOREIGN KEY("userId") REFERENCES "User"("userId"),
	FOREIGN KEY("gameId") REFERENCES "Game"("gameId"),
	PRIMARY KEY("ratingId" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "UserReportedRating" (
	"reporterId"	INTEGER NOT NULL,
	"ratingId"	INTEGER NOT NULL,
	"reason"	TEXT,
	FOREIGN KEY("ratingId") REFERENCES "GameRating"("ratingId"),
	PRIMARY KEY("reporterId"),
	FOREIGN KEY("reporterId") REFERENCES "User"("userId")
);
COMMIT;
