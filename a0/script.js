
let auth0Client;

const auth0Config = {
    domain: "dev-wesy33w1g8gd7cy6.us.auth0.com",
    clientId: "O7OHhgDMV8LyBvYSm1CYmItgSyQGrpMA"
};

async function startAuth0() {
    auth0Client = await auth0.createAuth0Client({
        domain: auth0Config.domain,
        clientId: auth0Config.clientId,
        cacheLocation: "localstorage",
        authorizationParams: {
            redirect_uri: window.location.origin + "/"
        }
    });

    // Handle the return from Auth0 after login
    if (
        window.location.search.includes("code=") &&
        window.location.search.includes("state=")
    ) {
        await auth0Client.handleRedirectCallback();

        // Open the dashboard after successful login
        window.location.replace(
            window.location.origin + "/dashboard.html"
        );
        return;
    }

    // If already logged in, open the dashboard
    const loggedIn = await auth0Client.isAuthenticated();

    if (loggedIn) {
        window.location.replace(
            window.location.origin + "/dashboard.html"
        );
    }
}

async function login() {
    const message = document.getElementById("message");

    try {
        await auth0Ready;

        if (!auth0Client) {
            throw new Error("Auth0 client was not initialized.");
        }

        await auth0Client.loginWithRedirect();
    } catch (error) {
        console.error("Login error:", error);

        if (message) {
            message.innerText = "Login failed. Please try again.";
        }
    }
}

const auth0Ready = startAuth0().catch(error => {
    console.error("Auth0 initialization error:", error);

    const message = document.getElementById("message");

    if (message) {
        message.innerText =
            "Unable to initialize login. Check the browser console.";
    }
});
