from django.db import models

from django.contrib.auth.models import AbstractUser, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

class User(AbstractUser):
    GENDER_CHOICES = (
    ('М', 'Мужской'),
    ('Ж', 'Женский'),
    ('Н/У', 'Не указан')
    )

    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    gender = models.CharField('Пол', max_length=3, choices=GENDER_CHOICES)

    objects = UserManager()