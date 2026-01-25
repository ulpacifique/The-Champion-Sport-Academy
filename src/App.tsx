
import './App.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Provider } from 'react-redux';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import AppRoutes from './Page/AppRoutes';
import store from './Slices//Store'; // This should work even for .tsx files

function App() {
  const theme = createTheme({
    colors: {
      'brightSun': [
        '#fffbeb', '#fff3c6', '#ffe588', '#ffd146', '#ffbe20', 
        '#f99c07', '#dd7402', '#b75006', '#943d0c', '#7a330d', '#461902'
      ],
      'cerulean-blue': [
        '#f0f6fe', '#dceafd', '#c1dafc', '#97c4f9', '#65a4f5', 
        '#4282ef', '#2c64e4', '#2552da', '#2341aa', '#223b86', '#192552'
      ],
      'iron': [
        '#f7f7f7', '#ededed', '#dfdfdf', '#d1d1d1', '#adadad', 
        '#999999', '#888888', '#7b7b7b', '#676767', '#545454', '#363636'
      ]
    }
  });

  return (
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <Notifications
          position="top-right"
          zIndex={1000}
          limit={5}
          autoClose={5000}
        />
        <AppRoutes />
      </MantineProvider>
    </Provider>
  );
}

export default App;