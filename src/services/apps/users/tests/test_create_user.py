# import pytest

# from apps.users.models import CustomUser


# This WF has been deleted!
# from apps.users.use_cases.create import create_user_workflow

# pytestmark = pytest.mark.django_db()


# def test_create_user_workflow_saves(user_groups):
#     g1, g2, _, gm1, gm2, _ = user_groups

#     created = create_user_workflow(
#         email="test@user.com",
#         password="password",
#         profile_image=None,
#         first_name="test",
#         last_name="user",
#         group_metadata_uuids=[gm1.uuid, gm2.uuid],
#     )

#     db_instance = CustomUser.objects.get(uuid=created.uuid)

#     assert isinstance(db_instance, CustomUser)
#     assert db_instance.email == "test@user.com"
#     assert db_instance.profile.profile_image == None
#     assert db_instance.profile.first_name == "test"
#     assert db_instance.profile.last_name == "user"
#     assert db_instance.groups.contains(g1)
#     assert db_instance.groups.contains(g2)
