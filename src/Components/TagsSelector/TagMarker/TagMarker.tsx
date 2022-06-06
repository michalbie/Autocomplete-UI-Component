import React, { useRef } from "react";
import "./TagMarker.css";

interface TagMarkerProps {
	id: number;
	name: string;
	removeTag: (id: number) => void;
}

const TagMarker: React.FC<TagMarkerProps> = (props: TagMarkerProps) => {
	const marker = useRef<HTMLDivElement | null>(null);

	return (
		<div className="tag-marker" ref={marker}>
			<p>{props.name}</p>

			<button className="tag-close-btn" onClick={() => props.removeTag(props.id)}>
				x
			</button>
		</div>
	);
}

export default TagMarker;
