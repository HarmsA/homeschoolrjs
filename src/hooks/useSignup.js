import {useEffect, useState} from 'react';
import {projectAuth, projectStorage, projectFirestore} from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [isCancelled,setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName, thumbnail) => {
        setError(null)
        setIsPending(true)

        try {
        // signup user
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)
            console.log(res.user)

            if (!res){
                throw new Error("Could not complete signup")
            }

        //    upload user thumbnail to storage and get imgUrl
            const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
            const img = await projectStorage.ref(uploadPath).put(thumbnail)
            const imgUrl = await img.ref.getDownloadURL()

        //    Add display name to user
            await res.user.updateProfile({displayName, photoURL:imgUrl})

            // Create a user document with the doc's id the users uid
            await projectFirestore.collection('users').doc(res.user.uid).set({
                online: true,
                displayName,
                email,
                photoURL: imgUrl
            })

            // Dispatch login action
            // pulled from the useAuthContext which pulls from useContext(AuthContext) which
            // houses the dispatch at <AuthContext.Provider value={{...state, dispatch}}> location
            dispatch({type: 'LOGIN', payload: res.user})
            if (!isCancelled){
                setError(null)
                setIsPending(false)
            }

        } catch(err){
            if (!isCancelled) {
                console.log(err)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, []);

    return {signup, error, isPending};
};

