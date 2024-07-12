import { ref } from 'vue';
import Keycloak from 'keycloak-js';

export const useOpenIDConnect = (issuerUrl, realm, clientId) => {

    const keycloak = new Keycloak({
        url: issuerUrl,
        realm: realm,
        clientId: clientId,
    });

    const state = ref({
        login: () => keycloak.login(),
        logout: () => keycloak.logout(),
        isAuthenticated: keycloak.authenticated,
        accessToken: keycloak.token,
    });

    const updateRef = () => {
        state.value = {
            login: () => keycloak.login(),
            logout: () => keycloak.logout(),
            isAuthenticated: keycloak.authenticated,
            accessToken: keycloak.token,
        };
    };

    keycloak.onReady = () => {
        console.log('onReady');
        updateRef();
    };
    keycloak.onAuthSuccess = () => {
        console.log('onAuthSuccess');
        updateRef();
    };
    keycloak.onAuthError = () => {
        console.log('onAuthError');
        updateRef();
    };
    keycloak.onAuthLogout = () => {
        console.log('onAuthLogout');
        updateRef();
    };
    keycloak.onAuthRefreshSuccess = () => {
        console.log('onAuthRefreshSuccess');
        console.log('===== Access Token =====');
        console.log(keycloak.token);
        console.log('===== Access Token =====');
        updateRef();
    };
    keycloak.onAuthRefreshError = () => {
        console.log('onAuthRefreshError');
        updateRef();
    };
    keycloak.onTokenExpired = () => {
        console.log('onTokenExpired');
        updateRef();
        keycloak.updateToken();
    };
    
    keycloak.init({
        // onLoad: 'login-required',
        onLoad: 'check-sso',
        checkLoginIframe: false,
        // silentCheckSsoRedirectUri: `${location.origin}/silent-check-sso.html`
    }).then(authenticated => {
        console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
        console.log('===== Access Token =====');
        console.log(keycloak.token);
        console.log('===== Access Token =====');
        updateRef();
    }).catch(error => {
        console.error('Failed to initialize adapter:', error);
    });
           
    return state;
};