import { Status } from 'type/enum/EProject';
import { ProjectType, Images, Description, SavingLocale } from 'type/interfaces/IProject';

export class Project {
	public id: string;
	public groupOwner: string;
	public rating: number;
	public price: number;
	public sale : number;
	public savingLocale: SavingLocale[];
	public projectType: ProjectType[];
	public status: Status;
	public thumbnail: string;
    public images: Images[];
    public description: Description;
    public linkDemo: string;

	constructor(project: Project) {
		this.id = project.id;
		this.groupOwner = project.groupOwner;
		this.rating = project.rating;
		this.price = project.price;
		this.sale = project.sale;
		this.savingLocale = project.savingLocale;
		this.projectType = project.projectType;
		this.status = project.status;
		this.thumbnail = project.thumbnail;
		this.images = project.images;
		this.description = project.description;
		this.linkDemo = project.linkDemo;
	}
}

