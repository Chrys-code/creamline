from django.contrib.auth.models import Group

def set_user_groups(user, group_ids):
    """
    Overwrite user's group membership.
    """
    groups = Group.objects.filter(id__in=group_ids)
    user.groups.set(groups)
    user.save()
    return user