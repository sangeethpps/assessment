# Generated by Django 4.0 on 2023-03-07 01:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Question',
            new_name='Questions',
        ),
        migrations.RenameModel(
            old_name='SurveyQuestionThrough',
            new_name='SurveyQuestionsThrough',
        ),
    ]