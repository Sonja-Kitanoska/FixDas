type FormDataValue = string | number | boolean | object | null;
export const updateFormData = (
	newData: Partial<Record<string, FormDataValue>>
) => {
	const existingData = JSON.parse(localStorage.getItem("formData") || "{}");
	const updatedData = {
		...existingData,
		...newData,
	};
	localStorage.setItem("formData", JSON.stringify(updatedData));
};

export const getFormData = (): Partial<Record<string, FormDataValue>> => {
    const data = localStorage.getItem("formData");
    return data ? JSON.parse(data) : {};
};