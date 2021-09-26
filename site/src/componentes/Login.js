import React from 'react';
import AutenticacaoContext from '../contextos/autenticacao';

class Login extends React.Component {

    static contextType = AutenticacaoContext

    constructor(props) {
        super(props)
        this.state = {
            login: '',
            senha: '',
            erro: '',
            inputDisabled: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault()

        this.setState({
            inputDisabled: true
          });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.login,
                senha: this.state.senha
            })
        }

        const response = await fetch('http://www.localhost:3002/login', requestOptions)

        let erroMensagem

        if(response.status === 404) {
            erroMensagem = "Usuário não existe"
        }else if(response.status === 401) {
            erroMensagem = "Senha inválida"
        }else if(response.status === 500) {
            erroMensagem = "Erro inesperado"
        }else{
            const responseBody = await response.json()
            this.context.Logar(responseBody.accessToken)
            return
        }

        this.setState({
            inputDisabled: false,
            erro: erroMensagem
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    render () {
        return (
            <div className="container text-center">
                <main className="form-signin">
                    <form onSubmit={this.handleSubmit}>
                        <h1 className="h3 mb-3 fw-normal">Escola em Libras</h1>
                        
                        {
                            this.state.erro && 
                            <div className="alert alert-danger" role="alert">
                                {this.state.erro}
                            </div>
                        }

                        <div className="form-floating">
                            <input type="email" name="login" className="form-control" id="floatingInput" placeholder="name@example.com" value={this.state.login} onChange={this.handleInputChange}/>
                            <label htmlFor="floatingInput">Email</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" name="senha" className="form-control" id="floatingPassword" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} />
                            <label htmlFor="floatingPassword">Senha</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={this.state.inputDisabled ? "disabled": ""}>Sign in</button>
                    </form>
                </main>
            </div>
        )
    }
}

export default Login