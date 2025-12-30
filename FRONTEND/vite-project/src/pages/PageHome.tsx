import { Button } from "react-bootstrap";
import { clearLocalDb } from "../features/authentication/services/localstorage.infrastructure";
import { useAuthenticationContext } from "../features/authentication/store";
/**
 * Page d'accueil
 */
export const PageHome = () => {
  const authContext = useAuthenticationContext();

  if (authContext.user.status != "loggedIn"){clearLocalDb()}
  
  function ResponsiveImage() {	
    return (	
      <img	
        src="/Vigne1_575.jpg"	
        srcSet="/Vigne1_575.jpg 576w,
                /Vigne1_765.jpg 768w,
                /Vigne1_990.jpg 990w,
                /Vigne1_1180.jpg 1200w"
        sizes="(max-width: 576px) 576px,
              (max-width: 768px) 768px,
              (max-width: 990px) 990px,
              1200px"	
        alt=""
      />	
    );	
   }

  return (
    <div className="container-fluid">
    <div>
      {authContext.user.status != "loggedIn" && 
      <h1  className="text-success">Bienvenue chez CLOPICO - AOC Premier cru coteau de Lully</h1>}
      <Button className="mb-1" variant="outline-success" href="/magasin"><strong>Visitez notre magasin</strong></Button>
      <div className="row">
        <div className="col-md-12">
          {ResponsiveImage()}
        </div>
      </div>
    </div>
    </div>
  );
};
{
  /* <img className="mx-auto d-block" 
sizes="500px, 900px, 1100px"
*/
}


/* <img	
        src="/Vigne1_575.jpg"	
        srcSet="/Vigne1_575.jpg 576w,
                /Vigne1_765.jpg 768w,
                /Vigne1_990.jpg 990w,
                /Vigne1_1180.jpg 1200w,
                /Vigne1_1850.jpg 1880w"	
        sizes="(max-width: 576px) 576px,
              (max-width: 768px) 768px,
              (max-width: 990px) 990px,
              (max-width: 1180px) 1200px, 
              1880px"	
        alt=""
      />
*/
