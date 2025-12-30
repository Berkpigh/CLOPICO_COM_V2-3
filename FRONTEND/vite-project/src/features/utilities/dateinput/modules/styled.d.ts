// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  interface DefaultTheme {
    borderRadius: string;


    colors: {
      main: string;
      secondary: string;
    };
  }
}
export default DefaultTheme