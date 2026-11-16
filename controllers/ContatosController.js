import Contato from "../models/Contato.js";

const listar = async (req, res) => {
    try {
        const contatos = await Contato.findAll({ order: [["createdAt", "DESC"]] });
        res.render("contatos/contatos", { contatos });
    } catch (error) {
        console.error("Erro ao listar contatos:", error);
        res.status(500).send("Erro ao listar contatos.");
    }
}

const novo = (req, res) => {
    res.render("contatos/new");
}

const salvar = async (req, res) => {
    try {
        const { nome, email, telefone } = req.body;
        await Contato.create({ nome, email, telefone });
        req.flash("success", "Contato criado com sucesso!");
        res.redirect("/contatos");
    } catch (error) {
        console.error("Erro ao salvar contato:", error);
        res.status(500).send("Erro ao salvar contato.");
    }
}

// Recupera o contato pelo id e exibe o formulário de edição
const editar = async (req, res) => {
    try {
        const contato = await Contato.findByPk(req.params.id);

        if (!contato) {
            req.flash("error", "Contato não encontrado.");
            return res.redirect("/contatos");
        }

        res.render("contatos/edit", { contato });
    } catch (error) {
        console.error("Erro ao recuperar contato:", error);
        res.status(500).send("Erro ao recuperar contato.");
    }
}

const atualizar = async (req, res) => {
    try {
        const contatoId = req.params.id || req.body.id;
        const { nome, email, telefone } = req.body;

        const contato = await Contato.findByPk(contatoId);

        if (!contato) {
            req.flash("error", "Contato não encontrado.");
            return res.redirect("/contatos");
        }

        await contato.update({ nome, email, telefone });
        req.flash("success", "Contato atualizado com sucesso!");
        res.redirect("/contatos");
    } catch (error) {
        console.error("Erro ao atualizar contato:", error);
        res.status(500).send("Erro ao atualizar contato.");
    }
}

const excluir = async (req, res) => {
    try {
        const contato = await Contato.findByPk(req.params.id);

        if (!contato) {
            req.flash("error", "Contato não encontrado.");
            return res.redirect("/contatos");
        }

        await contato.destroy();
        req.flash("success", "Contato excluído com sucesso!");
        res.redirect("/contatos");
    } catch (error) {
        console.error("Erro ao excluir contato:", error);
        res.status(500).send("Erro ao excluir contato.");
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
