import React from "react";

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

interface propsInterface {
    formData: FormData;
    errors: Errors;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    setErrors: React.Dispatch<React.SetStateAction<Errors>>;
}

export default function FormPage1(props: propsInterface) {

    function validateName(e: React.ChangeEvent<HTMLInputElement>) {
        const Name = e.target.value.trim();

        if (Name === '') {
            props.setErrors((prevErrors: Errors) => ({...prevErrors, name: 'This field is required'}));
            props.setFormData((prevState: FormData) => ({...prevState, name: ''}));
        } else if(Name.length <= 2) {
            props.setErrors((prevErrors: Errors) => ({...prevErrors, name: 'Name is too short'}));
            props.setFormData((prevState: FormData) => ({...prevState, name: ''}));
        } else {
            props.setErrors((prevErrors: Errors) => ({...prevErrors, name: ''}));
            props.setFormData((prevState: FormData) => ({...prevState, name: Name}));
        }
    }

    function validateEmail(e: React.ChangeEvent<HTMLInputElement>) {
        const Email = e.target.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (Email === '') {
            props.setErrors((prevErrors: Errors) => ({...prevErrors, email: 'This field is required'}));
            props.setFormData((prevState: FormData) => ({...prevState, email: ''}));
        } else if (!emailRegex.test(Email)) {
            props.setErrors((prevErrors: Errors) => ({...prevErrors, email: 'Invalid email address'}));
            props.setFormData((prevState: FormData) => ({...prevState, email: ''}));
        } else {
            props.setErrors((prevErrors: Errors) => ({...prevErrors, email: ''}));
            props.setFormData((prevState: FormData) => ({...prevState, email: Email}));
        }
    }

    function validatePhone(e: React.ChangeEvent<HTMLInputElement>) {
        const Phone = e.target.value.trim();
        const phoneRegex = /^\+\d{1,2} \d{3} \d{3} \d{3}$/;

        if (Phone === '') {
            props.setErrors((prevErrors: Errors) => ({...prevErrors, phone: 'This field is required'}));
            props.setFormData((prevState: FormData) => ({...prevState, phone: ''}));
        } else if (!phoneRegex.test(Phone)) {
            props.setErrors((prevErrors: Errors) => ({...prevErrors, phone: 'Invalid format'}));
            props.setFormData((prevState: FormData) => ({...prevState, phone: ''}));
        } else {
            props.setErrors((prevErrors: Errors) => ({...prevErrors, phone: ''}));
            props.setFormData((prevState: FormData) => ({...prevState, phone: Phone}));
        }
    }

    return (
        <>
            <h1 className="font-bold text-3xl lg:mt-6">Personal info</h1>
            <p className="mt-4 text-Coolgray font-medium mb-6 lg:mt-0">Please provide your name, email adress, and phone number.</p>

            <div className="flex justify-between">
                <label htmlFor="form--name">Name</label>
                {props.errors.name && (
                    <p className="text-Strawberryred font-bold text-sm">{props.errors.name}</p>
                )}
            </div>
            <input value={props.formData.name !== '' ? props.formData.name : ''} onChange={validateName} id="form--name" placeholder="e.g. Stephen King" className={`font-bold text-Marineblue border-solid border-2 w-full xl:w-[600px] rounded-md px-4 py-[8px] mb-4 placeholder:font-medium focus:border-Marineblue outline-none hover:border-Purplishblue duration-500 ${props.errors.name ? "border-Strawberryred" : ""}`} type="text" />

            <br/>

            <div className="flex justify-between">
                <label htmlFor="form--email">Email Address</label>
                {props.errors.email && (
                    <p className="text-Strawberryred font-bold text-sm">{props.errors.email}</p>
                )}
            </div>
            <input value={props.formData.email !== '' ? props.formData.email : ''} onChange={validateEmail} id="form--email"  placeholder="e.g. stephenking@lorem.com" className={`font-bold text-Marineblue border-solid border-2 w-full rounded-md px-4 py-[8px] mb-4 placeholder:font-medium focus:border-Marineblue outline-none hover:border-Purplishblue duration-500 ${props.errors.email ? "border-Strawberryred" : ""}`} type="email" />

            <br/>

            <div className="flex justify-between">
                <label htmlFor="form--phone-number">Phone Number</label>
                {props.errors.phone && (
                    <p className="text-Strawberryred font-bold text-sm">{props.errors.phone}</p>
                )}
            </div>
            <input value={props.formData.phone !== '' ? props.formData.phone : ''} onChange={validatePhone} id="form--phone-number" placeholder="e.g. +1 234 567 890" className={`font-bold text-Marineblue border-solid border-2 w-full rounded-md px-4 py-[8px] mb-4 placeholder:font-medium focus:border-Marineblue outline-none hover:border-Purplishblue duration-500 ${props.errors.phone ? "border-Strawberryred" : ""}`} type="tel" />
        </>
    )
}