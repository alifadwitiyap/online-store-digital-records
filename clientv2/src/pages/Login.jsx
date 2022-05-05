import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import { login } from '../features/userSlice';
import axios from '../utils/axios';

function Login() {
  const { register, handleSubmit } = useForm();
  const [errorForm, setErrorForm] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post('/users/login', data);
      const user = response.data.data;
      dispatch(login(user));
      navigate('/');
    } catch (error) {
      if (error?.response?.data?.message)
        setErrorForm(error.response.data.message);
      else
        setErrorForm('Login gagal');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-screen bg-purple-600 flex flex-col justify-center items-center">
      <Title className="text-white text-xl">
        {'Online Store\nDigital Records'}
      </Title>
      <form onSubmit={handleSubmit(onSubmit)} className="py-16 px-8 w-1/4 min-w-fit rounded-md bg-white my-6">
        <Title className="text-black text-xl mb-4">Masuk</Title>
        <div className="mb-7">
          <input {...register('username')} type="text" className="input-field" placeholder="Username" />
        </div>
        <div className="mb-7">
          <input {...register('password')} type="password" className="input-field" placeholder="Password" />
        </div>
        {errorForm && <p className="text-red-600 text-center text-sm">{errorForm}</p>}
        <div className="flex flex-col items-center mt-12">
          {loading ? (
            <button type="button" className="btn">loading...</button>
          ) : (
            <button type="submit" className="btn">Masuk</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
