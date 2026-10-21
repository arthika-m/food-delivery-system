let auth0Client;

async function startAuth0() {
    auth0Client = await auth0.createAuth0Client({
        domain: "dev-wesy33w1g8gd7cy6.us.auth0.com",
        clientId: "O7OHhgDMV8LyBvYSm1CYmItgSyQGrpMA",
        cacheLocation: "localstorage",
        authorizationParams: {
            redirect_uri: window.location.origin + "/"
        }
    });
}

async function login() {
    try {
        if (!auth0Client) {
            await startAuth0();
        }

        await auth0Client.loginWithRedirect();
    } catch (error) {
        console.error("Login error:", error);
        alert("Login failed. Check the browser console.");
    }
}

startAuth0().catch(error => {
    console.error("Auth0 initialization error:", error);
});