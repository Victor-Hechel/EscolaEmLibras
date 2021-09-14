export default class ExtensaoInvalidaException extends Error{

    constructor(mensagem) {
        super(mensagem)
        this.name = "ExtensaoInvalidaException"
    }
}