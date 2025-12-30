import { Route, Routes } from "react-router-dom"
import { PageHome } from "./pages/PageHome";
import { PageNoMatch } from './pages/PageNoMatch';
import { Apropos } from "../src/features/apropos/components/Apropos"
import { Contact } from "../src/features/apropos/components/Contact"
import { Login } from "./features/authentication/components/Login";
import { Logout } from "./features/authentication/components/Logout";
import { PrivateRoute } from "./features/authentication/components/PrivateRoute";
import { Register } from "./features/authentication/components/Register";
import { PageUpdateClientInfo } from "./features/clientinfo/pages/PageUpdateClientInfo";
import { Magasin } from "./features/vente/components/Magasin";
import { Panier } from "./features/vente/components/Panier";
import { PageNouvCuveeBD } from "./features/cuvées/pages/PageNouvCuveeBD";
import { PageDescCuveeBD } from "./features/cuvées/pages/PageDescCuveeBD";
import { PageUpdDescCuveeBD } from "./features/cuvées/pages/PageUpdDescCuveeBD";
import { PageDescBouteille } from "./features/bouteilles/pages/PageDescBouteille";
import { PageUpdateProduitBouteilles } from "./features/bouteilles/pages/PageUpdateProduitBouteilles"
import { PageNouvProduit } from "./features/produits/pages/PageNouvProduit";
import { PageListProduit } from "./features/produits/pages/PageListProduit";
import { PageUpdateStock } from "./features/stock/pages/PageUpdateStock";
import { PageUpdateBouteilleImage } from "./features/bouteilles/pages/PageUpdateBouteilleImage";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<PageNoMatch></PageNoMatch>} />
      <Route path="/" element={<PageHome></PageHome>} />
      <Route path="/apropos" element={<Apropos></Apropos>} />
      <Route path="/contact" element={<Contact></Contact>} />
      <Route path="/" element={<PageHome></PageHome>} />
      <Route path="/connexion" element={<Login></Login>} />
      <Route path="/enregistrement" element={<Register></Register>} />
      <Route path="/deconnexion" element={<Logout></Logout>} />
      <Route path="/infoclient" element={<PrivateRoute><PageUpdateClientInfo></PageUpdateClientInfo></PrivateRoute>} />
      <Route path="/magasin" element={<Magasin></Magasin>} />
      <Route path="/panier" element={<Panier></Panier>} />
      <Route path="/nouvcuvee" element={<PrivateRoute><PageNouvCuveeBD></PageNouvCuveeBD></PrivateRoute>} />
      <Route path="/desccuvee" element={<PrivateRoute><PageDescCuveeBD></PageDescCuveeBD></PrivateRoute>} />
      <Route path="/upddesccuvee" element={<PrivateRoute><PageUpdDescCuveeBD></PageUpdDescCuveeBD></PrivateRoute>} />
      <Route path="/descbouteille" element={<PrivateRoute><PageDescBouteille></PageDescBouteille></PrivateRoute>} />
      <Route path="/updprodbouteille" element={<PrivateRoute><PageUpdateProduitBouteilles></PageUpdateProduitBouteilles></PrivateRoute>} />
      <Route path="/nouvProduit" element={<PrivateRoute><PageNouvProduit></PageNouvProduit></PrivateRoute>} />
      <Route path="/listProduit" element={<PrivateRoute><PageListProduit></PageListProduit></PrivateRoute>} />
      <Route path="/updstock" element={<PrivateRoute><PageUpdateStock></PageUpdateStock></PrivateRoute>} />
      <Route path="/updboutimage" element={<PrivateRoute><PageUpdateBouteilleImage></PageUpdateBouteilleImage></PrivateRoute>} />
    </Routes>
  );
};
