# Generated by Django 4.0 on 2023-03-07 01:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('feedback', '0003_remove_surveydetail_questions_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Questions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.TextField(unique=True)),
                ('rating_type', models.PositiveIntegerField(default=5)),
            ],
        ),
        migrations.CreateModel(
            name='SurveyDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_completed', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='SurveyQuestionsThrough',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating_value', models.CharField(max_length=1)),
                ('questions', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='survey_through', to='feedback.questions')),
                ('survey_details', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='feedback.surveydetails')),
            ],
        ),
        migrations.AddField(
            model_name='surveydetails',
            name='questions',
            field=models.ManyToManyField(through='feedback.SurveyQuestionsThrough', to='feedback.Questions'),
        ),
    ]
