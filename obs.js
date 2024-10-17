function layout() {
	return {
		name: "Centered Window",
		getFrameAssignments: (windows, screenFrame) => {
			const windowWidth = screenFrame.width / 2;
			const centeredFrame = {
				x: (screenFrame.width - windowWidth) / 2,
				y: 0,
				width: windowWidth,
				height: screenFrame.height,
			};

			return windows.reduce((frames, w) => ({ ...frames, [w.id]: centeredFrame }), {});
		}
	};
}
