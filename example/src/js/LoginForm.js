import React, {Component, PropTypes} from 'react';

class LoginForm extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    login = () => {
        this.props.onLogin(this.state.email, this.state.password);
    }

    register = () => {
        this.props.onRegister(this.state.email, this.state.password);
    }

    toggleLogin = () => {
        this.setState({ showLogin: !this.state.showLogin });
    }

    render() {
        return this.state.showLogin ? (
            <div>
                <input 
                    title="Email"
                    placeholder="email" type="email"
                    onChange={(e)=>this.setState({ email: e.target.value })}/>

                <input title="Password"
                            placeholder="password" type="password"
                            onChange={(e)=>this.setState({ password: e.target.value })}/>

                <button onClick={this.login}>Login</button>
                <button className="btn-link" onClick={this.toggleLogin}>New user ?</button>
            </div>
        ) : (
            <div>
                <input 
                    title="Email"
                    placeholder="email" type="email"
                    onChange={(e)=>this.setState({ email: e.target.value })}/>

                <input title="Password"
                            placeholder="password" type="password"
                            onChange={(e)=>this.setState({ password: e.target.value })}/>

                <button onClick={this.register}>Register</button>
                <button className="btn-link" onClick={this.toggleLogin}>Already a member ? </button>
            </div>
        );
    }
};

LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired
};

export default LoginForm;
