import { useState } from "react"
import { useAuthenticationContext } from "../store";
import { CreationUser } from "../models";
import { Button } from "react-bootstrap";

export const Register = () => {
  const [user, setUser] = useState<CreationUser>({
    name: "",
    firstName: "",
    email: "",
    password: "",
    ok: false,
    roleName: "",
  });
  const [role, setRole] = useState<string>("")
  const [checkPwd, setCheckPwd] = useState("red");
  const authContext = useAuthenticationContext();

  const submitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(authContext.role.role === "superadmin" || authContext.role.role === "admin")
    {
      if (authContext.createUser) 
        {
          authContext.createUser
          (
            user.name,
            user.firstName,
            user.email,
            user.password,
            user.ok,
            user.roleName
          )
        };
      } else {
      if (authContext.register) 
        {
          authContext.register
          (
            user.name,
            user.firstName,
            user.email,
            user.password,
            user.ok,
            user.roleName
          )
        };
      }
    }

  const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState: CreationUser = {
      name: e.target.value,
      firstName: user.firstName,
      email: user.email,
      password: user.password,
      ok: user.ok,
      roleName: role
    };
    setUser(newState);
  };
  const updateFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState: CreationUser = {
      name: user.name,
      firstName: e.target.value,
      email: user.email,
      password: user.password,
      ok: user.ok,
      roleName: role
    };
    setUser(newState);
  };
  const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState: CreationUser = {
      name: user.name,
      firstName: user.firstName,
      email: e.target.value,
      password: user.password,
      ok: user.ok,
      roleName: role
    };
    setUser(newState);
  };
  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState: CreationUser = {
      name: user.name,
      firstName: user.firstName,
      email: user.email,
      password: e.target.value,
      ok: false,
      roleName: role
    };
    setUser(newState);
  };
  const checkConfPwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chkvalue: string = e.target.value;
    if (user.password == chkvalue) {
      setCheckPwd("green");
    }
  };
  const changeRoleName = (e: React.ChangeEvent<HTMLSelectElement>) =>{
    const newState: CreationUser = {
      name: user.name,
      firstName: user.firstName,
      email: user.email,
      password: user.password,
      ok: false,
      roleName: e.target.value
    };
    setUser(newState);
    setRole(e.target.value)
  }
  return (
    <div className="mon_login1">
      <form onSubmit={submitForm} method="post">
        {/* ---* ---*  ligne titre  */}
        <div className="row mb-3">
          <div className="col-sm-4 col-md-4"></div>
          <div className="col-md-1 col-sm-4"></div>
          <div className="col-md-3 col-sm-4">
            <h3 className="text-success">Ouvrez votre compte CLOPICO</h3>
          </div>
        </div>
        {/* ---* ---*  ligne nom  */}
        <div className="row mb-3">
          <div className="col-sm-4 col-md-4"></div>
          <div className="col-md-1 col-sm-4">
            <label htmlFor="name">
              <strong>Nom</strong>
            </label>
          </div>
          <div className="col-md-3 col-sm-4">
            <input
              type="text"
              size={35}
              name="name"
              value={user.name}
              onChange={updateName}
            ></input>
          </div>
        </div>
        {/* ---* ---*  ligne prénom  */}
        <div className="row mb-3">
          <div className="col-sm-4 col-md-4"></div>
          <div className="col-md-1 col-sm-4">
            <label htmlFor="firstname">
              <strong>Prénom</strong>
            </label>
          </div>
          <div className="col-md-3 col-sm-4">
            <input
              type="text"
              size={35}
              name="firstname"
              value={user.firstName}
              onChange={updateFirstName}
            ></input>
          </div>
        </div>
        {/* ---* ---*  ligne adresse mail  */}
        <div className="row mb-3">
          <div className="col-sm-4 col-md-4"></div>
          <div className="col-md-1 col-sm-4">
            <label htmlFor="email">
              <strong>Adresse mail</strong>
            </label>
          </div>
          <div className="col-md-3 col-sm-4">
            <input
              type="text"
              size={35}
              name="email"
              value={user.email}
              onChange={updateEmail}
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
        {/* ---* ---*  ligne CONFIRMATION mot de passe  */}
        <div className="row mb-3">
          <div className="col-sm-4 col-md-4"></div>
          <div className="col-md-1 col-sm-4">
            <label htmlFor="confpwd" className="aleign-left">
              <strong>Confirmation</strong>
            </label>
          </div>
          <div className="col-md-3 col-sm-4">
            <input
              className={checkPwd == "red" ? "text-danger" : "text-success"}
              type="password"
              size={35}
              name="confpwd"
              onChange={checkConfPwd}
            ></input>
          </div>
        </div>
        {/* ---* ---*  ligne rôle  ---*/}
          <div className="row mb-3">
            <div className="col-sm-4 col-md-4"></div>
            <div className="col-md-1 col-sm-4">
              {(authContext.role.role === "superadmin" || authContext.role.role === "admin") && (
              <label htmlFor="optionrole" className="aleign-left">
                <strong>Définir le rôle</strong>
              </label>)}
            </div>
            <div className="col-md-3 col-sm-4">
              {authContext.role.role === "superadmin" && (
              <select 
                  name="optionrole"
                  id="optionrole"
                  onChange={changeRoleName}
                  aria-label="Sélectioner le genre de livraison">
                <option value= "client">Client</option>
                <option value="ami">Ami</option>
                <option value="resto">Restaurant</option>
                <option value="admin">Administrateur</option>
                <option value="superadmin">
                  Super administrateur&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </option>
              </select>)}
              {authContext.role.role === "admin" && (
              <select 
                  name="optionrole"
                  id="optionrole"
                  onChange={changeRoleName}
                  aria-label="Sélectioner le genre de livraison">
                <option value= "client">Client</option>
                <option value="ami">Ami</option>
                <option value="resto">Restaurant</option>
              </select>)}
            </div>
          </div>
        {/* ---* ---*  ligne bouton connexion  */}
        <div className="row mb-3">
          <div className="col-sm-4 col-md-4"></div>
          <div className="col-md-1 col-sm-4"></div>
          <div className="col-md-3 col-sm-4">
            {checkPwd == "red" && (
              <Button
                variant="outline-success"
                type="submit"
                size="sm"
                disabled
              >
                <strong>Connexion</strong>
              </Button>
            )}
            {checkPwd == "green" && (
              <Button variant="outline-success" type="submit" size="sm">
                <strong>Connexion</strong>
              </Button>
            )}
          </div>
        </div>
        {/* ---* ---*  ligne message d'erreur  */}
        {authContext.user.status === "failed" && (
          <div className="row mb-3">
            <div className="col-sm-4 col-md-5"></div>
            {/* <div className="col-md-2 col-sm-4"></div> */}
            <div className="col-md-3 col-sm-4">
              <p className="text-danger">
                <strong>Erreur, veuillez ressayer, ou</strong>
              </p>
            </div>
          </div>
        )}
        {/* ---* ---*  ligne pas de compte ?  */}
        <div className="row">
          <div className="col-sm-4 col-md-4"></div>
          <div className="col-md-1 col-sm-4">
            <p className="text-success">Déjà un compte ?</p>
          </div>
          <div className="col-md-2 col-sm-4">
            <Button href="/connexion" variant="outline-success" size="sm">
              <strong>Connectez-vous</strong>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
