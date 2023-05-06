import { useState, useEffect } from 'react';
import axios from 'axios';
import Experience from './Experience';

export default function ModelViewer(props) {
  const [model, setModel] = useState(null);

  const instance = axios.create({
    baseURL: 'http://localhost:5000'
  });

  useEffect(() => { 
    const getModel = async () => {
      const res = await instance.get(`/api/models/${props.id}`, { responseType: 'blob' });
      console.log(res.data);
      const blob = new Blob([res.data], { type: 'model/gltf+json' });
      const url = URL.createObjectURL(blob);
      setModel(url);
    };
    getModel();
  }, [props.id]);

  return <>
    {model && <Experience model={model} />}
  </>


}

