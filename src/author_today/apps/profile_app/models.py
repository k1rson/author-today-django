from django.db import models

from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    GENDER_CHOICES = (
    ('М', 'Мужской'),
    ('Ж', 'Женский'),
    ('Н/У', 'Не указан')
    )

    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    gender = models.CharField('Пол', max_length=3, choices=GENDER_CHOICES)