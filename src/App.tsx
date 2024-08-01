import React, { useEffect, useState } from 'react';
import './App.css';
import Nav from './Components/Nav';
import DesktopNav from './Components/DesktopNav';
import FormPage1 from './Components/FormPage1';
import FormPage2 from './Components/FormPage2';
import FormPage3 from './Components/FormPage3';
import FormPage4 from './Components/FormPage4';
import FinalPage from './Components/FinalPage';

interface FormData {
  name: string;
  email: string;
  phone: string;
  plan: 'Arcade' | 'Advanced' | 'Pro';
  planType: 'Monthly' | 'Yearly';
  addOns: string[];
}

interface Errors {
  name: string;
  email: string;
  phone: string;
}

function App() {
  const [currentState, setCurrentState] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    plan: 'Arcade',
    planType: 'Monthly',
    addOns: [],
  });

  const [errors, setErrors] = useState<Errors>({
    name: '',
    email: '',
    phone: '',
  });
  
  function changePlan() {
    setCurrentState(2);
  }

  const renderFormPage = () => {
    switch (currentState) {
      case 1:
        return <FormPage1 errors={errors} setErrors={setErrors} formData={formData} setFormData={setFormData}/>;
      case 2:
        return <FormPage2 formData={formData} setFormData={setFormData}/>;
      case 3:
        return <FormPage3 formData={formData} setFormData={setFormData}/>;
      case 4:
        return <FormPage4 formData={formData} changePlan={changePlan}/>;
      case 5:
        return <FinalPage/>;
      default:
        return <FormPage1 errors={errors} setErrors={setErrors} formData={formData} setFormData={setFormData}/>;
    }
  };

  useEffect(() => {
    setFormData((prevErrors: FormData) => ({...prevErrors, planType: 'Monthly'}));
  }, [])
  
  function nextStepValidation() {
    if(currentState===1) {
      if(formData.name === '') {
        setErrors((prevErrors: Errors) => ({...prevErrors, name: 'This field is required'}));
      } else if(formData.email === '') {
          setErrors((prevErrors: Errors) => ({...prevErrors, email: 'This field is required'}));
      } else if(formData.phone === '') {
          setErrors((prevErrors: Errors) => ({...prevErrors, phone: 'This field is required'}));
      } else if(errors.name === '' && errors.email === '' && errors.phone === '') {
        setCurrentState(prev => prev+1)
      }
    } else {
        setCurrentState(prev => prev+1)
    }
  }

  return (
    <>
      <Nav currentState={currentState}/>
      <main className='flex flex-col relative items-center justify-between bg-Magnolia h-[81.5vh] lg:h-[100vh]'>
        <div className={`w-11/12 bg-White rounded-xl px-6 py-6 relative -top-14 mb-auto md:w-8/12 lg:flex lg:w-[1000px] lg:mt-36  xl:w-[1100px]`}>
          <DesktopNav currentState={currentState}/>

          <form className={`${currentState===5 && "grid lg:block lg:w-8/12"} place-items-center lg:ml-12 xl:ml-24`}>
            {renderFormPage()}

            <section className={`lg:block hidden bg-White w-full ${currentState===5 ? "lg:hidden" : "lg:flex"} ${currentState===1 ? "justify-end" : "justify-between"} py-6 lg:mt-16`}>
              <button type='button' onClick={() => setCurrentState(prev => prev-1)} className={`${currentState===1 ? 'hidden' : "block"} text-Coolgray font-medium text-lg px-4 py-[8px] ml-4 duration-500 hover:text-Marineblue`}>Go Back</button>

              <button type='button' onClick={() => nextStepValidation()} className={`block text-White font-medium text-lg px-4 py-[8px] mr-4 rounded-md duration-500 ${currentState===4 ? 'bg-Purplishblue hover:opacity-65 px-8' : "bg-Marineblue hover:opacity-75"}`}>{currentState===4 ? 'Confirm' : "Next Step"}</button>
            </section>
          </form>
        </div>
        <section className={`lg:hidden bg-White w-full ${currentState===5 ? "hidden" : "flex"} ${currentState===1 ? "justify-end" : "justify-between"} py-6`}>
          <button type='button' onClick={() => setCurrentState(prev => prev-1)} className={`${currentState===1 ? 'hidden' : "block"} text-Coolgray font-medium text-lg px-4 py-[8px] ml-4 hover:bg-Purplishblue duration-500 hover:text-Marineblue`}>Go Back</button>

          <button type='button' onClick={() => nextStepValidation()} className={`block text-White font-medium text-lg px-4 py-[8px] mr-4 rounded-md duration-500 ${currentState===4 ? 'bg-Purplishblue hover:opacity-65"' : "bg-Marineblue hover:bg-Lightblue hover:opacity-75"}`}>{currentState===4 ? 'Confirm' : "Next Step"}</button>
        </section>
      </main>
    </>
  );
}

export default App;
