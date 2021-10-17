import { useForm } from 'react-hook-form'
import React from 'react'   
import jsonData from './data.json'
import { ErrorMessage } from '@hookform/error-message'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import {useTranslation} from 'react-i18next'
import Sidebox from './Sidebox'
//Second step of the form, takes data from the stepTwo array
// to dynamically generate input elements and labels 

function StepTwo({ setIsSubmitting,data,state,setState,step,prevStep,formattedData}) {
  const {t,i18n}=useTranslation()
  const formSchema= Yup.object().shape({
    username:Yup.string().required(t('errors.username.required')),
    email:Yup.string().required(t('errors.email.required')),
    password:Yup.string().required(t('errors.password.required')),
    password_confirm:Yup.string().required(t('errors.password_confirm.required'))
  }).required()   
  const {register,handleSubmit,formState:{errors}} = useForm({resolver: yupResolver(formSchema)})
      //grab names and default values from json data
      let initialValues = []
      jsonData.map((element) => initialValues.push({ code: element["code"], valueStr:"",dataType:"string" }))
      console.log(initialValues)
      
   const schema= Yup.array().of(Yup.object().shape({
        code:Yup.string().required(),
        valueStr:Yup.string().required(),
        dataType:Yup.string().required()
    }))
    
    
    const submitRegistration = (fields) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            schema.isValid(fields)
            .then((check)=>{
              if(check){resolve(fields)}
            
               else {
              reject({message: 'Error'});
            }})
          }, 1000);
        });
      }
    const onSubmit=(values)=>{
        console.log(values)
        const newState={...state,...values}
         
        setState(newState);
        setIsSubmitting(isSubmitting=>!isSubmitting)
        
              
        
    }
    const onBack=(values)=>{
        console.log(values)
        setState(state,values);
        
        return false
    }
    return (
      <div className="form-wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        {data.map(element =>
            <div id="input-div" key={element.code}>
                <label>{t(`labels.${element.code}`)}</label>
                <input defaultValue={state[element.code]} {...register(element.code)} name={element.code} />
                <div>
                <ErrorMessage  errors={errors} name={element.code}/>
                </div>
            </div>)}
            <div id="terms">
            <input type="checkbox" required="true"/>
            By checking this you agree to these <a href="https://www.google.com" target="_blank">terms and conditions</a></div>
            <button onClick={(e) =>{
             
             handleSubmit(onBack)(e.target.value)
            }}>{t('buttons.backButton')}</button>
            <button type="submit">{t('buttons.submitButton')}</button>
        </form>
            <div id="sidebar-container">
            <Sidebox/>
            </div>
            </div>)
}

export default StepTwo
