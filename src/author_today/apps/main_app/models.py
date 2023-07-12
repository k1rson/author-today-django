from django.db import models

from django.contrib.postgres.fields import ArrayField

from djmoney.models.fields import MoneyField
from djmoney.models.fields import Money

class BookModel(models.Model):
    WRITING_STATUS = [
        ('В процессе', 'In progress'), 
        ('Завершен', 'Completed'), 
    ]

    name = models.CharField('Name of book', max_length=150)
    author = models.CharField('Name of author', max_length=150)
    annotation = models.TextField('Annotation')
    number_of_watching = models.IntegerField('Number of watching')
    number_of_likes = models.IntegerField('Number of likes')
    number_of_symbols = models.IntegerField('Number of symbols')
    number_of_awards = models.IntegerField('Number of awards')
    price = MoneyField('Price', max_digits=14, decimal_places=2, default=Money('0', 'RUB'))
    discount = MoneyField('Discount', max_digits=14, decimal_places=2, default=Money('0', 'RUB'))
    genres = ArrayField(models.CharField(max_length=250), blank=True, null=True)
    tags = ArrayField(models.CharField(max_length=250), blank=True, null=True)
    chapters = ArrayField(models.CharField(max_length=250), blank=True, null=True)
    date_of_adding = models.DateTimeField('Date of adding book', auto_now=False, auto_now_add=False)
    date_last_update = models.DateTimeField('Date last update book', auto_now=False, auto_now_add=False)
    writing_status = models.CharField('Wtiting status', max_length=50, choices=WRITING_STATUS, default=1)
    exclusive = models.BooleanField('Exclusive book?')
    # cycle = referance on cycle model
    avatar = models.ImageField(upload_to='books_avatars/', blank=True, null=True)

    def __str__(self):
        return f'{self.name}, {self.author}, {self.price}, {self.date_of_adding}, {self.writing_status}, {self.exclusive}'

    class Meta:
        verbose_name = 'Book'
        verbose_name_plural = 'Books'