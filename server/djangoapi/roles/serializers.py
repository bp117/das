from rest_framework import serializers
from .models import Roles

class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = ('id', 'role_id', 'role_desc', 'lob_id', 'wfgroup_id')
        extra_kwargs = {
            'role_desc': {
                'required': False,
                'allow_blank': True,
            }
        }