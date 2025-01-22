function layout() {
	return {
		name: "Middle Main, One Side Full, Other Tiled",
		getFrameAssignments: (windows, screenFrame) => {
			const totalWindows = windows.length;

			if (totalWindows === 0) return {};

			const middleWidth = (1 / 2) * screenFrame.width; // Middle pane width set to 1/2
			const sideWidth = (screenFrame.width - middleWidth) / 2;
			const frames = {};

			if (totalWindows === 1) {
				// Single window takes the middle area
				frames[windows[0].id] = {
					x: sideWidth,
					y: 0,
					width: middleWidth,
					height: screenFrame.height,
				};
			} else {
				// Main middle window
				frames[windows[0].id] = {
					x: sideWidth,
					y: 0,
					width: middleWidth,
					height: screenFrame.height,
				};

				// Full-height window on the left side
				frames[windows[1].id] = {
					x: 0,
					y: 0,
					width: sideWidth,
					height: screenFrame.height,
				};

				// Tiling remaining windows into the right column
				const sideWindows = totalWindows - 2;
				for (let i = 2; i < totalWindows; i++) {
					frames[windows[i].id] = {
						x: sideWidth + middleWidth,
						y: ((i - 2) / sideWindows) * screenFrame.height,
						width: sideWidth,
						height: screenFrame.height / sideWindows,
					};
				}
			}

			return frames;
		},
	};
}
