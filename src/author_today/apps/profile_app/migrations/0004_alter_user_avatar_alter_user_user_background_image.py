# Generated by Django 4.2.3 on 2023-08-16 09:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profile_app', '0003_alter_user_managers_user_exp_user_lvl_user_role_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=models.ImageField(blank=True, null=True, upload_to='avatars/', verbose_name='Аватар'),
        ),
        migrations.AlterField(
            model_name='user',
            name='user_background_image',
            field=models.ImageField(blank=True, null=True, upload_to='user_background_images/', verbose_name='Задний фон профиля'),
        ),
    ]