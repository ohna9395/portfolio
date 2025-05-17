class Animation {
    cols = 10;
    rows = 6;
  
    lineWidth = 50;
    markerName = "marker";
    spacingHorizontal = 120;
    spacingVertical = 120;
    strokeColor = getComputedStyle(document.documentElement).getPropertyValue('--arrows') || 'white';
    strokeWidth = 10;
  
    svgMargin = 50;
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
      this.createMarker();
      this.draw();
      window.matchMedia('(prefers-reduced-motion: no-preference)').matches ? this.animate() : null;
    }
  
    addEventListeners() {
      let self = this;
      window.addEventListener("resize", function () {
        self.screen.width = window.innerWidth;
        self.screen.height = window.innerHeight;
        self.setLineCenters();
      });
    }
  
    draw() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          let c = new Line(
            this.svgMargin + j * this.lineWidth + j * this.spacingHorizontal,
            this.svgMargin + (j + 1) * this.lineWidth + j * this.spacingHorizontal,
            this.svgMargin + i * this.spacingVertical,
            this.svgMargin + i * this.spacingVertical,
            this.strokeColor,
            this.strokeWidth,
            this.markerName
          );
  
          const cElement = c.getElement();
          gsap.set(cElement, { transformOrigin: "50% 50%" });
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
        const boundingRect = line.getElement().getBoundingClientRect();
        line.center = {
          x: boundingRect.x + boundingRect.width / 2,
          y: boundingRect.y + boundingRect.height / 2
        };
      });
    }
  
    animate() {
      window.addEventListener("mousemove", this.setMouseCoords.bind(this));
      gsap.ticker.add(this.setLineRotation.bind(this));
    }
  
    setLineRotation() {
      if (this.mouseStored.x === this.mouse.x && this.mouseStored.y === this.mouse.y) return;
  
      this.lines.forEach(line => {
        let angle = Math.atan2(this.mouse.x - line.center.x, -(this.mouse.y - line.center.y)) * (180 / Math.PI) - 90;
  
        gsap.to(line.getElement(), {
          rotation: angle + "_short"
        });
      });
  
      this.mouseStored.x = this.mouse.x;
      this.mouseStored.y = this.mouse.y;
    }
  }
  
  class Line {
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
      this.element.setAttribute("x1", x1 ?? this.x1);
      this.element.setAttribute("x2", x2 ?? this.x2);
      this.element.setAttribute("y1", y1 ?? this.y1);
      this.element.setAttribute("y2", y2 ?? this.y2);
      this.element.setAttribute("stroke", strokeColor ?? this.strokeColor);
      this.element.setAttribute("stroke-width", strokeWidth ?? this.strokeWidth);
      this.element.setAttribute("marker-end", marker ? `url(#${marker})` : `url(#${this.marker})`);
    }
  }
  
  const animation = new Animation("#animation");
  

//   