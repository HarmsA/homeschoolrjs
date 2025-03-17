import { useState, useEffect } from 'react';
import {projectFirestore} from "../firebase/config";
import { doc, onSnapshot } from 'firebase/firestore';

export const useDocument = (collectionName, id) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);
//    realtime data for document
    useEffect(() => {
        const docRef = doc(projectFirestore, collectionName, id);

        // firestore function, onSnapshot tell us when the document changes
        // this also returns an unsubscribe function
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            if (snapshot.exists()) {
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

    }, [collectionName, id]);
    return{document, error}
};

