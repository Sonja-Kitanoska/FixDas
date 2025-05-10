import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Props {
	value: Value;
	onChange: (value: Value) => void;
}

const CalendarComponent = ({ value, onChange }: Props) => {
	return <Calendar onChange={onChange} value={value} selectRange={false} />;
};

export default CalendarComponent;
