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
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Deixe um comentário</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea 
          ref={commentEl}
          className="p-4 resize-none outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" 
          name="comment" 
          placeholder="Comentário" 
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input 
          ref={nameEl}
          type="text" 
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" 
          placeholder="Nome" 
          name="name" 
        />
        <input 
          ref={emailEl}
          type="email" 
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" 
          placeholder="E-mail" 
          name="email" 
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input 
            ref={storeDataEl}
            type="checkbox" 
            id="storeData" 
            name="storeData" 
            value="true" 
          />
          <label className="text-gray-500 cursor-pointer ml-2" htmlFor="storeData">Salve meu nome e e-mail, para a próxima vez que eu comentar.</label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">Todos os campos são obrigatórios</p>}
      <div className="mt-8 text-center sm:text-left">
        <button 
          type="button" 
          onClick={handleCommentSubmit} 
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Postar Comentário
        </button>
        {showSuccessMessage && <span className="text-md mt-4 ml-8 font-medium text-green-500">Comentário enviado para revisão!</span>}
      </div>
    </div>
  )
  
}