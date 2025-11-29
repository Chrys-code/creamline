import type React from "react";
import type { EditUserProps } from "./EditUser.types";

import PageHeader from "../../../shared/components/pageHeader";
import UserForm from "../../../features/domain/user/forms/userForm";

import { useLoaderData, useNavigate } from "react-router";
import { useTypedTranslation } from "../../../shared/hooks/useTypedTranslation/useTypedTranslation";

const EditUser: React.FC = () => {
	const { selectedItem, userGroups } = useLoaderData<EditUserProps>();
	const navigate = useNavigate();
	const ut = useTypedTranslation("users");

	const pageTitle = selectedItem
		? ut("edit_user.page_title.edit")
		: ut("edit_user.page_title.create");

	return (
		<>
			<PageHeader
				title={pageTitle}
				onNavigateBack={() => (selectedItem ? navigate("/users/") : navigate(-1))}
			/>
			<UserForm key={selectedItem?.uuid} user={selectedItem} userGroups={userGroups} />
		</>
	);
};

export default EditUser;
