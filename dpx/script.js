
const DROPBOX_ACCESS_TOKEN = "sl.u.AG1Z2Y-mrDqTroP4KO7Tn5nlFYtxd04G15FSt6Ho8ojz_wvN75S9G8UE2-TKdsOsHEnHlYGSEX2Dj1Gx2zbzRhBV1wcMuvFtKxzvE-j7h9-OpUuz933Agf1t8r1v1cuDvZs_48qdrpdK62f-JhhZEi5uc-AdsoxhQb_tH7oD52lJUfbR8Xtl2PLEf9hVcPJuMlocLIUKRJyThkRiS2S0B6GxrbwR2ra1opVOXxtOFq7drSxzM9pJMua-swiY2lWz7amWIqNYrHDj8ploOSARX5o1cTjRT0TSBvDGFH7M69dWZJg7XJVi-S6ewJAqE_4lPav_Z9Fv8zV8whJzfjvXxx1G0kVs04GswtH7-FxUtQT5Mi8Kf2sD806kla8wnqLzpD4bffMO3FETN4yqxKPqWC-jOh-Bq05hcM80GPFdQGWTj_9SbFta-twbo9JGNSNFYTdTf552hV4ea8u6Mrbdsp3qc-CBd_zpl-9I5UvYmK2ctdRoYu2A3iRYDNjdPrSwPgfMb9XG08URVosl7JbqFyNdSeD_k9GNTbyGLLzDuf1HYm_XTUBtx7z9IWs7H9jDExLuJKcAd2KF9S6B1tO-T413DwItoEgCvNvH2hD6hrgpwupMb46DE4ui97z_PXYV9QM9e2LQGsUzUTQagLj7LTQ2FO9aEl_bgfiu9eo-g1Yz4d7yrxd5A-Pu4G9XWBbmf140-gV4rc0umYu0amxYFJgd-qUgOoyqzcN2s_6JRTqkWwVe5NdF6-YPWRLQkCy9n1i8DjmywgEJAQn-TFgIBIo09GZPUwPSjDR2J_f0B9dfWRooLYVxMqXReJo1XK86aqggJrDhMd25kh9l0pU9j1a1YJpQbJ5n_qBFexq2Rwa_sikgFP-ieqd-NdmhJekNG4GUJxqiqrPGUZ8s14XYiK_y2QqSvtucaGAM5eF8F1RY1SQrwAKxDm3FhkuWpQygzNZBQgW7lEWJuNo3WKjtbHmUoEu865ZIS72RQs6p0mJXUMDUlUjDRK-QODZsyeIyyS3tWvfRL3N4vKbQRtKKzXHX-hEZQ2iM_QgnNjGL0zGOvEypi9jggnvr-40grAV81YeQeNkhgltLKoWVxL3e5vCzEuoezfyKfJalVwkyYBbBNyYJOb0ooCtGF7yX_bVbLkq7Fzjadh00teXQEn1_w8bqG_mnFxGC-gvLkcewvzCATX2goRkjOqKh52aptDrxYnjXHvE9ub37CugJI5TODNSMUMYkNaHaCAywemSBS79dWoSkeco13i5GtRyqKp8raz8rvwLozrftr9eKZtsoPbgS20C67MzNCkuSRMIKOlFhIoASnbjNwKv5Wx47tHmcKXWeSYB9JSZNwsMv6NZwLzVgTlk4E_UVVSGCtdFiC70B1h2eFd9cIIzPaZQpfsezO4z4QmSdlBN6OkhyluaoUQiDZm17GB945-hgHRkfEK4y7A";

async function uploadFile() {
    const fileInput = document.getElementById("file");
    const message = document.getElementById("message");

    if (!fileInput.files || fileInput.files.length === 0) {
        message.innerText = "Please select a file.";
        return;
    }

    if (
        !DROPBOX_ACCESS_TOKEN ||
        DROPBOX_ACCESS_TOKEN === "PASTE_YOUR_NEW_ACCESS_TOKEN_HERE"
    ) {
        message.innerText = "Please configure your Dropbox access token.";
        return;
    }

    const file = fileInput.files[0];
    message.innerText = "Uploading...";

    try {
        const response = await fetch(
            "https://content.dropboxapi.com/2/files/upload",
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + DROPBOX_ACCESS_TOKEN,
                    "Dropbox-API-Arg": JSON.stringify({
                        path: "/" + file.name,
                        mode: "add",
                        autorename: true,
                        mute: false
                    }),
                    "Content-Type": "application/octet-stream"
                },
                body: file
            }
        );

        if (response.ok) {
            const result = await response.json();
            message.innerText =
                "File uploaded successfully to Dropbox!";
            console.log("Upload result:", result);
        } else {
            const errorText = await response.text();
            console.error("Dropbox error:", response.status, errorText);

            if (response.status === 401) {
                message.innerText =
                    "Authentication failed. Generate a valid Dropbox access token.";
            } else if (response.status === 403) {
                message.innerText =
                    "Permission denied. Check your Dropbox app permissions.";
            } else if (response.status === 409) {
                message.innerText =
                    "Dropbox path or file conflict. Check the selected file.";
            } else {
                message.innerText =
                    "Upload failed. Check the browser console.";
            }
        }
    } catch (error) {
        console.error("Upload error:", error);
        message.innerText =
            "Unable to connect to Dropbox. Check your internet connection.";
    }
}

function logout() {
    window.location.href = "index.html";
}
