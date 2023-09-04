import random, string

from ...profile_app.models import User

def generate_password(length):
    characters = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(random.choice(characters) for _ in range(length))

    return password

def get_object_user(attribute: str, value: str) -> User: 
    try: 
        if attribute == 'username':
            user = User.objects.get(username=value)
        elif attribute == 'email':
            user = User.objects.get(email=value)
        elif attribute == 'id':
            user = User.objects.get(id=value)
        else:
            user = None
        return user
    except User.DoesNotExist: 
        return None
    