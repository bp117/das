from rest_framework import serializers
from .models import ProjectDetails

class ProjectDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectDetails
        fields = (
            'id',
            'lob_id',
            'workflow_id',
            'project_type_id',
            'annotation_id',
            'ds_id',
            'project_name',
            'project_desc',
            'num_tasks',
            'complete_percent',
            'to_reassign',
            'workflow_roles',
            'annotators_list',
            'reviewers_list',
            'project_start_date',
            'project_recurrence_start_date',
            'project_recurrence_end_date',
            'project_end_date',
            'project_model_name',
            'project_status_id',
            'annotators_per_record')
        extra_kwargs = {
            'lob_id': {
                'required': False,
                'allow_blank': True,
            },
            'workflow_id': {
                'required': False,
                'allow_blank': True,
            },
            'project_type_id': {
                'required': False,
                'allow_blank': True,
            },
            'annotation_id': {
                'required': False,
                'allow_blank': True,
            },
            'ds_id': {
                'required': False,
                'allow_blank': True,
            },
            'project_desc': {
                'required': False,
                'allow_blank': True,
            },
            'num_tasks': {
                'required': False,
                'allow_blank': True,
            },
            'complete_percent': {
                'required': False,
                'allow_blank': True,
            },
            'to_reassign': {
                'required': False,
                'allow_blank': True,
            },
            'workflow_roles': {
                'required': False,
                'allow_blank': True,
            },
            'annotators_list': {
                'required': False,
                'allow_blank': True,
            },
            'reviewers_list': {
                'required': False,
                'allow_blank': True,
            },
            'project_start_date': {
                'required': False,
                'allow_blank': True,
            },
            'project_recurrence_start_date': {
                'required': False,
                'allow_blank': True,
            },
            'project_recurrence_end_date': {
                'required': False,
                'allow_blank': True,
            },
            'project_end_date': {
                'required': False,
                'allow_blank': True,
            },
            'project_model_name': {
                'required': False,
                'allow_blank': True,
            },
            'project_status_id': {
                'required': False,
                'allow_blank': True,
            },
            'annotators_per_record': {
                'required': False,
                'allow_blank': True,
            }
        }