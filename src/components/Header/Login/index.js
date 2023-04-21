import { Web3Auth } from "@web3auth/modal";

//Initialize within your constructor
const web3auth = new Web3Auth({
    clientId: "YOUR_WEB3AUTH_CLIENT_ID", // Get your Client ID from Web3Auth Dashboard
    chainConfig: {
        chainNamespace: "other",
    },
});

await web3auth.initModal();