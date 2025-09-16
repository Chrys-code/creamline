from django.contrib import admin
from products.models import Product, IntermediateProduct, FinalProduct


class FilteredProductAdmin(admin.ModelAdmin):
    type: str
    exclude = ["type"]

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(type=self.type)

    def save_model(self, request, obj, form, change):
        obj.type = self.type
        super().save_model(request, obj, form, change)



@admin.register(IntermediateProduct)
class IntermediateProductAdmin(FilteredProductAdmin):
    type = Product.ProductTypes.INTERMEDIATE

@admin.register(FinalProduct)
class FinalProductAdmin(FilteredProductAdmin):
    type = Product.ProductTypes.FINAL
