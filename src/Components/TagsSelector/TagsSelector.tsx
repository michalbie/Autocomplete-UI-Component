import React, { useEffect, useState } from "react";
import TagsInput from "./TagsInput/TagsInput";
import SelectedTagsSection from "./SelectedTagsSection/SelectedTagsSection";
import "./TagsSelector.css";
import TagMarker from "./TagMarker/TagMarker";
import Dropdown from "./Dropdown/Dropdown";

const TagsSelector: React.FC = () => {
	const [tagsList, setTagsList] = useState<string[]>([]);
	const [matchingTagsList, setMatchingTagsList] = useState<string[]>([]);
	const [currentPhrase, setCurrentPhrase] = useState<string>("");

	const [selectedTags, setSelectedTags] = useState([
		{ id: 0, name: "JavaScript", element: <TagMarker key={0} id={0} name="JavaScript" removeTag={removeTag}></TagMarker> },
		{ id: 1, name: "Ruby", element: <TagMarker key={1} id={1} name="Ruby" removeTag={removeTag}></TagMarker> },
		{ id: 2, name: "React", element: <TagMarker key={2} id={2} name="React" removeTag={removeTag}></TagMarker> },
	]);

	useEffect(() => {
		downloadTags();
	}, []);

	function downloadTags() {
		const data = fetch("tags.json", {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				setTagsList(myJson.tags);
			});
	}

	function removeTag(id: number): void {
		setSelectedTags((oldList) => {
			const newList = oldList.filter((el) => {
				return el.id != id;
			});
			return newList;
		});
	}

	function addTag(name: string) {
		let canAdd = true;
		selectedTags.forEach((el) => {
			if (name == el.name) canAdd = false;
		});

		if (canAdd) {
			let newId = 0;
			if (selectedTags.length != 0) newId = selectedTags[selectedTags.length - 1].id + 1;

			setSelectedTags((old) => [
				...old,
				{ id: newId, name: name, element: <TagMarker key={newId} id={newId} name={name} removeTag={removeTag}></TagMarker> },
			]);
		}
	}

	function updateMatchingTags(phrase: string): void {
		if (phrase != "") {
			const regexp = new RegExp(`^${phrase}`, "i");
			setMatchingTagsList(() => {
				return tagsList.filter((tag) => {
					return regexp.test(tag);
				});
			});
		} else {
			setMatchingTagsList([]);
		}
		setCurrentPhrase((oldPhrase) => phrase);
	}

	return (
		<div className="tags-selector">
			<div className="content-wrapper">
				{selectedTags.map((el) => {
					return el.element;
				})}

				<TagsInput updateMatchingTags={updateMatchingTags}></TagsInput>
			</div>
			<Dropdown matchingTagsList={matchingTagsList} addTag={addTag} currentPhrase={currentPhrase}></Dropdown>
		</div>
	);
};

export default TagsSelector;
