const data = [
	{
		id: 1,
		url: "https://www.w3schools.com/howto/img_woods_wide.jpg",
		title: "The Woods",
	},

	{
		id: 2,
		url: "https://www.w3schools.com/howto/img_5terre_wide.jpg",
		title: "Cinque Terre",
	},

	{
		id: 3,
		url: "https://www.w3schools.com/howto/img_mountains_wide.jpg",
		title: "Mountains and fjords",
	},

	{
		id: 4,
		url: "https://www.w3schools.com/howto/img_lights_wide.jpg",
		title: "Northern Lights",
	},

	{
		id: 5,
		url: "https://www.w3schools.com/howto/img_nature_wide.jpg",
		title: "Nature and sunrise",
	},

	{
		id: 6,
		url: "https://www.w3schools.com/howto/img_snow_wide.jpg",
		title: "Snowy Mountains",
	},
];

class Node {
	constructor(data) {
		this.prev = null;
		this.next = null;
		this.value = data;
	}
}

class CircularLinkedList {
	constructor() {
		this.count = 0;
		this.head = null;
		this.tail = null;
	}

	insertNode(node) {
		if (!this.count) {
			this.head = node;
			this.tail = node;
		} else {
			this.tail.next = node;
			node.prev = this.tail;
			this.tail = node;
		}

		this.tail.next = this.head;
		this.head.prev = this.tail;
		this.count++;
	}
}

function renderHTML(container, items) {
	const fragment = document.createDocumentFragment();
	const template = document.querySelector("#template");
	for (const item of items) {
		const slide = template.content.cloneNode(true);
		slide.querySelector("figure").setAttribute("id", `slide-${item.id}`);
		slide.querySelector("figure .item-id").textContent = item.id;
		slide.querySelector("figure .item-title").textContent = item.title;
		slide.querySelector("figure .item-img").setAttribute("src", item.url);
		slide.querySelector("figure .item-img").setAttribute("alt", item.title);
		fragment.append(slide);
	}
	container.append(fragment);
	container.querySelector("figure.hidden").className = "visible";
}

function showNode(selected, current) {
	document.querySelector(`#slide-${selected}`).className = "visible";
	document.querySelector(`#slide-${current}`).className = "hidden";
}

function fillList(data, list) {
	data.map((item) => list.insertNode(new Node(item)));
	return list.head;
}

const list = new CircularLinkedList();
let current = fillList(data, list);
const imgContainer = document.querySelector(".img-container");

renderHTML(imgContainer, data);

imgContainer.addEventListener("click", (event) => {
	const target = event.target;

	if (target.classList.contains("switch-btn")) {
		const node = current[target.value];
		showNode(node.value.id, current.value.id);
		current = node;
	}
});
