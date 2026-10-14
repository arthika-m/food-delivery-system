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


    if (
        window.location.search.includes("code=") &&
        window.location.search.includes("state=")
    ) {

        await auth0Client.handleRedirectCallback();

        window.location.href = "dashboard.html";

    }

}


async function login() {

    await auth0Client.loginWithRedirect();

}


startAuth0();