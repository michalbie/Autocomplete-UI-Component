import React from "react";
import "./Dropdown.css";

interface DropdownElementProps {
	name: string;
	selected: boolean;
	onHover: () => void;
	addTag: (name: string) => void;
}

const DropdownElement: React.FC<DropdownElementProps> = (props: DropdownElementProps) => {
	return props.selected == true ? (
		<div
			className="dropdown-element"
			style={{ backgroundColor: "#cacaca" }}
			onClick={() => {
				props.addTag(props.name);
			}}
		>
			{props.name}
		</div>
	) : (
		<div
			className="dropdown-element"
			style={{ backgroundColor: "#f3f3f3" }}
			onMouseOver={() => props.onHover()}
			onClick={() => props.addTag(props.name)}
		>
			{props.name}
		</div>
	);
};

export default DropdownElement;
