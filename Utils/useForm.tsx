import { useState } from 'react'
import { useRouter } from "next/router";

export const useForm = (options) => {

  const [data, setData] = useState(options?.initialValues || {});
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const handleChange = (
    key,
  ) => (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [key]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (options?.onSubmit){
      options.onSubmit();
    }
    fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString()
    }).then(() => router.push('/contact/thankyou')).catch((error) =>
      console.log(error))
  };

  return {
    data,
    handleChange,
    handleSubmit,
    errors,
  };
};