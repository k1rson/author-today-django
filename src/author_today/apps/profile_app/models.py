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

    LEVELS_READER_CHOICES = (
        (1, 'Начинающий читатель'),
        (2, 'Любознательный страничник'),
        (3, 'Путешественник миров бумаги'),
        (4, 'Словесный исследователь'),
        (5, 'Строитель мира слов'),
        (6, 'Мастер словесного искусства'),
        (7, 'Книжный знаток'),
        (8, 'Страж библиотеки'),
        (9, 'Хранитель мудрости книг'),
        (10, 'Литературный маг'),
        (11, 'Великий Читатель'),
    )

    LEVELS_WRITER_CHOICES = (
        (1, 'Начинающий писатель'),
        (2, 'Словесный мастер'),
        (3, 'Творческий путник'),
        (4, 'Литературный странник'),
        (5, 'Истории в голове'),
        (6, 'Сказочник в раздумьях'),
        (7, 'Маг письменного искусства'),
        (8, 'Колдун рассказов'),
        (9, 'Хроникер миров'),
        (10, 'Виртуоз пера'),
        (11, 'Литературный Гений'),
    )

    ROLE_CHOICES = (
        (1, 'Читатель'),
        (2, 'Писатель'),
        (3, 'Модератор'),
        (4, 'Администратор'),
        (5, 'Спец. Администратор'),
        (6, 'Тех. поддержка'),
        (7, 'Отдел маркетинга'),
        (8, 'Основатель'),
    )

    avatar = models.ImageField('Аватар', upload_to='avatars/', blank=True, null=True)
    user_background_image = models.ImageField('Задний фон профиля', upload_to='user_background_images/', blank=True, null=True)
    exp_reader = models.IntegerField('Опыт читателя')
    exp_writer = models.IntegerField('Опыт писателя')
    lvl_reader = models.IntegerField('Уровень читателя', choices=LEVELS_READER_CHOICES)
    lvl_writer = models.IntegerField('Уровень писателя', choices=LEVELS_WRITER_CHOICES)
    role = models.IntegerField('Роль', choices=ROLE_CHOICES)
    gender = models.CharField('Пол', max_length=3, choices=GENDER_CHOICES)

    objects = UserManager()