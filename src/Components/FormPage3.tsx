import React from "react";

interface FormData {
    name: string;
    email: string;
    phone: string;
    plan: 'Arcade' | 'Advanced' | 'Pro';
    planType: 'Monthly' | 'Yearly';
    addOns: string[];
}

interface propsInterface {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

interface AddOn {
    title: string;
    description: string;
    priceMo: number;
    priceYr: number;
}

export default function FormPage3(props: propsInterface) {
    const addOns = [
        {
            title: 'Online service',    
            description: 'Access to multiplayer games',
            priceMo: 1,
            priceYr: 10,
        },
        {
            title: 'Larger storage',    
            description: 'Extra 1TB of cloud save',
            priceMo: 2,
            priceYr: 20,
        },
        {
            title: 'Customizable profile',    
            description: 'Custom theme on your profile',
            priceMo: 2,
            priceYr: 20,
        }
    ]

    function toggleAddOn(addOn: string) {
        props.setFormData((prevState: FormData) => {
            const addOns = [...prevState.addOns];
            const addOnIndex = addOns.indexOf(addOn);
            if (addOnIndex === -1) {
                addOns.push(addOn);
            } else {
                addOns.splice(addOnIndex, 1);
            }
            return { ...prevState, addOns };
        });
    }

    const mappedAddOns = addOns.map((addOn: AddOn, index: number) => {
        const isChecked = props.formData.addOns.includes(addOn.title);

        return (
            <label key={index} htmlFor={addOn.title} className={`flex justify-between place-items-center border-solid border-2 ${isChecked ? 'border-Purplishblue bg-Magnolia' : 'border-Lightgray hover:border-Purplishblue'} duration-500 my-4 px-5 py-4 rounded-xl cursor-pointer lg:w-[600px]`}>
                <div className="grid place-items-center ">
                    <div className={`w-5 h-5 absolute left-10 lg:left-[310px] xl:left-[358px] ${isChecked ? 'bg-Purplishblue' : 'bg-transparent'} border-solid border-2 border-LightGray rounded-md grid place-items-center`}>
                        <input id={addOn.title} checked={isChecked} onChange={() => toggleAddOn(addOn.title)} type="checkbox" className="hidden"/>
                        {isChecked && <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9"><path fill="none" stroke="#FFF" stroke-width="2" d="m1 4 3.433 3.433L10.866 1"/></svg>}
                    </div>
                    <div className="ml-6 col-span-10">
                        <h3 className="font-bold text-Marineblue text-lg">{addOn.title}</h3>
                        <p className="text-sm text-Coolgray">{addOn.description}</p>
                    </div>
                </div>

                <div className="ml-8">
                    <p className="text-Purplishblue font-medium text-sm">+{props.formData.planType === "Monthly" ? `${addOn.priceMo}/mo` : `${addOn.priceYr}/yr`}</p>
                </div>
            </label>
        )
    })

    return (
        <>
            <h2 className="font-bold text-3xl lg:mt-6">Pick add-ons</h2>
            <p className="mt-4 text-Coolgray font-medium mb-6 lg:mt-0">Add-ons help enhance your gaming experience</p>

            {mappedAddOns}
        </>
    )
}