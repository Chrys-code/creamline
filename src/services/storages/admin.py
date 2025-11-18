from django.contrib import admin
from storages.models import Storage, SiloStorage, ContainerStorage, TubStorage


class FilteredStorageAdmin(admin.ModelAdmin):
    type: str
    exclude = ["type"]

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(type=self.type)

    def save_model(self, request, obj, form, change):
        obj.type = self.type
        super().save_model(request, obj, form, change)


@admin.register(SiloStorage)
class SiloStorageAdmin(FilteredStorageAdmin):
    type = Storage.StorageType.SILO


@admin.register(ContainerStorage)
class ContainerStorageAdmin(FilteredStorageAdmin):
    type = Storage.StorageType.CONTAINER


@admin.register(TubStorage)
class TubStorageAdmin(FilteredStorageAdmin):
    type = Storage.StorageType.TUB
