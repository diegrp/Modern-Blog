import { useState, useEffect, useRef } from 'react'
import { submitComment } from '../../../services/graphql'

// Formulário de Comentários - name, email, comment e storeData

export const CommentsForm = ({ slug }) => {

  const [ error, setError ] = useState(false);
  const [ showSuccessMessage, setShowSuccessMessage ] = useState(false);
  const nameEl = useRef();
  const emailEl = useRef();
  const commentEl = useRef();
  const storeDataEl = useRef();

  /* Pega o nome e email salvo em nosso localStorage */

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name');
    emailEl.current.value = window.localStorage.getItem('email');
  },[]);

  return (
    <div>
      
    </div>
  )
}