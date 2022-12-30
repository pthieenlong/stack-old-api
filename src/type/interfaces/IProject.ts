import { ProjectStatus, SavingLocaleStatus } from 'type/enum/EProject';
export type ProjectType = {
    name: string;
}

interface IProject {
	_id: string;
	groupOwner: {
		_id: string;
		groupName: string;
	};
	rating?: number;
	price?: number;
	sale?: number;
	savingLocale: {
		_id: string;
		link: string;
		status: SavingLocaleStatus;
	};
	project_types: [
		project_type : {
			_id: string;
			name: string;
		}
	];
	status?: ProjectStatus;
	thumbnail: string;
    images?: string[];
    description?: {
		compatibleBrowsers: string;
		highResolution: boolean;
		themeForestFilesIncluded: string;
	};
    linkDemo?: string;
}

export default IProject;
