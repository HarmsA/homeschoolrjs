import {useState, useReducer, useEffect} from 'react';
import { projectFirestore, timestamp } from "../firebase/config";

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
export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false);

    // collection ref
    const ref = projectFirestore.collection(collection)

    const dispatchIfNotCanceled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }

    // add a document from TransactionForm
    const addDocument = async (doc) => {
        dispatch({type: 'IS_PENDING'})
        try {
            const createdAt = timestamp.fromDate(new Date())
            await ref.add({...doc, createdAt})
            dispatchIfNotCanceled({type: 'ADDED_DOCUMENT'})
        }
        catch (err){
            dispatchIfNotCanceled({type: 'ERROR', payload: err.message})
        }
    }

    // delete document
    const deleteDocument = async (id) => {
        dispatch({type: 'IS_PENDING'})
        try{
            await ref.doc(id).delete()
            dispatchIfNotCanceled({type: "DELETED_DOCUMENT"})
        }
        catch (err){
            dispatchIfNotCanceled({type:'ERROR', payload:"Could not delete"})
        }
    }

    // update document
    const updateDocument = async (id, updates) => {
        dispatch({type: "IS_PENDING"})
        try{
            const updatedDocument = await ref.doc(id).update(updates)
            dispatchIfNotCanceled({type:'UPDATED_DOCUMENT', payload: updatedDocument})
            return updatedDocument
        }
        catch (err){
            dispatchIfNotCanceled({type: 'ERROR', payload: err.message})
            return null
        }
    }
    useEffect(() => {
        return () => setIsCancelled(true)
    },[])

    return { addDocument, deleteDocument, updateDocument, response };
};

