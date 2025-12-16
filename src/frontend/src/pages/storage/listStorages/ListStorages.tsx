import type { ListStoragesProps } from "./ListStorages.types";
import type { Storage } from "../../../features/domain/storage/types";

import PageHeader from "../../../shared/components/pageHeader";
import IconButton from "../../../shared/components/base/iconButton";
import PaginatedList from "../../../shared/components/paginatedList";

import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import StorageCard from "../../../features/domain/storage/components/storageCard";
import { useTypedTranslation } from "../../../shared/hooks/useTypedTranslation/useTypedTranslation";
import { NAVIGATION_ROUTES } from "../../../configs/navigation";

const MdOutlineAddCircleOutline = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdOutlineAddCircleOutline,
	}))
);

const ListStorages: React.FC = () => {
	const navigate = useNavigate();
	const tStorage = useTypedTranslation("storage");
	const {
		data: { data, page },
	} = useLoaderData<ListStoragesProps>();

	const headerActionElement = (
		<IconButton onClick={() => navigate(NAVIGATION_ROUTES.storage.create.path)}>
			<MdOutlineAddCircleOutline size={"1rem"} />
		</IconButton>
	);

	const storagesListItem = (item: Storage) => {
		return (
			<li key={item.uuid} tabIndex={0}>
				<StorageCard
					name={item.name}
					type={item.type_label}
					onClick={() => navigate(NAVIGATION_ROUTES.storage.edit.path + item.uuid)}
				/>
			</li>
		);
	};

	return (
		<>
			<PageHeader
				title={tStorage("list_storage.page_title")}
				onNavigateBack={() => navigate("/")}
				actionElement={headerActionElement}
			/>
			<PaginatedList
				items={data.results}
				itemCount={data.count}
				currentPage={page}
				nextPage={data.next}
				previousPage={data.previous}
				itemRenderer={storagesListItem}
			/>
		</>
	);
};

export default ListStorages;
