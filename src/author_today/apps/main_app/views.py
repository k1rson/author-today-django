from django.http import JsonResponse
from django.views import View

from django.shortcuts import render

from .models import BookModel

class HomePageView(View):
    def get(self, request):
        return render(request, 'index.html')
    
# AJAX function
def get_books(request):
    books = BookModel.objects.all()
    books_list = list(books.values())

    return JsonResponse({'status': 'success', 'books_list': books_list}) 