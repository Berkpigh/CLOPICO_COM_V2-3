import "./App.css";
import { MainRoutes } from "./AppRoutes";
import { AuthenticationContextProvider } from "./features/authentication/components/AuthenticationProvider";
import { LayoutComponent } from "./learnings/useChildrenLearn/LayoutComponent";
import { MainMenu } from "./shared/layout/MainMenu";

function App() {

  return (
    <>
      <AuthenticationContextProvider>
          <MainMenu></MainMenu>
          <LayoutComponent>
            <MainRoutes></MainRoutes>
          </LayoutComponent>
      </AuthenticationContextProvider>
    </>
  );
}

export default App;