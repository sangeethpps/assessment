# Generated by Django 4.0 on 2023-03-07 10:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0017_rename_question_type_questiontype_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='surveyquestionthrough',
            name='rating',
            field=models.TextField(),
        ),
    ]
