from django.db import models


class QuestionType(models.Model):
    type = models.CharField(max_length=20)

    def __str__(self):
        return self.type


class Question(models.Model):
    question = models.TextField(null=False, unique=True)
    rating_offset = models.PositiveSmallIntegerField(default=5)
    sort_order = models.PositiveSmallIntegerField(default=9999)
    type = models.ForeignKey(QuestionType, on_delete=models.CASCADE)

    def __str__(self):
        return f'Question: {self.question} Type: {f"{self.type}".upper()}'


class SurveyQuestionThrough(models.Model):
    survey_detail = models.ForeignKey('SurveyDetail', on_delete=models.CASCADE)
    question = models.ForeignKey(Question, related_name='survey_through', on_delete=models.CASCADE)
    rating = models.TextField()


class SurveyDetail(models.Model):
    session_id = models.BigAutoField(primary_key=True)
    questions = models.ManyToManyField(Question, through=SurveyQuestionThrough
                                       )
    is_completed = models.BooleanField(default=False)
