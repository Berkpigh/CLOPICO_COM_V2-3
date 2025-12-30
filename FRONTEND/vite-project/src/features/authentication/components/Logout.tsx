import { useNavigate } from "react-router-dom";
import { useAuthenticationContext } from "../store";

export const Logout = () => {
  const navigate = useNavigate();

  const authContext = useAuthenticationContext();

  const Deconnexion = () => {
    if (authContext.logOut) {
      authContext.logOut();
    }
  };

  const Annulation = () => {
    navigate("/");
  };

  return (
    <div className="mon_login1">
      <div className="row mb-3">
        <div className="col-sm-4 col-md-3"></div>
        <div className="col-md-1 col-sm-4"></div>
        <div className="col-md-2 col-sm-4">
          <h3 className="text-success">Quitter votre compte CLOPICO ?</h3>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-4 col-md-3"></div>
        <div className="col-md-1 col-sm-4"></div>
        <div className="col-md-1 col-sm-4">
          <button onClick={Deconnexion}>
            <strong>Ok</strong>
          </button>
        </div>
        <div className="col-md-1 col-sm-4">
          <button onClick={Annulation}>
            <strong>Annuler</strong>
          </button>
        </div>
      </div>
    </div>
  );
};
