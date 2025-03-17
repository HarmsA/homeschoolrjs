import { useState, useEffect } from 'react';
import {projectFirestore} from "../firebase/config";

export const useDocument = (collection, id) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);
//    realtime data for document
    useEffect(() => {
        const docRef = projectFirestore.collection(collection).doc(id)

        // firestore function, onSnapshot tell us when the document changes
        // this also returns an unsubscribe function
        const unsubscribe = docRef.onSnapshot((snapshot) => {
            if (snapshot.data()){
                //gives us the updated snapshot and all the old data, spread out and including the id of document
                setDocument({...snapshot.data(), id: snapshot.id})
                setError(null)
            }
            else{
                setError("No such document exists")
            }
        }, (err) => {
            console.log(err.message)
            setError("Failed to get document")
        })

        return () => unsubscribe()

    }, [collection, id]);
    return{document, error}
};

