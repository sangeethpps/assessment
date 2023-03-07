from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from feedback.models import *
from django.http import JsonResponse
from django.db.models.expressions import F


class QuestionsApi(APIView):
    permission_classes = (AllowAny,)

    @staticmethod
    def get(request):
        session_id = request.data['session_id'] if 'session_id' in request.data else None
        result = {}
        if session_id:
            result = {'questions': list(
                SurveyQuestionThrough.objects.filter(survey_detail__session_id=session_id).annotate(
                    rating_offset=F('question__rating_offset'),type=F('question__type__type')).values('id', 'question__question', 'rating_offset',
                                                                   'question__sort_order', 'type','rating').order_by(
                    'question__sort_order')),
                'session_id': session_id}
        return JsonResponse(status=200, data=result)

    @staticmethod
    def post(request):
        survey_detail = SurveyDetail.objects.create(is_completed=False)
        if survey_detail:
            for question in Question.objects.values('id'):
                SurveyQuestionThrough.objects.create(question_id=question['id'], survey_detail=survey_detail)
            result = {'questions': list(
                SurveyQuestionThrough.objects.filter(survey_detail__session_id=survey_detail.session_id).annotate(
                    rating_offset=F('question__rating_offset'),type=F('question__type__type')).values('id', 'question__question', 'rating_offset',
                                                                   'question__sort_order', 'type','rating').order_by(
                    'question__sort_order')),
                      'session_id': survey_detail.session_id}
            return JsonResponse(status=201, data=result)

    @staticmethod
    def put(request):
        session_id = request.data['session_id']
        question_id = request.data['question_id']
        rating = request.data['value']
        SurveyQuestionThrough.objects.filter(survey_detail__session_id=session_id,
                                                                    id=question_id).update(rating=rating)
        result = {'questions': list(
                SurveyQuestionThrough.objects.filter(survey_detail__session_id=session_id).annotate(
                    rating_offset=F('question__rating_offset'),type=F('question__type__type')).values('id', 'question__question', 'rating_offset',
                                                                   'question__sort_order', 'type','rating').order_by(
                    'question__sort_order')),
                  'session_id': session_id}

        return JsonResponse(status=200, data=result)

    @staticmethod
    def patch(request):
        session_id = request.data['session_id']
        SurveyDetail.objects.filter(session_id=session_id).update(is_completed=True)
        return JsonResponse(status=200, data={'message': 'Marked completed'})
