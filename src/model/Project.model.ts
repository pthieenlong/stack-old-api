import { ProjectStatus, SavingLocaleStatus } from '../type/enum/EProject';


export default class Project {
	public _id: string;
	public groupOwner : {
		_id: string;
		groupName: string;
	};
	public rating: number;
	public price: number;
	public sale?: number;
	public savingLocale: {
		_id: string;
		link: string;
		status: SavingLocaleStatus;
	};
	public project_types?: [
		project_type : {
			_id: string;
			name: string;
		}
	];
	public status?: ProjectStatus;
	public thumbnail: string;
    public images?: string[];
    public description?: {
		compatibleBrowsers: string;
		highResolution: boolean;
		themeForestFilesIncluded: string;
	};
    public linkDemo?: string;

	constructor(project: Project) {
		this._id = project._id;
		this.groupOwner = project.groupOwner;
		this.rating = project.rating;
		this.price = project.price;
		this.sale = project.sale;
		this.savingLocale = project.savingLocale;
		this.project_types = project.project_types;
		this.status = project.status;
		this.thumbnail = project.thumbnail;
		this.images = project.images;
		this.description = project.description;
		this.linkDemo = project.linkDemo;
	}
}

