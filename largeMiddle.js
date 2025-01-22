function layout() {
	return {
		name: "Middle Reduced, Side Split (No Gaps)",
		getFrameAssignments: (windows, screenFrame) => {
			const totalWindows = windows.length;

			if (totalWindows === 0) return {};

			const middleWidth = (1 / 2) * screenFrame.width; // Reduce the middle pane width to 1/2
			const sideWidth = (screenFrame.width - middleWidth) / 2;
			const adjustedMiddleWidth = middleWidth; // Ensure no gaps by aligning exactly

			const frames = {};

			if (totalWindows === 1) {
				// Single window takes the middle area
				frames[windows[0].id] = {
					x: sideWidth,
					y: 0,
					width: adjustedMiddleWidth,
					height: screenFrame.height,
				};
			} else {
				// Distribute windows across side and middle areas
				windows.forEach((w, index) => {
					if (index === 0) {
						// First window on the left side
						frames[w.id] = {
							x: 0,
							y: 0,
							width: sideWidth,
							height: screenFrame.height,
						};
					} else if (index === 1) {
						// Second window in the middle
						frames[w.id] = {
							x: sideWidth,
							y: 0,
							width: adjustedMiddleWidth,
							height: screenFrame.height,
						};
					} else {
						// Remaining windows on the right side
						frames[w.id] = {
							x: sideWidth + middleWidth,
							y: 0,
							width: sideWidth,
							height: screenFrame.height,
						};
					}
				});
			}

			return frames;
		},
	};
}

