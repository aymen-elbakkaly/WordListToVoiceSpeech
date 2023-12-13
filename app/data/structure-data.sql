DROP TABLE IF EXISTS "google_cloud_services", "request_to_google_cloud", "request_services", "determinant_data";

CREATE TABLE "google_cloud_services" (
    "id"            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"          TEXT NOT NULL,
    "package"       TEXT NOT NULL,
    "description"   TEXT NOT NULL,
    "limit"         INT NOT NULL DEFAULT 100,
    "created_at"    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at"    TIMESTAMPTZ
);

CREATE TABLE "request_to_google_cloud" (
    "id"            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "characters"    INT NOT NULL,
    "starting_at"   TIMESTAMPTZ,
    "ending_at"     TIMESTAMPTZ,
    "created_at"    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at"    TIMESTAMPTZ
);

CREATE TABLE "request_services" (
  request_id INT,
  service_id INT,
  FOREIGN KEY (request_id) REFERENCES request_to_google_cloud(id),
  FOREIGN KEY (service_id) REFERENCES google_cloud_services(id),
  PRIMARY KEY (request_id, service_id)
);

CREATE TABLE "determinant_data" (
    "id"            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "value"         TEXT NOT NULL,
    "created_at"    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at"    TIMESTAMPTZ
);

INSERT INTO "google_cloud_services" ("id", "name", "package", "description", "limit") OVERRIDING SYSTEM VALUE
VALUES (0, 'VisionAi', '@google-cloud/vision', SUBSTRING('Google Ai used here to provide a list of words from a image, For more information: https://cloud.google.com/vision' FROM 1 FOR 255), 1000),
(1, 'Text-To-Speech', '@google-cloud/text-to-speech', SUBSTRING('Google Ai used here to provide a list of voices from a list of words, For more information: https://cloud.google.com/text-to-speech' FROM 1 FOR 255), 1000);

/* Auto-increment problem on id with prisma if data is inserted manually */

/* INSERT INTO "request_to_google_cloud" ("id", "characters","starting_at", "ending_at") OVERRIDING SYSTEM VALUE
VALUES (0, 5, TO_TIMESTAMP(1702080652436/1000), TO_TIMESTAMP(1702080653757/1000)),
(1, 15, TO_TIMESTAMP(1702080694610/1000), TO_TIMESTAMP(1702080695244/1000)),
(2, 8, TO_TIMESTAMP(1702080728863/1000), TO_TIMESTAMP(1702080730117/1000));

INSERT INTO "request_services" (request_id, service_id)
VALUES (0, 0), (0, 1),
(1, 0),
(2, 1); */

INSERT INTO "determinant_data" ("id", "value", "updated_at") OVERRIDING SYSTEM VALUE
VALUES  
(0, 'une', NOW()),
(1, 'un', NOW()),
(2, 'le', NOW()),
(3, 'la', NOW()),
(4, 'se', NOW()),
(5, 'mon', NOW()),
(6, 'ton', NOW()),
(7, 'son', NOW()),
(8, 'notre', NOW()),
(9, 'votre', NOW()),
(10, 'leur', NOW()),
(11, 'ma', NOW()),
(12, 'ta', NOW()),
(13, 'sa', NOW()),
(14, 'mes', NOW()),
(15, 'tes', NOW()),
(16, 'ses', NOW()),
(17, 'nos', NOW()),
(18, 'vos', NOW()),
(19, 'leurs', NOW()),
(20, 'ce', NOW()),
(21, 'cet', NOW()),
(22, 'cette', NOW()),
(23, 'ces', NOW());