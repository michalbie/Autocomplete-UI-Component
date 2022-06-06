import React, { useEffect, useRef, useState } from "react";
import "./Dropdown.css";
import DropdownElement from "./DropdownElement";

interface DropdownProps {
	matchingTagsList: string[];
	addTag: (name: string) => void;
	currentPhrase: string;
}

const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
	const [currentSelected, setCurrentSelected] = useState<number>(-1);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	});

	useEffect(() => {
		setCurrentSelected(-1);
	}, [props.matchingTagsList]);

	const handleKeyDown = (event: KeyboardEvent) => {
		const listSize = props.matchingTagsList.length;

		if (event.key == "ArrowUp") {
			event.preventDefault();
			if (currentSelected < 0) setCurrentSelected(listSize - 1);
			else setCurrentSelected((prev) => prev - 1);
		} else if (event.key == "ArrowDown") {
			event.preventDefault();
			if (currentSelected == listSize - 1) setCurrentSelected(-1);
			else setCurrentSelected((prev) => prev + 1);
		} else if (event.key == "Enter") {
			if (currentSelected != -1) props.addTag(props.matchingTagsList[currentSelected]);
			else if (props.currentPhrase.length > 0) props.addTag(props.currentPhrase);
		}
	};

	const dropdownElements = props.matchingTagsList.map((el, i) => {
		return (
			<DropdownElement
				key={i}
				name={el}
				selected={i == currentSelected ? true : false}
				onHover={() => setCurrentSelected(i)}
				addTag={props.addTag}
			></DropdownElement>
		);
	});

	return props.matchingTagsList.length > 0 ? <div className="dropdown">{dropdownElements}</div> : null;
};

export default Dropdown;
