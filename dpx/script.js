const DROPBOX_ACCESS_TOKEN =
    "sl.u.AGwetGFyMf9LCef25IGETwJfPX-XWQI20v5moD2qu1UVcYcJ1sX_cV-Rzh6UkYnYUuxvpAQaYUFNlpBfScs3aZIoq55DQ-WJgmtyu3v7SOCeNb1PIq4OusyG7VDnGmS2-8tmeIvA6JgMGWaGE5KLiPtAuRoRNsUgVNlZPy_UoBRpkv-Ss5O-t5ZTKzmTFm7seb_7aajDW2EJhLJR7ZkEAh3Q14Olt9Yqz9XdYx0OnUpgMIklRVV0H7CGMyZJGDjyliOM1KBqifS-OKtH3pGdD8XQYzi5G-jUxEYwDb0nET9qA7GydYyXaliCMYubWBsXPklb47sR1oVBzem-8AuA0eTiHy-ZR7iYqyg_oAGfOXYdcxI87FFgR79yxckPe1xGnsPPismAfVkMAqABmY7YPaPtmxSlnAFLuSmC8_6vApUIZMRatgIldqU_cG3DHWJMhYDl2NaprDDkM8OUL0zObLAoFLEv72Gwi0YoCA0BSDeBh5VY-G_3RRenzmNygo20GhlRjg39WKz-7InaC0IjmorrPwd0_yFWAX0GvlLXQgTA9DtMEq-6uq-HldaMssFa4btyAhPYBuhs29uT_02cGFrs-AAwWy9CrGKbq5Y8oIaoGn-mCqWWT155nEngCjSoUFIPfTppFEO6NUaphSs1IV5CIvBXwkvtRgaOWYrouaKQA9PEvu4Sfmkgxp3_dk2qSCyY5gCzfgqSEE2hKYTTj-BeDu0RgaJ8BAEIxqwTjFWMkwV9RTcYNhEWskJqMcmdAy-3umQG5UEgAmeZLKBdJxIHdS_jQ5j4UYDcdrW0I1YoNraQWnW7OabHqPntwg98p93ix37eSTAPWOh95NmMpz46HfzkUvp6xJNzdeynAa0tqknPaJEMTKJrc9NHLiD9VMDKzPYwng-RCyczWpb9vStEBnqhE6mg0Dcai0mR1wjgcYImyHYJ7B-Gv6xBva_F_UOWCn-ITJ9bZzdMeJauVeEX3knWny11TiF40P1zSqzpDJTbRiOjnEciQv2VKAO8ZQb55Q2Qch_K8HPL-KVM3U-p7A_V7CVprYFLa43EZ7URrnRYjY9CIAw7BAtSvNC_6vqcEOry9DNMojnAft0eSbkdtlF6bU5ij3CyJUupl1Qph_dKMOVClr4xqV6xlBwM_sIGPzKSvFkvmCpNZyqshSijnNB7a5O3At3MuGTKDB6IG3S8Y8qwS55YhSkhTwboFmK5sG6AVotptaD30Z8L7yEeCSIsRbFJsgsTa216YcG0kr0mawZdlHInIc_EQ3PRmJHvdKU5mRyPBG1CLkM0Rtf60G9PSy9LgLpb-GFQ-1F8rE9EmQhIN45d93IuskHOJXTwxj9_rtJuwTmpsw7cw8tF5Kc8ai1E3i1h_YL2exD5apYTliUj28uXY_eZMRxU4WP86GwtzFRfxHVbeAdutS-J_afJghc1IRah8svv0Uzzkw";


async function uploadFile() {

    const fileInput =
        document.getElementById("file");

    const message =
        document.getElementById("message");


    if (fileInput.files.length === 0) {

        message.innerText =
            "Please select a file";

        return;

    }


    const file =
        fileInput.files[0];


    message.innerText =
        "Uploading...";


    try {

        const response = await fetch(
            "https://content.dropboxapi.com/2/files/upload",
            {

                method: "POST",

                headers: {

                    "Authorization":
                        "Bearer " + DROPBOX_ACCESS_TOKEN,

                    "Dropbox-API-Arg":
                        JSON.stringify({

                            path: "/" + file.name,

                            mode: "add",

                            autorename: true

                        }),

                    "Content-Type":
                        "application/octet-stream"

                },

                body: file

            }
        );


        if (response.ok) {

            message.innerText =
                "File uploaded successfully to Dropbox!";

        }

        else {

            const error =
                await response.text();

            console.log(error);

            message.innerText =
                "Upload failed";
        }
    }
    catch (error) {
        console.log(error);
        message.innerText =
            "Error connecting to Dropbox";
    }
}
function logout() {

    window.location.href =
        "index.html";

}