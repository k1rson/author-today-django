from django.shortcuts import render

from django.views import View

# Create your views here.
class AboutUsView(View): 
    def get(self, request):
        return render(request, 'about_us.html')
    
class BackInfoView(View): 
    def get(self, request):
        return render(request, 'background_information.html')
    
class PublicOfferView(View): 
    def get(self, request):
        return render(request, 'public_offer.html')
    
class RulesView(View): 
    def get(self, request):
        return render(request, 'rules.html')
    
class UserAgreementView(View): 
    def get(self, request):
        return render(request, 'user_agreement.html')