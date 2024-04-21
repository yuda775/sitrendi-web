-- CreateTable
CREATE TABLE "lembaga" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "namaLembaga" TEXT NOT NULL,
    "jenjangPendidikan" TEXT NOT NULL,
    "alamatLembaga" TEXT NOT NULL,
    "namaPetugas" TEXT NOT NULL,
    "emailPetugas" TEXT NOT NULL,
    "teleponPetugas" TEXT NOT NULL,
    "statusImplementasi" TEXT NOT NULL,
    "kodeBooking" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
