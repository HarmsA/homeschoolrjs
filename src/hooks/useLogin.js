import { useState, useEffect } from 'react';
import { useAuthContext } from "./useAuthContext";
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const projectAuth = getAuth();
const projectFirestore = getFirestore();

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        try{
            const res = await signInWithEmailAndPassword(projectAuth,email, password)

            // Update user online status to true
            const userDocRef = doc(projectFirestore, 'users', res.user.uid);
            await updateDoc(userDocRef, { online: true });

        //    dispatch logout action
            dispatch({ type: 'LOGIN', payload: res.user })
            
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

    return {login, error, isPending}
};

