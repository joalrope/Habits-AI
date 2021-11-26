const getMultiplication = (char) => {
	const multiplication = [];
	char.split("*").forEach((op) => {
		if (op.includes("/")) {
			const division = op.split("/");
			return multiplication.push(Number(division[0]) / Number(division[1]));
		}
		return multiplication.push(Number(op));
	});
	return multiplication.reduce((total, num) => total * num);
};

const calculateText = (text) => {
	if (!text) return;
	let addents = [];
	let subtrahends = [];

	text.split("+").forEach((item) => {
		if (!isNaN(item)) return addents.push(item);

		if (item.includes("-")) {
			item.split("-").forEach((el, index) => {
				if (index === 0) {
					return addents.push(el);
				}
				return subtrahends.push(el);
			});
		} else if (item.includes("*") || item.includes("/")) {
			return addents.push(item);
		}
	});

	addents.forEach((item, index) => {
		if (!isNaN(item)) return (addents[index] = Number(item));
		return (addents[index] = getMultiplication(item));
	});

	subtrahends.forEach((item, index) => {
		if (!isNaN(item)) return (subtrahends[index] = Number(item));
		return (subtrahends[index] = getMultiplication(item));
	});

	const sum =
		addents.length > 0 ? addents.reduce((total, num) => total + num) : 0;

	const subtraction =
		subtrahends.length > 0
			? subtrahends.reduce((total, num) => total + num)
			: 0;

	const result = sum - subtraction;

	return result;
};

const renderTag = document.querySelector("#result");
const button = document.querySelector("#calculate");

button.onclick = function () {
	const mathOp = document.querySelector("#input-text").value;
	renderTag.innerHTML = calculateText(mathOp);
};
