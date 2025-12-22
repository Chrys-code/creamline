import type React from "react";
import type { EditUserProps } from "./EditUser.types";

import PageHeader from "@/shared/components/pageHeader";
import UserForm from "@/features/domain/user/forms/userForm";

import { useLoaderData, useNavigate } from "react-router";
import { useTypedTranslation } from "@/shared/hooks/useTypedTranslation/useTypedTranslation";

const EditUser: React.FC = () => {
	const { selectedItem, userGroups } = useLoaderData<EditUserProps>();
	const navigate = useNavigate();
	const tUser = useTypedTranslation("users");

	const pageTitle = selectedItem
		? tUser("edit_user.page_title.edit")
		: tUser("edit_user.page_title.create");

	return (
		<>
			<PageHeader title={pageTitle} onNavigateBack={() => navigate(-1)} />
			<UserForm key={selectedItem?.uuid} user={selectedItem} userGroups={userGroups} />
		</>
	);
};

export default EditUser;
