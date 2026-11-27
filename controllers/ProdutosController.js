import Produto from "../models/Produto.js";

const listar = async (req, res) => {
    try {
        const produtos = await Produto.findAll({ order: [["createdAt", "DESC"]] });
        res.render("produtos/produtos", { produtos });
    } catch (error) {
        console.error("Erro ao listar produtos:", error);
        res.status(500).send("Erro ao listar produtos.");
    }
}

const novo = (req, res) => {
    res.render("produtos/new");
}

const salvar = async (req, res) => {
    try {
        const { referencia, descricao, preco, estoque } = req.body;
        await Produto.create({ referencia, descricao, preco, estoque });
        req.flash("success", "Produto criado com sucesso!");
        res.redirect("/produtos");
    } catch (error) {
        console.error("Erro ao salvar produto:", error);
        res.status(500).send("Erro ao salvar produto.");
    }
}

// Recupera o produto pelo id e exibe o formulário de edição
const editar = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);

        if (!produto) {
            req.flash("error", "Produto não encontrado.");
            return res.redirect("/produtos");
        }

        res.render("produtos/edit", { produto });
    } catch (error) {
        console.error("Erro ao recuperar produto:", error);
        res.status(500).send("Erro ao recuperar produto.");
    }
}

const atualizar = async (req, res) => {
    try {
        const produtoId = req.params.id || req.body.id;
        const { referencia, descricao, preco, estoque } = req.body;

        const produto = await Produto.findByPk(produtoId);

        if (!produto) {
            req.flash("error", "Produto não encontrado.");
            return res.redirect("/produtos");
        }

        await produto.update({ referencia, descricao, preco, estoque });
        req.flash("success", "Produto atualizado com sucesso!");
        res.redirect("/produtos");
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        res.status(500).send("Erro ao atualizar produto.");
    }
}

const excluir = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);

        if (!produto) {
            req.flash("error", "Produto não encontrado.");
            return res.redirect("/produtos");
        }

        await produto.destroy();
        req.flash("success", "Produto excluído com sucesso!");
        res.redirect("/produtos");
    } catch (error) {
        console.error("Erro ao excluir contato:", error);
        res.status(500).send("Erro ao excluir produto.");
    }
}

export default {
    listar,
    novo,
    salvar,
    editar,
    atualizar,
    excluir
}
