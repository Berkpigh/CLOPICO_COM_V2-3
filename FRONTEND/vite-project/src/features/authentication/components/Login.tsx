import { useState } from "react"
import { useAuthenticationContext } from "../store"
import { LoginUser } from "../models";
import { Button } from "react-bootstrap";

export const Login = () => {
  const [user, setUser] = useState<LoginUser>({ login: "", password: "" });
  const authContext = useAuthenticationContext();

  const submitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authContext.logIn) {
      authContext.logIn(user.login, user.password);
    }
  };

  const updateLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState: LoginUser = {
      login: e.target.value,
      password: user.password,
    };
    setUser(newState);
  };
  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState: LoginUser = {
      login: user.login,
      password: e.target.value,
    };
    setUser(newState);
  };

  return (
    <div className="mon_login1">
      <form onSubmit={submitForm} method="post">
      {/* ---* ---*  ligne titre  */}
        <div className="row mb-3">
          <div className="col-sm-4 col-md-4"></div>
          <div className="col-md-1 col-sm-4"></div>
          <div className="col-md-3 col-sm-4">
            <h3 className="text-success">Connectez-vous à votre compte CLOPICO</h3>
          </div>
        </div>
      {/* ---* ---*  ligne adresse mail  */}
      <div className="row mb-3">
          <div className="col-sm-4 col-md-4"></div>
          <div className="col-md-1 col-sm-4">
            <label htmlFor="login">
              <strong>Adresse mail</strong>
            </label>
          </div>
          <div className="col-md-3 col-sm-4">
            <input
              type="text"
              size={35}
              name="login"
              value={user.login}
              onChange={updateLogin}
            ></input>
          </div>
        </div>
      {/* ---* ---*  ligne mot de passe  */}
      <div className="row mb-3">
          <div className="col-sm-4 col-md-4"></div>
          <div className="col-md-1 col-sm-4">
            <label htmlFor="password" className="aleign-left">
              <strong>Mot de passe</strong>
            </label>
          </div>
          <div className="col-md-3 col-sm-4">
            <input
              type="password"
              size={35}
              name="password"
              value={user.password}
              onChange={updatePassword}
            ></input>
          </div>
        </div>
      {/* ---* ---*  ligne bouton connexion  */}
        <div className="row mb-3">
          <div className="col-sm-4 col-md-4"></div>
          <div className="col-md-1 col-sm-4"></div>
          <div className="col-md-3 col-sm-4">
            <Button variant="outline-success" type="submit" size="sm">
              <strong>Connexion</strong>
            </Button>
          </div>
        </div>
      {/* ---* ---*  ligne message d'erreur  */}
      {authContext.user.status === "failed" &&
      <div className="row mb-3">
        <div className="col-sm-4 col-md-5"></div>
        {/* <div className="col-md-2 col-sm-4"></div> */}
        <div className="col-md-3 col-sm-4">
          <span className="text-danger"><strong>Mail ou mot de passe non valable</strong></span>
        </div>
      </div>}
      {/* ---* ---*  ligne pas de compte ?  */}
      <div className="row">
        <div className="col-sm-4 col-md-4"></div>
        <div className="col-md-1 col-sm-4">
          <p>Pas de compte ?</p>
        </div>
        <div className="col-md-2 col-sm-4">
            <Button href="/enregistrement" variant="outline-success" size="sm">
              <strong>Ouvrez votre compte</strong>
            </Button>
        </div>
      </div>
      </form>
    </div>
  );
};
