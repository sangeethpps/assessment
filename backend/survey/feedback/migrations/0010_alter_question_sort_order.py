# Generated by Django 4.0 on 2023-03-07 01:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0009_alter_question_sort_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='sort_order',
            field=models.PositiveSmallIntegerField(default=9999),
        ),
    ]
