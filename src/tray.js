const {Tray, Menu} = require("electron");
const pathsManifest = require("./paths");
let mainWindow;

const onShowEntryClicked = () => {
	mainWindow.show();
}

const onHideEntryClicked = () => {
	mainWindow.minimize();
}

const onQuitEntryClicked = () => {
	// not implemented
}

const onSystemTrayIconClicked = () => {
	if(mainWindow.isMinimized()) {
		mainWindow.show();
	} else {
		mainWindow.focus();
	}
}

const initializeTray = (windowObj) => {
	const systemTrayIcon = new Tray(pathsManifest.iconPath);
	mainWindow = windowObj;

	const template = [
		{
			"label": "Show",
			"role": "unhide",
			"click": () => {
				onShowEntryClicked();
			},
		}, {
			"label": "Hide",
			"role": "hide",
			"click": () => {
				onHideEntryClicked();
			},
		},
		{
			"label": "Quit",
			"role": "quit",
			"click": () => {
				onQuitEntryClicked();
			}
		}
	]

	const contextMenu = Menu.buildFromTemplate(template);
	systemTrayIcon.setContextMenu(contextMenu);
	systemTrayIcon.setToolTip('Google Hangouts Chat for Linux (Unofficial)');

	systemTrayIcon.on("click", () => {
		onSystemTrayIconClicked();
	});

	return systemTrayIcon;
}

module.exports = {
	initializeTray: initializeTray
};