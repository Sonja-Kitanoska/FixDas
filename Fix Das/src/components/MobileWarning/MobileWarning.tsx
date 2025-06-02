export const MobileWarning = () => (
	<div
		id="warningMessage"
		style={{
			display: "flex",
			height: "100vh",
			justifyContent: "center",
			alignItems: "center",
			textAlign: "center",
			padding: "2rem",
			backgroundColor: "#FAFAFA",
			position: "fixed",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			zIndex: 9999,
		}}
	>
		<h2
			style={{
				maxWidth: "80vw",
				fontSize: "2rem",
				fontFamily: "'Reenie Beanie', cursive",
			}}
		>
			This app is designed for mobile devices only. Please visit this page on a
			smaller screen.
		</h2>
	</div>
);

export default MobileWarning;
