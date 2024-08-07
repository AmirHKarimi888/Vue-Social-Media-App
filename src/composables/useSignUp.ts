import { pb } from "../pocketbase";
import useLogIn from "./useLogIn";

export default function () {

    const { logIn, googleLogIn } = useLogIn();

    const signUp = async (data: any) => {

        const { username, email, password, passwordConfirm } = data;

        const generateRandomAvatar = () => {
            let letters = '0123456789ABCDEF';
            let color = "";
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return `https://ui-avatars.com/api/?name=${username}&background=${color}&color=fff.jpg`;
        }

        const createNewUserFeatures = async (features: any) => {
            try {
                await pb.collection("users_features").create(features)
            } catch (err: any) {
                alert(err.message);
            }
        }

        const fileInputEl = document.getElementById('fileInput') as any;

        const newUser = {
            "username": username,
            "email": email,
            "emailVisibility": true,
            "password": password,
            "passwordConfirm": passwordConfirm,
            "name": username,
            "avatar": fileInputEl?.files[0],
            "alternativeAvatar": generateRandomAvatar()
        };

        try {
            await pb.collection("users").create(newUser)
                .then(async () => {
                    await createNewUserFeatures({
                        username: newUser.username,
                        email: newUser.email,
                        followings: [],
                        followers: []
                    })
                })
                .then(async () => {
                    await logIn({
                        "email": username,
                        "password": password
                    })
                })
        } catch (err: any) {
            alert(err.message);
        }
    }

    return { signUp, googleLogIn };
}