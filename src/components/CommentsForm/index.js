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

  const handleCommentSubmit = () => {

    setError(false);

    /* Pega o value e checked de nossos elementos prelo ref, definindo assim nosso commentObj */

    const { value: name } = nameEl.current; 
    const { value: email } = emailEl.current; 
    const { value: comment } = commentEl.current; 
    const { checked: storeData } = storeDataEl.current; 
    
    /* Se os campos de name, email ou comment estiveram vazios, retorna error */

    if ( !name || !email || !comment ) {
      setError(true);
      return;
    }

    /* Obj de dados que recebe os valores de cada input pela sua referência */

    const commentObj = { name, email, comment, slug };

    /* Se storeData for true jogamos nosso name e e-mail para o localStorage, caso ao contrário,
    removemos do localStorage os mesmos dados */

    if (storeData) {
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', email);
    } else {
      window.localStorage.removeItem('name');
      window.localStorage.removeItem('email');
    }

    /* Recebe o obj com nossos valores e traz um resultado para
    mudança de estado */

    submitComment(commentObj).then((result) => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      },3000);
    });

  };

  return (
    <div>

    </div>
  )
}