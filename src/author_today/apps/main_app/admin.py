from django.contrib import admin

from .models import BookModel

@admin.register(BookModel)
class ContractAdmin(admin.ModelAdmin): 
    list_display = ('name', 'author', 'price', 'date_of_adding', 'writing_status', 'exclusive')