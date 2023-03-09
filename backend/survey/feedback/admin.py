from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(QuestionType)
admin.site.register(Question)


class SurveyQuestionThroughInline(admin.StackedInline):
    model = SurveyQuestionThrough
    extra = 0


class SurveyDetailAdmin(admin.ModelAdmin):
    inlines = [SurveyQuestionThroughInline]


admin.site.register(SurveyDetail, SurveyDetailAdmin)
