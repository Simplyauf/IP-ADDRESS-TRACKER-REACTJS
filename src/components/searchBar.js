import React from "react";
import { useEffect, useRef } from "react";

export const SearchBar = ({ handleDisplayMapClick, errorModalFn }) => {
	//ACESSING THE DOM OF ERROR MODAL ELEMENT
	let errorRef = useRef();

	// PASSING ERROR MODAL ELEMENT TO A FN IN APP.JS
	useEffect(() => {
		errorModalFn(errorRef.current);
	}, [errorModalFn]);

	return (
		<div className="flex relative w-[100%] md:w-[55%] tablet:w-[70%]  lg:w-[50%] px-[6%] mt-8 mx-auto items-center ">
			<span ref={errorRef} className="absolute hidden italic font-bold text-[#ffff00] font-mono uppercase  text-md bottom-14 Error-Modal ">
				whshhshsdhdshssd
			</span>
			<input required placeholder="Search for any IP address or domain" className="pl-4 placeholder:text-[14px]  md:placeholder:text-[16px] placeholder:font-Rubik lg:text-18px lg:placeholder:text-[18px] tablet:placeholder:text-[16px]   placeholder:font-normal placeholder:text-NeutralColor w-[90%]  text-[18px] rounded-2xl focus:border-none focus focus:outline-none focus:ring-none rounded-tr-none rounded-br-none border-2 h-[50px] input-ipAddress" type="text" />
			<img className="Btn rounded-xl border-none bg-black rounded-tl-none rounded-bl-none  border-l-0 p-[18px]" src="/images/icon-arrow.svg" onClick={handleDisplayMapClick} alt="" />
		</div>
	);
};
