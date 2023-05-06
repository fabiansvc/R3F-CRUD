import React, { useState } from 'react';
import axios from 'axios';
import ModelViewer from './ModelViewer';

export default function Form() {
  const [name, setName] = useState('');
  const [model, setModel] = useState(null);
  const [id, setId] = useState('')

  const instance = axios.create({
    baseURL: 'http://localhost:5000'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', name);
    data.append('model', model);
    try {
      const res = await instance.post('/api/models', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setId(res.data._id)

    } catch (err) {
      console.error(err);
    }
  };

  const showModel = (id) => {
    if (id != '')
      return <ModelViewer id={id} />
  }
  return <>
  <div className="container">
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
        <input type="text" id="name" onChange={e => setName(e.target.value)} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="model" className="block text-gray-700 font-bold mb-2">Model:</label>
        <input type="file" id="model" onChange={e => setModel(e.target.files[0])} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
    </form>
    </div>
    {showModel(id)}
  </>
};








