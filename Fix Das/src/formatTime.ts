export const formatTime = (isoString: string) => {
	const date = new Date(isoString);

	const optionsDayDate: Intl.DateTimeFormatOptions = {
		weekday: "short",
		day: "numeric",
		month: "short",
	};
	const dayDate = date.toLocaleDateString("en-US", optionsDayDate);

	const hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12 ? "pm" : "am";
	const hour12 = hours % 12 === 0 ? 12 : hours % 12;
	const timeLabel = `${hour12}${minutes === 0 ? "" : `:${minutes}`} ${ampm}`;

	let partOfDay = "Morning";
	if (hours >= 12 && hours < 17) partOfDay = "Afternoon";
	else if (hours >= 17) partOfDay = "Evening";

	return {
		dayDate, // "Wed, 8 Nov"
		partOfDayTime: `${partOfDay} ${timeLabel}`, // "Morning 9 am"
	};
};
