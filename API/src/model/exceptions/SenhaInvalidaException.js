export default class SenhaInvalidaException extends Error{

    constructor(mensagem) {
        super(mensagem)
        this.name = "SenhaInvalidaException"
    }
}