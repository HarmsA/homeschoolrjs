import {useState, useReducer, useEffect} from 'react';
import { projectFirestore, timestamp } from "../firebase/config";
import { addDoc, collection, doc, updateDoc, deleteDoc } from 'firebase/firestore';

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type){
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null }
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload }
        case 'DELETED_DOCUMENT':
            return { isPending: false, document: null, success: true, error: null }
        case 'UPDATED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        default:
            return state
    }
}

export const useFirestore = (collectionName) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false);

    // collection ref
    const ref = collection(projectFirestore, collectionName)

    // only dispatch if not cancelled
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
          dispatch(action);
        }
    };

    // add a document from TransactionForm
    const addDocument = async (doc) => {
        dispatch({type: 'IS_PENDING'})
        try {
            const addedDocument = await addDoc(ref, { ...doc, createdAt: timestamp.fromDate(new Date()) });
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument });
        }
        catch (err){
            dispatchIfNotCancelled({type: 'ERROR', payload: err.message})
        }
    }

    // delete document
    const deleteDocument = async (id) => {
        dispatch({type: 'IS_PENDING'})
        try{
            const docRef = doc(projectFirestore, collectionName, id);
            await deleteDoc(docRef);
            dispatchIfNotCancelled({type: "DELETED_DOCUMENT"})
        }
        catch (err){
            dispatchIfNotCancelled({type:'ERROR', payload:"Could not delete"})
        }
    }

    // update document
    const updateDocument = async (id, updates) => {
        dispatch({type: "IS_PENDING"})
        try{
            const docRef = doc(projectFirestore, collectionName, id);
            await updateDoc(docRef, updates);
            dispatchIfNotCancelled({type:'UPDATED_DOCUMENT', payload: updates})
            return updates;
        }
        catch (err){
            dispatchIfNotCancelled({type: 'ERROR', payload: err.message})
            return null
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    },[])

    return { addDocument, deleteDocument, updateDocument, response };
};

