import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import { z } from 'zod'

const app = fastify();
const prisma = new PrismaClient();

app.get('/products', async (req, res) => {
    const products = await prisma.products.findMany();
    return { products };
});

app.post('/products', async (req, res) => {
    const createProductSchema = z.object({
        nome: z.string(),
        descricao: z.string(),
        preco: z.number().int(),
        mainImg: z.string(),
        overviewImg: z.object({}),
        qntProdutos: z.number().int()
    });

    const { nome, descricao, preco, mainImg, overviewImg, qntProdutos } = createProductSchema.parse(req.body);

    await prisma.products.create({
        data: {
            nome,
            descricao,
            preco,
            mainImg,
            overviewImg,
            qntProdutos,
        }
    });

    return res.status(201).send();
});

app.get('/products/:id', async (req, res) => {
    const { id } = req.params as { id: string };
    const productId = String(parseInt(id));
    const product = await prisma.products.findUnique({
        where: {
            id: productId
        }
    });

    return { product };
});

app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(() => {
    console.log('Server is running')
});
