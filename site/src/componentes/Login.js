import React from 'react';
import AutenticacaoContext from '../contextos/autenticacao';

class Login extends React.Component {

    static contextType = AutenticacaoContext

    constructor(props) {
        super(props)
        this.state = {
            login: '',
            senha: '',
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
        console.log(Login.contextType)

        const response = await fetch('http://www.localhost:3002/login', requestOptions)

        if(response.status === 404) {
            console.log("Usuário não existe")
        }else if(response.status === 401) {
            console.log("Senha inválida")
        }else if(response.status === 500) {
            console.log("Erro inesperado")
        }else{
            const responseBody = await response.json()
            console.log("Tudo certo, seu token eh: ", responseBody)
            this.context.Logar(responseBody.accessToken)
        }

        this.setState({
            inputDisabled: false
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