import {useEffect, useRef, useState} from 'react';
import { projectFirestore } from "../firebase/config";
import { collection, query as firestoreQuery, where, orderBy as firestoreOrderBy, onSnapshot } from 'firebase/firestore';



export const useCollection = (collectionName, query1, queryCompare, query2, orderBy1, direction) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    // if we dont use a ref --> infinite loop in useEffect
    // the array _query is viewed a different on every function call thus making an endless loop
    // useRef is a way to get around this
    // let orderByDue = due

    const query = useRef(query1, queryCompare, query2).current
    const orderBy = useRef(orderBy1, direction).current
    useEffect(() => {
        let ref = collection(projectFirestore, collectionName);
        let q = ref;

        if (query) {
            q = firestoreQuery(ref, where(query1, queryCompare, query2));

        }
        if (orderBy) {
            q = firestoreQuery(q, firestoreOrderBy(orderBy1, direction));
        }
        const unsubscribe = onSnapshot(q, (snapshot) => {
            let results = []
            // see firestore documentation on snapshot for code explanation
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id:doc.id })
            })

        //     update state
            setDocuments(results)
            setError(null)
        }, (error) => {
            console.log(error)
            setError("could not fetch data")
        })
    //    unsubscribe on unmount
        return () => unsubscribe()

    }, [collectionName, query1, queryCompare, query2, orderBy1, direction]);

    return {documents, error}
};

