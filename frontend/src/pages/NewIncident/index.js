import React, {useState} from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../service/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident(){
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [value, setValue] = useState('');

const history = useHistory();

const ongId = localStorage.getItem('ongId');

async function handleSubmit(e){
  e.preventDefault();
  
  const data = {title, description, value};

  try{
    await api.post('/incidents', data, {
      headers: {
        Authorization: ongId
      }
    });

    history.push('/profile');
  }catch(err){
    alert('Erro ao cadastro o caso.');
  }

}

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="logo" />

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
          Voltar para casos
          </Link>
        </section>

        <form onSubmit={handleSubmit}>
          <input placeholder="Título do caso" 
          value={title}
          onChange={e => setTitle(e.target.value)}/>
          <textarea  placeholder="Descrição" 
          value={description}
          onChange={e => setDescription(e.target.value)}/>
          <input placeholder="Valor em reais" 
          value={value}
          onChange={e => setValue(e.target.value)}/>

          <button className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}