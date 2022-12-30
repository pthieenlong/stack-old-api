import { IsNotEmpty, IsObject, IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { SavingLocaleStatus, ProjectStatus } from '../enum/EProject';

export class ProjectInput {
    @IsObject()
    @IsNotEmpty()
    groupOwner: {
		_id: string;
		groupName: string;
	};

    @IsObject()
    @IsNotEmpty()
    savingLocale: {
		_id: string;
		link: string;
		status: SavingLocaleStatus;
	};

    @IsObject()
    @IsNotEmpty()
    project_types: [
		project_type : {
			_id: string;
			name: string;
		}
	];

    @IsString()
    @IsNotEmpty()
    thumbnail: string;

    constructor(projectInput: ProjectInput) {
        this.groupOwner = projectInput.groupOwner;
        this.savingLocale = projectInput.savingLocale;
        this.project_types = projectInput.project_types;
        this.thumbnail = projectInput.thumbnail;
    }
}

export class ProjectUpdateInput {
    @IsOptional()
    @IsNumber()
    rating: number;

    @IsOptional()
    @IsNumber()
	price: number;

    @IsOptional()
    @IsNumber()
	sale: number;

    @IsObject()
    @IsNotEmpty()
    savingLocale?: {
		_id: string;
		link: string;
		status: SavingLocaleStatus;
	};

   
    @IsNotEmpty()
    @IsArray()
    project_types: [
        {
			_id: string;
			name: string;
		}
	];

    @IsOptional()
    @IsObject()
    description: {
		compatibleBrowsers: string;
		highResolution: boolean;
		themeForestFilesIncluded: string;
	};

    @IsOptional()
    @IsNumber()
    status: ProjectStatus;

    @IsOptional()
    @IsString()
    thumbnail: string;

    @IsOptional()
    @IsArray()
    images: string[];

    @IsOptional()
    @IsString()
    linkDemo: string;

    constructor(projectUpdateInput: ProjectUpdateInput) {
        this.rating = projectUpdateInput.rating;
        this.price = projectUpdateInput.price;
        this.sale = projectUpdateInput.sale;
        this.savingLocale = projectUpdateInput.savingLocale;
        this.project_types = projectUpdateInput.project_types;
        this.description = projectUpdateInput.description;
        this.status = projectUpdateInput.status;
        this.thumbnail = projectUpdateInput.thumbnail;
        this.images = projectUpdateInput.images;
        this.linkDemo = projectUpdateInput.linkDemo;
    }
}
