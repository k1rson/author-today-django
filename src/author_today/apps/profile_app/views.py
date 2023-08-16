from django.shortcuts import render

from django.views import View

class ProfileView(View):
    def get(self, request, id):
        return render(request, 'index_profile.html')