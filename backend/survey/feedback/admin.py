from django.contrib import admin

# Register your models here.
from .models import *
admin.site.register(QuestionType)
admin.site.register(Question)
admin.site.register(SurveyQuestionThrough)
admin.site.register(SurveyDetail)

