import React, { useState, useEffect } from "react";

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
    changePlan: Function;
}

export default function FormPage4(props: propsInterface) {
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const planPrice = () => {
        if(props.formData.planType === "Yearly") {
            if(props.formData.plan === "Arcade") {
                return 90;
            } else if(props.formData.plan === "Advanced") {
                return 120;
            } else if(props.formData.plan === "Pro") {
                return 150;
            }
        }

        if(props.formData.planType === "Monthly") {
            if(props.formData.plan === "Arcade") {
                return 9;
            } else if(props.formData.plan === "Advanced") {
                return 12;
            } else if(props.formData.plan === "Pro") {
                return 15;
            }
        }
        return 0;
    }

    const addOnsPrice = (addOn: string) => {
        if (props.formData.planType === "Monthly") {
            if (addOn === "Online service") {
                return 1;
            } else if (addOn === "Larger storage") {
                return 2;
            } else if (addOn === "Customizable profile") {
                return 2;
            }
        }

        if (props.formData.planType === "Yearly") {
            if (addOn === "Online service") {
                return 10;
            } else if (addOn === "Larger storage") {
                return 20;
            } else if (addOn === "Customizable profile") {
                return 20;
            }
        }
        return 0;
    };

    useEffect(() => {
        let total: number = planPrice();
        props.formData.addOns.forEach((addOn: string) => {
            total += addOnsPrice(addOn);
        });
        setTotalPrice(total);
    }, [props.formData]);

    const mappedAddOns = props.formData.addOns.map((addOn: string, index: number) => {
        return (
            <div key={index} className="flex justify-between mt-2">
                <p className="text-Coolgray text-sm font-medium">{addOn}</p>
                <p className="text-Marineblue font-medium text-sm">+${addOnsPrice(addOn)}/{props.formData.planType === "Yearly" ? "yr" : "mo"}</p>
            </div>
        )
    })

    return (
        <>
            <h2 className="font-bold text-3xl lg:mt-6">Finishing up</h2>
            <p className="mt-4 text-Coolgray font-medium mb-6 lg:mt-0">Double-check everything looks OK before confirming.</p>

            <div className="bg-Magnolia px-5 py-4 rounded-xl lg:w-[600px]">
                <div className="flex justify-between mb-2">
                    <div>
                        <h4 className="font-bold text-Marineblue">{props.formData.plan} ({props.formData.planType})</h4>
                        <p onClick={() => props.changePlan()} className="text-Coolgray border-b-2 border-Coolgray hover:border-Purplishblue w-fit leading-5 cursor-pointer duration-500 hover:text-Purplishblue">Change</p>
                    </div>
                    <p className="text-Marineblue font-bold cursor-pointer mt-3">${planPrice()}/{props.formData.planType === "Yearly" ? "yr" : "mo"}</p>
                </div>

                <hr className="border-Coolgray mb-6"/>

                {mappedAddOns}
            </div>


            <div className="flex justify-center">
                <article className="flex justify-between w-[95%] mt-6">
                    <p className="text-Coolgray text-sm font-medium text-[15px]">Total (per {props.formData.planType === "Yearly" ? "year" : "month"})</p>
                    <p className="text-Coolgray text-sm font-bold text-[17px] text-Purplishblue lg:text-lg">${totalPrice}/{props.formData.planType === "Yearly" ? "yr" : "mo"}</p>
                </article>
            </div>
        </>
    )
}