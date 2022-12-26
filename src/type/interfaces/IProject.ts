import { SoftDeleteDocument } from 'mongoose-delete';

import { Status } from 'type/enum/EProject';
export type ProjectType = {
    name: string;
}

export type Description = { // it is likely to develop this case further in the future ;
    compatibleBrowsers: string;
    highResolution: boolean;
    themeForestFilesIncluded: string;
}

export type Images = {
    url: string;
}

export type SavingLocale = {
	id: string;
	link: string;
	status: 'living' | 'died';
}

interface IProject extends SoftDeleteDocument {
	_id: string;
	groupOwner: string;
	rating : number;
	price: number;
	sale : number;
	savingLocale: SavingLocale[];
	projectType: ProjectType[];
	status: Status;
	thumbnail: string;
    images: Images[];
    description: Description;
    linkDemo: string;
}

export default IProject;
