from django.http import JsonResponse
from django.views import View

from django.shortcuts import render

from .models import BookModel

from ..profile_app.models import User

class HomePageView(View):
    def get(self, request):
        return render(request, 'index_main.html')
    
# AJAX functions    
def get_books(request):
    books = BookModel.objects.all()
    books_list = list(books.values())

    return JsonResponse({'status': 'success', 'books_list': books_list}) 