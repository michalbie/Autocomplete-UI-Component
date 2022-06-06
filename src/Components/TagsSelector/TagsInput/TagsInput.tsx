import React, { useRef } from "react";
import "./TagsInput.css";

interface TagsInputProps {
	updateMatchingTags: (currentPhrase: string) => void;
}

const TagsInput: React.FC<TagsInputProps> = (props: TagsInputProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<div className="tags-input-wrapper">
			<input
				type={"text"}
				name="tag-input"
				id="tag-input"
				placeholder="Select tags"
				ref={inputRef}
				onChange={() => props.updateMatchingTags(inputRef?.current?.value!)}
			></input>
		</div>
	);
};

export default TagsInput;
