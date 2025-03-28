import { useState, useEffect } from 'react';
import {projectAuth, projectFirestore} from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { collection } from 'firebase/firestore';


export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch, user } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        try{
            //update online status
            const { uid } = user
            await collection(projectFirestore, 'users').doc(uid).update({online:false})

            await projectAuth.signOut()

        //    dispatch logout action
            dispatch({type: 'LOGOUT'})
            if (!isCancelled){
                setIsPending(false)
                setError(null)
            }

        } catch(err) {
            if(!isCancelled){
                console.log(err)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, []);

    return {logout, error, isPending}
};

