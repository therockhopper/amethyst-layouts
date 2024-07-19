function layout() {
	return {
		name: "PIP",
		initialState: {},
		getFrameAssignments: (windows, screenFrame, state) => {
			const fraction = 3.75 / 5;
			const firstTwoColumnsWidth = screenFrame.width * fraction;
			const lastColumnWidth = screenFrame.width - firstTwoColumnsWidth;
			const columnWidth = firstTwoColumnsWidth / (windows.length - 1);

			const focusedWindowID = state.focusedWindowID || (windows.length > 0 ? windows[0].id : null);

			const frames = windows.map((window, index) => {
				let frame;
				if (window.id === focusedWindowID) {
					frame = {
						x: screenFrame.x + firstTwoColumnsWidth,
						y: screenFrame.y,
						width: lastColumnWidth,
						height: screenFrame.height / 2.04
					};
				} else {
					const nonFocusedIndex = windows.filter(win => win.id !== focusedWindowID).findIndex(win => win.id === window.id);
					frame = {
						x: screenFrame.x + (columnWidth * nonFocusedIndex),
						y: screenFrame.y,
						width: columnWidth,
						height: screenFrame.height
					};
				}
				return { [window.id]: frame };
			});

			return frames.reduce((frames, frame) => ({ ...frames, ...frame }), {});
		},
		commands: {
			focusWindow: {
				description: "Focus a window",
				updateState: (state, focusedWindowID) => {
					return { ...state, focusedWindowID };
				}
			}
		}
	};
}
