import Usuario from "../models/Usuario.js";

const listar = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({ order: [["createdAt", "DESC"]] });
        res.render("usuarios/usuarios", { usuarios });
    } catch (error) {
        console.error("Erro ao listar usuários:", error);
        res.status(500).send("Erro ao listar usuários.");
    }
}

const novo = (req, res) => {
    res.render("usuarios/new");
}

const salvar = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        await Usuario.create({ nome, email, senha });
        req.flash("success", "Usuario criado com sucesso!");
        res.redirect("/usuarios");
    } catch (error) {
        console.error("Erro ao salvar usuário:", error);
        res.status(500).send("Erro ao salvar usuário.");
    }
}

// Recupera o usuário pelo id e exibe o formulário de edição
const editar = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);

        if (!usuario) {
            req.flash("error", "Usuário não encontrado.");
            return res.redirect("/usuarios");
        }

        res.render("usuarios/edit", { usuario });
    } catch (error) {
        console.error("Erro ao recuperar usuário:", error);
        res.status(500).send("Erro ao recuperar usuário.");
    }
}

const atualizar = async (req, res) => {
    try {
        const usuarioId = req.params.id || req.body.id;
        const { nome, email, senha } = req.body;

        const usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            req.flash("error", "Usuário não encontrado.");
            return res.redirect("/usuarios");
        }

        await usuario.update({ nome, email, senha });
        req.flash("success", "Usuário atualizado com sucesso!");
        res.redirect("/usuarios");
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        res.status(500).send("Erro ao atualizar usuário.");
    }
}

const excluir = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);

        if (!usuario) {
            req.flash("error", "Usuário não encontrado.");
            return res.redirect("/usuarios");
        }

        await usuario.destroy();
        req.flash("success", "Usuário excluído com sucesso!");
        res.redirect("/usuarios");
    } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        res.status(500).send("Erro ao excluir usuário.");
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
