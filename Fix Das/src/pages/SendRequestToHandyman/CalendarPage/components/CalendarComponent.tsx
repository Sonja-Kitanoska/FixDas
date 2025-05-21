import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./CalendarComponent.module.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Props {
	value: Value;
	onChange: (value: Value) => void;
	disabledDates?: Date[];
}

const CalendarComponent = ({ value, onChange, disabledDates = [] }: Props) => {
	const isDisabled = (date: Date) => {
		return disabledDates.some(
			(disabledDate) =>
				date.getFullYear() === disabledDate.getFullYear() &&
				date.getMonth() === disabledDate.getMonth() &&
				date.getDate() === disabledDate.getDate()
		);
	};
	return (
		<Calendar
			onChange={onChange}
			value={value}
			selectRange={false}
			className={styles.calendar}
			tileDisabled={({ date }) => isDisabled(date)}
		/>
	);
};

export default CalendarComponent;
