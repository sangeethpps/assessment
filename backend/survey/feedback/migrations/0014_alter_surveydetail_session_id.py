# Generated by Django 4.0 on 2023-03-07 02:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0013_alter_surveydetail_session_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='surveydetail',
            name='session_id',
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
    ]
