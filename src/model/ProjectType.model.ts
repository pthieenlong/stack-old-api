
export default class ProjectType {
    public _id: string;
    public name: string;
	constructor(projectType : ProjectType) {
        this._id = projectType._id;
        this.name = projectType.name;
    }

}

