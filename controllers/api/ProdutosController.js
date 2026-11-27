import Produto from "../../models/Produto.js";

// GET /api/produtos
const listar = async (req, res) => {
    try {
        const produtos = await Produto.findAll({ order: [["referencia", "ASC"]] }); res.json(produtos);
    } catch (error) {
        console.error("Erro ao listar produtos:", error);
        res.status(500).json({ erro: "Erro ao listar produtos." });
    }
}

// GET /api/produtos/:id
const buscar = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);

        if (!produto) {
            return res.status(404).json({ erro: "Produto não encontrado." });
        }

        res.json(produto);
    } catch (error) {
        console.error("Erro ao recuperar produto:", error);
        res.status(500).json({ erro: "Erro ao recuperar produto." });
    }
}

// POST /api/produtos
const salvar = async (req, res) => {
    try {
        const { referencia, descricao, preco, estoque } = req.body;
        const produto = await Produto.create({ referencia, descricao, preco, estoque });
        res.status(201).json(produto);
    } catch (error) {
        console.error("Erro ao salvar produto:", error);
        res.status(500).json({ erro: "Erro ao salvar produto." });
    }
}

// PUT /api/produtos/:id
const atualizar = async (req, res) => {
    try {
        const { referencia, descricao, preco, estoque } = req.body;
        const produto = await Produto.findByPk(req.params.id);

        if (!produto) {
            return res.status(404).json({ erro: "Produto não encontrado." });
        }

        await produto.update({ referencia, descricao, preco, estoque });
        res.json(produto);
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        res.status(500).json({ erro: "Erro ao atualizar produto." });
    }
}

// DELETE /api/produtos/:id
const excluir = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);

        if (!produto) {
            return res.status(404).json({ erro: "Produto não encontrado." });
        }

        await produto.destroy();
        res.status(204).send({ message: "Produto excluído com sucesso." });
    } catch (error) {
        console.error("Erro ao excluir produto:", error);
        res.status(500).json({ erro: "Erro ao excluir produto." });
    }
}

export default {
    listar,
    buscar,
    salvar,
    atualizar,
    excluir
}
