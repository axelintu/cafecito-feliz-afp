const modelJsonOptions = {
	virtuals: true,
	versionKey: false,
	transform(doc, ret) {
		delete ret._id;
		return ret;
	},
};

export default modelJsonOptions;
