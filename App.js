import { useEffect, useContext } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom';
import HomeScreen from "./HomeScreen";
import AboutScreen from "./AboutScreen";
import ProfileScreen from "./ProfileScreen";
import RegistrationScreen from "./RegistrationScreen";
import LayoutRoute from './LayoutRoute';
import LoginScreen from './LoginScreen';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {UserContext} from './UserContext';


const theme = createTheme ({
  palette: {
     primary: {
       main: '#264653'
     },
     secondary: {
       main: '#2A9D8F'

 },
 success: {
   main: '#e9c46a'
  }
 },

  typography: {
   fontFamily: "'Quicksand', san-serif",
   fontWeightLight: 400,
   fontWeightRegular: 500,
   fontWeightMedium: 600,
   fontWeightBold: 700

 }

})

function App() {

  const { updateUser } = useContext(UserContext);

  useEffect(
    function() {
      // fetch function
      fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/users/find`,{
        "method": 'POST',
        "headers": {
            //"Content-Type": "multipart/form-data"
            'Authorization' : `Bearer ${localStorage.getItem('jsonwebtoken')}`,
        }
      })
      // Convert the JSON string to an object
      .then(
          (response) => response.json()
      )

      // If Promise was successful
      .then(
          (response) => {
              console.log(response);
              
              // Turn off preloader and reveal success message
              updateUser(
                {
                  firstName: response.message.firstName,
                  lastName: response.message.lastName,
                  email: response.message.email,
                  password: response.message.password,
                  avatar: response.message.avatar,
                  phone: response.message.phone
                }
              )
          }
      )

      // If Promise was not fulfilled
      .catch(
          (e) => {
              console.log({e: e})
              // Turn off preloader and reveal error message
          }
      )
    }, []
  )

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
          <Switch>
            <LayoutRoute path="/" component={HomeScreen} exact={true} />
            <LayoutRoute path="/about" component={AboutScreen} exact={true} />
            <LayoutRoute path="/profile" component={ProfileScreen} exact={true} />
            <LayoutRoute path="/registration" component={RegistrationScreen} exact={true} />
            <LayoutRoute path="/login" component={LoginScreen} exact={true} />
          </Switch>
      </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;