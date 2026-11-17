import Usuario from "../../models/Usuario.js";

// GET /api/usuario
const listar = async (req, res) => {
    try {
        const usuario = await Usuario.findAll({ order: [["nome", "ASC"]] });
        res.json(usuario);
    } catch (error) {
        console.error("Erro ao listar usuario:", error);
        res.status(500).json({ erro: "Erro ao listar usuario." });
    }
}

// GET /api/usuario/:id
const buscar = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);

        if (!usuario) {
            return res.status(404).json({ erro: "Usuario não encontrado." });
        }

        res.json(usuario);
    } catch (error) {
        console.error("Erro ao recuperar usuario:", error);
        res.status(500).json({ erro: "Erro ao recuperar usuario." });
    }
}

// POST /api/usuario
const salvar = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const usuario = await Usuario.create({ nome, email, senha });
        res.status(201).json(usuario);
    } catch (error) {
        console.error("Erro ao salvar usuario:", error);
        res.status(500).json({ erro: "Erro ao salvar usuario." });
    }
}

// PUT /api/usuario/:id
const atualizar = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const usuario = await Usuario.findByPk(req.params.id);

        if (!usuario) {
            return res.status(404).json({ erro: "Usuario não encontrado." });
        }

        await usuario.update({ nome, email, senha });
        res.json(usuario);
    } catch (error) {
        console.error("Erro ao atualizar usuario:", error);
        res.status(500).json({ erro: "Erro ao atualizar usuario." });
    }
}

// DELETE /api/usuario/:id
const excluir = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);

        if (!usuario) {
            return res.status(404).json({ erro: "Usuario não encontrado." });
        }

        await usuario.destroy();
        res.status(204).send({ message: "Usuario excluído com sucesso." });
    } catch (error) {
        console.error("Erro ao excluir usuario:", error);
        res.status(500).json({ erro: "Erro ao excluir usuario." });
    }
}

export default {
    listar,
    buscar,
    salvar,
    atualizar,
    excluir
}
