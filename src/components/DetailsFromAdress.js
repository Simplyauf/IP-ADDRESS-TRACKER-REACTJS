import React from "react";

export const DetailsFromIpAddress = (props) => {
	const { Coordinate, Loading } = props;
	const { connection, timezone, ip, region } = Coordinate;
	const { isp } = connection;
	const { utc } = timezone;

	return (
		<article className="flex z-[2000] mt-8 sticky flex-col gap-4 items-center justify-center border-[1px] bg-white rounded-md drop-shadow-lg shadow-lg mx-[6%] md:mx-[9%]  md:flex-row md:gap-6  md:justify-around  md:pb-8  md:items-start laptop:mx-[12%] lg:mx-[8%]  pt-4 pb-4 md:pl-[4%] md:pr-[6%]">
			<div className="text-center md:text-left   md:pr-[4%]">
				<span className="text-[12px] font-Rubik text-NeutralColor font-bold  tracking-[2px] leading-[3px] ">IP ADDRESS</span>
				<h2 className="font-bold lg:text-[20px] laptop:text-[21px] current-ipAddress transition-all">{Loading ? "?????" : ip}</h2>
			</div>

			<div className="text-center md:text-left md:border-l-[1px] md:border-r-[1px] md:pl-[4%] md:pr-[5%]">
				<span className="text-[12px] text-NeutralColor font-bold tracking-[2px] leading-[3px]">LOCATION</span>
				<h2 className="font-bold lg:text-[20px] laptop:text-[21px] ipAddress-location transition-all duration-300">{Loading ? "?????" : region}</h2>
			</div>

			<div className="text-center basis-[27%] md:text-left   md:pr-[8%]">
				<span className="text-[12px] text-NeutralColor font-bold tracking-[2px] leading-[3px]">TIMEZONE</span>
				<h2 className="font-bold lg:text-[20px] laptop:text-[21px] ipAddress-timezone transition-all duration-300">{Loading ? "?????" : isp}</h2>
			</div>

			<div className="text-center md:border-l-[1px]">
				<span className="text-[12px] text-NeutralColor font-bold tracking-[2px] leading-[3px]">ISP</span>
				<h2 className="font-bold lg:text-[20px] laptop:text-[21px] ipAddress-ISP transition-all duration-300">{Loading ? "?????" : utc}</h2>
			</div>
		</article>
	);
};
