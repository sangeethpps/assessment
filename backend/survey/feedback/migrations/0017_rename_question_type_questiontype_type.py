# Generated by Django 4.0 on 2023-03-07 10:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0016_questiontype_question_type'),
    ]

    operations = [
        migrations.RenameField(
            model_name='questiontype',
            old_name='question_type',
            new_name='type',
        ),
    ]
