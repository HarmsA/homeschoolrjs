import {useEffect, useRef, useState} from 'react';
import {projectFirestore} from "../firebase/config";

export const useCollection = (collection, query1, queryCompare, query2, orderBy1, direction) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    // if we dont use a ref --> infinite loop in useEffect
    // the array _query is viewed a different on every function call thus making an endless loop
    // useRef is a way to get around this
    // let orderByDue = due

    const query = useRef(query1, queryCompare, query2).current
    const orderBy = useRef(orderBy1, direction).current
    useEffect(() => {
        let ref = projectFirestore.collection(collection)
        if (query){
            ref = ref.where(query1, queryCompare, query2)
        }
        if (orderBy){
            ref = ref.orderBy(orderBy1,direction)
        }
        const unsubscribe = ref.onSnapshot((snapshot) => {
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

    }, [collection])
    return {documents, error}
};

