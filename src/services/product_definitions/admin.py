from django.contrib import admin
from product_definitions.models import ProductDefinition, SkimmedMilkProductDefinition, WholeMilkMilkProductDefinition, CreamProductDefinition


class FilteredProductDefinitionAdmin(admin.ModelAdmin):
    type: str
    exclude = ["type"]

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(type=self.type)

    def save_model(self, request, obj, form, change):
        obj.type = self.type
        super().save_model(request, obj, form, change)



@admin.register(SkimmedMilkProductDefinition)
class SkimmedMilkProductDefinitionAdmin(FilteredProductDefinitionAdmin):
    type = ProductDefinition.ProductDefinitionTypes.SKIMMEDMILK

@admin.register(WholeMilkMilkProductDefinition)
class WholeMilkProductDefinitionAdmin(FilteredProductDefinitionAdmin):
    type = ProductDefinition.ProductDefinitionTypes.WHOLEMILK

@admin.register(CreamProductDefinition)
class CreamProductDefinitionAdmin(FilteredProductDefinitionAdmin):
    type = ProductDefinition.ProductDefinitionTypes.CREAM
