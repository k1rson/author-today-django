from django.shortcuts import render, get_object_or_404

from django.http import JsonResponse

from django.views import View
from ..authentication_app.service.services import get_object_user

class ProfileView(View):
    template_name_own_user = 'index-profile-own.html'
    template_name_def_user = 'index-profile-def.html'
    template_name_not_found = 'index-profile-not-found.html'

    def get(self, request, id):
        user = get_object_user('id', id)

        if not user:
            return render(request, self.template_name_not_found)

        is_own_profile = user == request.user 
        is_super_admin = user.is_superuser

        context = {
            'user': user,
            'is_own_profile': is_own_profile,
            'is_super_admin': is_super_admin,
            'current_user': request.user
        }   

        if is_own_profile:
            return render(request, self.template_name_own_user, context)
        else: 
            return render(request, self.template_name_def_user, context)
    
# ajax
def get_info_about_user(request, id):
    user = get_object_user('id', id)

    if not user:
        return JsonResponse({'status': 'error'})
    
    data_user = {
        'username': user.username,
        'exp_reader': user.exp_reader, 
        'exp_writer': user.exp_writer, 
        'max_exp': 1500, 
        'lvl_reader': user.lvl_reader,
        'lvl_writer': user.lvl_writer,
        'role': user.role,
        'gender': user.gender,
    }

    return JsonResponse({'status': 'success', 'data_user': data_user})