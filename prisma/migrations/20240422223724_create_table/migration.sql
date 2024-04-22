-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" INTEGER NOT NULL,
    "mainImg" TEXT NOT NULL,
    "overviewImg" JSONB NOT NULL,
    "qntProdutos" INTEGER NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);
