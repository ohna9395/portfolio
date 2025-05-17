class Animation {
	cols = 6;
	rows = 4;

	lineWidth = 40;
	markerName = "marker";
	spacingHorizontal = 100;
	spacingVertical = 100;
	strokeColor = getComputedStyle(document.documentElement).getPropertyValue('--arrows');
	strokeWidth = 10;

	svgMargin = 40;
	svgHeight = 0;
	svgWidth = 0;

	lines = [];
	screen = {
		width: window.innerWidth,
		height: window.innerHeight
	};
	mouse = {
		x: window.innerWidth / 2,
		y: window.innerHeight / 2
	};
	mouseStored = Object.assign({}, this.mouse);

	constructor(selector) {
		this.svg = document.querySelector(selector);

		this.svgWidth = this.cols * this.lineWidth + 2 * this.svgMargin + (this.cols - 1) * this.spacingHorizontal;
		this.svgHeight = this.rows + 2 * this.svgMargin + (this.rows - 1) * this.spacingVertical;

		this.svg.setAttribute("viewBox", `0 0 ${this.svgWidth} ${this.svgHeight}`);
		this.svg.setAttribute("stroke-linecap", "round");

		this.addEventListeners();
		// Create a marker for the lines
		this.createMarker();
		// Draw all the lines
		this.draw();
		// And animate them if the user is fine with it
		window.matchMedia('(prefers-reduced-motion: no-preference)').matches ? this.animate() : null;
	}

	addEventListeners() {
		let self = this;
		// Don't redraw everything, only recalculate the centers of all arrows
		window.addEventListener("resize", function() {
			self.screen.width = window.innerWidth;
			self.screen.height = window.innerHeight;
			self.setLineCenters();
		});
	}

	draw() {
		for(var i = 0; i < this.rows; i++) {
			for(var j = 0; j < this.cols; j++) {
				// We're drawing the initial lines horizontally
				let c = new Line(
					this.svgMargin + j*this.lineWidth + j*this.spacingHorizontal,
					this.svgMargin + (j+1)*this.lineWidth + j*this.spacingHorizontal,
					this.svgMargin + i*this.spacingVertical,
					this.svgMargin + i*this.spacingVertical,
					this.strokeColor,
					this.strokeWidth,
					this.markerName
				);

				// Set a transform origin and add the HTML element to the SVG
				const cElement = c.getElement();
				gsap.set(cElement, {transformOrigin: "50% 50%"});
				this.svg.appendChild(cElement);

				this.lines.push(c);
			}
		}

		this.setLineCenters();
	}

	createMarker() {
		let defs = document.createElementNS("http://www.w3.org/2000/svg", 'defs');
		let marker = document.createElementNS("http://www.w3.org/2000/svg", 'marker');

		marker.setAttribute("id", this.markerName);
		marker.setAttribute("viewBox", `0 0 ${this.strokeWidth} ${this.strokeWidth}`);
		marker.setAttribute("refX", this.strokeWidth / 2);
		marker.setAttribute("refY", this.strokeWidth / 2);
		marker.setAttribute("markerUnits", "strokeWidth");
		marker.setAttribute("markerWidth", this.strokeWidth / 4);
		marker.setAttribute("markerHeight", this.strokeWidth / 4);
		marker.setAttribute("fill", this.strokeColor);
		marker.setAttribute("orient", "auto");

		let path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
		path.setAttribute("d", `M 0 0 L ${this.strokeWidth} ${this.strokeWidth / 2} L 0 ${this.strokeWidth} z`);

		marker.appendChild(path);
		defs.appendChild(marker);
		this.svg.appendChild(defs);
	}

	setMouseCoords(event) {
		this.mouse.x = event.clientX;
		this.mouse.y = event.clientY;
	}

	setLineCenters() {
		this.lines.forEach(line => {
			// Get the center of the line
			// Instead of mapping svg coords to the screen position, get the position on the actual screen using boundingRect
			const boundingRect = line.getElement().getBoundingClientRect();
			line.center = {
				x: boundingRect.x + boundingRect.width / 2,
				y: boundingRect.y + boundingRect.height / 2
			};
		})
	}

	animate() {
		// Listen for the mouse movements
		window.addEventListener("mousemove", this.setMouseCoords.bind(this));
		// And use the ticker to update the rotation accordingly
		gsap.ticker.add(this.setLineRotation.bind(this));
	}

	setLineRotation() {
		// Don't do anything if the cursor's position is the same as in the previous tick
		if (this.mouseStored.x === this.mouse.x && this.mouseStored.y === this.mouse.y) return;

		this.lines.forEach(line => {
			// Calculate the rotation, convert it to deg, and offset it to account for the lines' initial direction
			let angle = Math.atan2(this.mouse.x - line.center.x, -(this.mouse.y - line.center.y) ) * (180 / Math.PI) - 90;

			gsap.to(
				line.getElement(),
				{
					// Use the shortest way to get to the destination angle
					rotation: angle + "_short"
				}
			);
		});

		// Store the mouse position for the next tick
		this.mouseStored.x = this.mouse.x;
		this.mouseStored.y = this.mouse.y;
	}
}

class Line {
	x1 = 0;
	x2 = 0;
	y1 = 0;
	y2 = 0;
	strokeColor = "white";
	strokeWidth = 1;
	marker = null;
	element = null;

	constructor(x1, x2, y1, y2, strokeColor, strokeWidth, marker) {
		this.x1 = x1;
		this.x2 = x2;
		this.y1 = y1;
		this.y2 = y2;
		this.strokeColor = strokeColor;
		this.strokeWidth = strokeWidth;
		this.marker = marker;
		this.element = document.createElementNS("http://www.w3.org/2000/svg", 'line');

		this.setElement();
	}

	getElement() {
		return this.element;
	}

	setElement(x1, x2, y1, y2, strokeColor, strokeWidth, marker) {
		this.element.setAttribute("x1", x1 ? x1 : this.x1);
		this.element.setAttribute("x2", x2 ? x2 : this.x2);
		this.element.setAttribute("y1", y1 ? y1 : this.y1);
		this.element.setAttribute("y2", y2 ? y2 : this.y2);
		this.element.style.stroke = strokeColor ? strokeColor : this.strokeColor;
		this.element.style.strokeWidth = strokeWidth ? strokeWidth : this.strokeWidth;
		this.element.setAttribute("marker-end", marker ? `url(#${marker})` :  `url(#${this.marker})`);
	}
}

const animation = new Animation("#animation");
document.addEventListener('DOMContentLoaded', function() {
    const animation = new Animation("#animation");
});