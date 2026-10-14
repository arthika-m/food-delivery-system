const DROPBOX_ACCESS_TOKEN =
    "sl.u.AGybGewfvaS2ZB6I3g1j6UKZgm4FUcYIeBSbdLba07YmOacslyKVGJ2taB8FSsqyywUlDL9TfrVr7wJ54Dnj5RV08D3lH_ENt2nKCF_1ia9h2K-9Cl2XgmWzEETjIf0Ta1xdwaI6vDio5zOOG7ZUfPl8PLp6PqVSm4MwpCRXULG4EEu__K3xrRBTIpDsXs-NSlRmCbsZWSXPnAWfV5Em3wieU6T0Qhew-38La6W-be1w6I9dSwTaTKmun7C1egfl7zM65JVg2kiLc9ehHqHAo5S4S1RLaLCD-6igLdY_lOz-eTlnL4YT9kH-koTLX7TZDn3KKrZyoD0Hjo-7TOfDFfbeeHwZv4A5Vycb1GrvOatjLItmthQnlbtHq2UaA3RfPB14H3IgZyoVd0WaQtBz2GCvGHnU6Oyx5ic9oljZk13l312-yzph19NW6SutJavYEjD3LFCxccOeFf7vxHsYpsL9rydTJteHl-x53R0lxu7ob90ZaVQxmiHwS5oOUC3LP-TUBjyDDHhO25qlWooNLQesDrUAX9qIdwBxzdYoXVq71sdhFVjStFfw00kS9dV8rIWP-nTiAFrH5RZ_WdsNVv3EZEhEryXNgKLdnZ5bA9cFb0ctVkL6hQfMQnxPa35eyglmKisgYVuw5fI5muvMZataL0xnZ8xTK0frjqcDIl3eYbIh7aWb-MzINQfR7obA0ejMpRyibiuEvN7K1G3BIkRPlUnDKOliYs0VGRProiyiKgE1GuUct0-0ILgfY2auCW3R0DI7lthYpO5SL1gcC8WODHxexPOzVHAgQEVehgAJHLEs3GJeLokb829wtyHHlAvcyh0IMEPZhM3LsGb8sPKTu9cAgsn0aU4A9p2DcNlhaicXSJ9li9CpRUSI848VJLywvmWs7M5ahK3BvIqvgP4m7aC8xgSVgKzpK8acnpLRrit0w48kMItVNMm0lqID-y6rfDlDXCYkJ7qaa9a9foGLbY0lNsOykNOUw9PGqx-igpcGvibFM6uzTtjSTBedvKZAO67koUbtVPy-0fwLQSYyx4nUbUwIBBY3jMnMzlIth4sEbyBGU55sknh-unJUlwYt1GD9IB5WLz35ERLEbiT5VL8LuZeS3WNHRvT7Xr_F5LshAbfgak90_UoephYeoSoP8LYR9A1ulx6rqitIY7jbV9KOC7UWsJzsdA5phFytT2Ie82xw4aXWEMqcIQPvKsnn97QE3IrP8dVFuYWJ0Po7zQQZmmG6U0YjOg1xioYOKVREmItTfcuY9jjhdj3L9drVB_qTPVytmqLbV0bpgeDj7GUfK3P1w8yIkNtOLLiu5_ukNyw2AUrscrniYlUNLGC2H5KhJ0ERoerS7AwyTxThjwPbl0V3FQC26ilQOCNNQP2MieKjS4inWbQ5SyXJ31WkB0smM7UksdNPYtilb586yDo9gleUiP__mus2AfOLwQ";


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